import './App.css'
import { Route, Routes} from "react-router-dom";
import HomeTable from "@/pages/HomeTable.tsx";
import CoinDetails from "@/pages/CoinDetails.tsx";
import NotFound from "@/pages/NotFound.tsx";
import {Toaster} from "sonner";


function App() {

    return (
        <>
            <Toaster richColors position="top-right" />
            <div className="min-h-screen bg-background">
                <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
                    <div className="container mx-auto px-4 py-4">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-[var(--chart-3)] to-[var(--chart-1)] bg-clip-text text-transparent">
                            CryptoDash
                        </h1>
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<HomeTable />} />
                    <Route path="/coin/:id" element={<CoinDetails />} />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </>
    );
}

export default App;