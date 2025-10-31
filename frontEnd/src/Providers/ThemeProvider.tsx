import type React from "react";
import { useState } from "react";
import { ThemeContext } from "../context/ThemeContext";



export default function ThemeProvider(props: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState<boolean>(true)


    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            <main className={`h-full w-full ${darkMode ? "bg-zinc-900 text-gray-100 " : "bg-gray-50 text-zinc-950"}`}>
                {props.children}
            </main>
        </ThemeContext.Provider>
    )
}