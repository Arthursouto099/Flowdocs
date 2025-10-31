import { BrowserRouter, Route, Routes } from "react-router"
import ThemeProvider from "./Providers/ThemeProvider"
import Register from "./pages/Register"




export default function RouterApp() {

    return (
        <BrowserRouter>

        <ThemeProvider >
            <Routes>
                <Route path="/" element={<Register/>}/>
            </Routes>
        </ThemeProvider>

        </BrowserRouter>
    )

}