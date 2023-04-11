import { HashRouter } from 'react-router-dom'
import { onRouteBefore, RouterGuard, routes } from './router'
import './styles/App.scss'

function App() {
    return (
        <HashRouter>
            <main>
                <RouterGuard routes={routes} onRouterBefore={onRouteBefore} />
            </main>
        </HashRouter>
    )
}

export default App
