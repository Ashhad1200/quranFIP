import { BrowserRouter } from 'react-router-dom'
import Navbar from '@components/layout/Navbar/Navbar'
import AppRouter from './router'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div style={{ marginTop: 'var(--navbar-height)' }}>
                <AppRouter />
            </div>
        </BrowserRouter>
    )
}

export default App
