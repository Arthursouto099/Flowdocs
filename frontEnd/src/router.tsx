import { BrowserRouter, Route, Routes } from "react-router-dom"
import ThemeProvider from "./Providers/ThemeProvider"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import UseTheme from "./hooks/UseTheme";
import UserLoggedProvider from "./Providers/UserLoggedProvider";
import Home from "./pages/Home";
import SideBarLayout from "./layouts/SideBarLayout";
import ModulePage from "./pages/ModulePage";

const ToastStyleProvider = () => {
    const { darkMode } = UseTheme()
    return <ToastContainer position="top-right"
        closeOnClick
        toastStyle={({
            color: darkMode ? "#fafafa" : "#18181b"
        })}
        theme={`${darkMode ? "#3f3f46" : "#d4d4d8"}`} />
}

export default function RouterApp() {

    return (
        <BrowserRouter>

            <ThemeProvider >
                <UserLoggedProvider>
                    <Routes>
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="module/:name/:id" element={<ModulePage/>}/>
                        <Route path="/" element={<SideBarLayout/>}>
                            <Route path="/home" element={<Home/>} />
                            
                        </Route>
                     
                    </Routes>

                    
                </UserLoggedProvider>


                <ToastStyleProvider />

            </ThemeProvider>

        </BrowserRouter>
    )

}