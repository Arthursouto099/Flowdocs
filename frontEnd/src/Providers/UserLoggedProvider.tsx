import { useEffect, useState, type ReactNode } from "react";
import { UserLoggedContext } from "../context/UserLoggedContext";
import {jwtDecode} from "jwt-decode"
import type { Credentials } from "../types/Credentials";

export default function UserLoggedProvider(props: { children: ReactNode }) {
    const [token, setToken] = useState<string>("")

    

    const setTokenByFunction = (data: string) => {
        setToken(data)
        localStorage.setItem("token", data)
    }

    

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        
        
        if (savedToken) setToken(savedToken);
    })

    const credentials: Credentials | undefined = token ? jwtDecode<Credentials>(token) : undefined 

    return (
        <UserLoggedContext.Provider value={{ credentials, setToken: setTokenByFunction, token }}>
            {props.children}
        </UserLoggedContext.Provider>
    )


}