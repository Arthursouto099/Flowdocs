import UseTheme from "../hooks/UseTheme";
import { UseUserCredentials } from "../hooks/UseUserCredentials";
import type {  User } from "../types/ApiTypes";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiUser } from "react-icons/fi";


interface UserCreateProps {
    name: string,
    password: string,
    email: string
}



export default function UserForm({ data, onClose }: { data?: User, onClose: () => void }) {
    const [user, setUser] = useState<UserCreateProps>({ name: "", email: "", password: "" })
    const { darkMode } = UseTheme()
    const { token } = UseUserCredentials()

    onClose()


    if (data?.id) {
        return
    }





    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const request = await axios.post(`http://localhost:3000/user/collaborator/create`, {
                name: user.name,
                password: user.password,
                email: user.email
            }, { headers: { Authorization: `Bearer ${token}` } })




            toast.success(request.data.message)
        }

        catch (e) {
            toast.error((e as Error).message)
        }



    }



    return (

        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-96 p-6  rounded shadow">

            <label className="flex flex-col col-span-2">
                <span className="text-sm font-semibold mb-1">Nome (Colaborador)</span>
                <input
                    type="text"
                    name="title"
                    onChange={(e) => {
                        setUser((prev) => ({
                            ...prev,
                            name: e.target.value
                        }))
                    }}
                    placeholder={`Colaborador da Silva`}
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>

            <label className="flex flex-col col-span-2">
                <span className="text-sm font-semibold mb-1">Email (Colaborador)</span>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                        setUser((prev) => ({
                            ...prev,
                            email: e.target.value
                        }))
                    }}
                    placeholder={`colaborador@gmail.com`}
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>

            <label className="flex flex-col col-span-2">
                <span className="text-sm font-semibold mb-1">Password (Colaborador)</span>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => {
                        setUser((prev) => ({
                            ...prev,
                            password: e.target.value
                        }))
                    }}
                    placeholder={`Ydhd78#`}
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>










            <button

                className={`col-span-2  flex justify-center gap-2 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}  text-white font-semibold rounded p-2  transition`}
            >
                Cadastrar Colaborador <FiUser size={20} />
            </button>
        </form>

    )


}