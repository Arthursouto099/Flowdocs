import { createContext } from "react"
import { type Credentials } from "../types/Credentials"



interface UserLoggedContextProps {
  credentials: Credentials | undefined
  token: string
  setToken: (data: string) => void

}

export const UserLoggedContext = createContext<UserLoggedContextProps | null>(null)