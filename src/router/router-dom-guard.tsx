import React, { Suspense } from 'react'
import { Navigate, RouteObject, useLocation, useRoutes } from 'react-router-dom'

export interface FunctionRule {
    (): any
}
export interface MetaRule {
    title?: string
}
export interface RouteObjectRule extends RouteObject {
    children?: RouteObjectRule[]
    page?: FunctionRule
    path?: string
    redirect?: string
    meta?: MetaRule
}
export interface onRouteBeforeRule<meta = MetaRule, to = string> {
    (meta: meta, to: to): any | never
}

export interface GuardRule {
    routes: RouteObjectRule[]
    onRouterBefore?: onRouteBeforeRule
    loading?: React.ReactNode
}

let onRouteBefore: onRouteBeforeRule | undefined
let RouterLoading: FunctionRule
const Guard = ({ element, meta }: { element: any; meta: MetaRule }) => {
    const { pathname } = useLocation()
    const nextPath = onRouteBefore ? onRouteBefore(meta, pathname) : pathname

    if (nextPath && nextPath !== pathname) {
        element = <Navigate to={nextPath} replace={true} />
    }
    return element
}
const lazyLoadRouters = (page: any, meta?: MetaRule) => {
    meta = meta || {}
    const LazyElement = React.lazy(page)
    const GetElement = () => {
        return (
            <Suspense fallback={<RouterLoading />}>
                <LazyElement />
            </Suspense>
        )
    }
    return <Guard element={<GetElement />} meta={meta} />
}

export const translateRoutes = (routes: RouteObjectRule[]) => {
    const list: RouteObjectRule[] = []
    routes.forEach(route => {
        const obj: any = { ...route }
        if (obj.redirect) {
            obj.element = <Navigate to={obj.redirect} replace />
        }
        if (obj.page) {
            obj.element = lazyLoadRouters(obj.page, obj.meta)
        }
        if (obj.children) {
            translateRoutes(obj.children).forEach(val => list.push(val))
        }
        const deleteKeys: string[] = ['redirect', 'page', 'meta']
        deleteKeys.forEach(name => delete obj[name])
        list.push(obj)
    })

    return list
}

export const RouterGuard = (params: GuardRule) => {
    RouterLoading = () => params.loading || <></>
    onRouteBefore = params.onRouterBefore
    return useRoutes(translateRoutes(params.routes))
}
