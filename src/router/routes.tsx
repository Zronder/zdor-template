import { onRouteBeforeRule, RouteObjectRule } from './router-dom-guard'

export const routes: RouteObjectRule[] = [
    {
        path: '/home',
        page: () => import('../view/home'),
    },
    {
        path: '/',
        redirect: '/home',
    },
    {
        path: '*',
        redirect: '/',
    },
]

export const onRouteBefore: onRouteBeforeRule = (meta, to) => {
    const { title } = meta
    if (title) {
        document.title = title
    }
    return to
}
