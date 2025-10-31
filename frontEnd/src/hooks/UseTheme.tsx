import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";


export default function UseTheme() {
    const themeCtx = useContext(ThemeContext)
    if(!themeCtx) throw new Error("Thema não foi setado.")
    return themeCtx
}