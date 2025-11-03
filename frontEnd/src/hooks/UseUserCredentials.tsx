import { useContext } from "react"
import { UserLoggedContext } from "../context/UserLoggedContext"


export const UseUserCredentials = () => {
    const credentialsContext = useContext(UserLoggedContext)
     if (!credentialsContext) throw new Error("useUserLogged deve ser usado dentro de um UserLoggedProvider")
    return credentialsContext
}