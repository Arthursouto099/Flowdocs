import React, {useContext, useState, createContext } from "react"



interface ThemeContextProps {
    darkMode: boolean,
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}


export const  ThemeContext = createContext<ThemeContextProps | undefined>(undefined);




