import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.less'
import App from './App'

if (process.env.NODE_ENV === 'production') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    console.log = _ => {}
}
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    // <React.StrictMode>
    <App />,
    // </React.StrictMode>,
)
