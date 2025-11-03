
import React, { useState } from "react"
import Card, { Separator } from "../components/ui/Card"
import UseTheme from "../hooks/UseTheme"
import axios from "axios"
import { toast } from "react-toastify"
import { UseUserCredentials } from "../hooks/UseUserCredentials"
import { useNavigate } from "react-router"


export default function Login() {
    const { darkMode } = UseTheme()
    const {setToken} = UseUserCredentials()
    const navigate = useNavigate()

    const [info, setInfo] = useState<{ email: string, password: string, identifier_code: string }>({
        email: "",
        password: "",
        identifier_code: ""
    })



    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        try {
            const request = await axios.post("http://localhost:3000/user/login", {
            email: info.email,
            password: info.password,
            identifier_code: info.identifier_code
        })

        setToken(request.data.data)
        
        toast.success(request.data.message)
        navigate("/home")

        


        }

        catch(e) {
            toast.error((e as Error).message)
        }
       

       


    }




    return (
        <section className={`$ h-screen w-screen flex justify-center items-center`}>
            <Card className="w-4xl p-10" >
                <div>

                    <div className="mb-10 flex flex-col gap-4 ">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-9xl font-bold " ></h1>
                            <h1 className="text-2xl font-semibold">Realizar Login</h1>
                        </div>



                    </div>


                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">Login</h1>
                        <Separator />
                    </div>

                    <div>




                        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-full p-6  rounded shadow">

                            <label className="flex flex-col ">
                                <span className="text-sm font-semibold mb-1">Email</span>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                        setInfo((prev) => ({
                                            ...prev,
                                            email: e.target.value
                                        }))
                                    }}
                                    placeholder={`email@gmail.com`}
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>


                            <label className="flex flex-col ">
                                <span className="text-sm font-semibold mb-1">password</span>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) => {
                                        setInfo((prev) => ({
                                            ...prev,
                                            password: e.target.value
                                        }))
                                    }}
                                    placeholder="Imztt17*"
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>


                             <label className="flex flex-col ">
                                <span className="text-sm font-semibold mb-1">Codigo de identificação</span>
                                <input
                                    type="text"
                                    name="identifier_code"
                                    onChange={(e) => {
                                        setInfo((prev) => ({
                                            ...prev,
                                            identifier_code: e.target.value
                                        }))
                                    }}
                                    placeholder={`123455TSG`}
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>



                            <button

                                className={`col-span-2 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}  text-white font-semibold rounded p-2  transition`}
                            >
                                Realizar Login
                            </button>
                        </form>



                    </div>

                </div>
            </Card>
        </section>
    )
}