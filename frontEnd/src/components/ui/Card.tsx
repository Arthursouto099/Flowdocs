import type React from "react";
import UseTheme from "../../hooks/UseTheme";


interface CardProps {
  children: React.ReactNode;
  className?: string; // permite receber classes extras
}
export function Separator() {
    const {darkMode} = UseTheme()

    return (
        <div className={`h-[0.5px] w-full ${darkMode ? "bg-zinc-700" : "bg-zinc-300" }`}>

        </div>
    )
}



export default function Card({children, className}: CardProps) {
    const {darkMode} = UseTheme()


    return (
        <div className={` rounded-lg shadow-lg border ${darkMode ? "bg-zinc-800 border-zinc-700" : "bg-gray-200 border-zinc-300"} ${className}`}>
            {children}
        </div>
    )
}