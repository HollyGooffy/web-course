import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import { CoinsProvider } from './contexts/CoinsContext';


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CoinsProvider>
                <App />
            </CoinsProvider>
        </BrowserRouter>
    </StrictMode>
)
