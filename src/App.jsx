import { BrowserRouter } from 'react-router-dom'
import Navbar from '@components/layout/Navbar/Navbar'
import Footer from '@components/layout/Footer/Footer'
import AppRouter from './router'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div style={{ marginTop: 'var(--navbar-height)' }}>
                <AppRouter />
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default App
