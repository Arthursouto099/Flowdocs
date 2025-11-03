
import React, { useState } from "react"
import Card, { Separator } from "../components/ui/Card"
import UseTheme from "../hooks/UseTheme"
import axios from "axios"


export default function Register() {
    const { darkMode } = UseTheme()
    const [nameOrg, setNameOrg] = useState<string>("")
    const [identifierCode, setIdentifierCode] = useState<string>("")

    const [step, setStep] = useState<"User" | "Org">("User")
    const [info, setInfo] = useState<{ name: string, email: string, password: string }>({
        name: "",
        email: "",
        password: "",
    })



    const onSubmit =  async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const request = await axios.post("http://localhost:3000/user/create", { 
            name: info.name,
            email: info.email,
            password: info.password,
            orgName: nameOrg,
            identifier_code: identifierCode
        })

        alert(request.data.message)

       
    }

   


    return (
        <section className={`$ h-screen w-screen flex justify-center items-center`}>
            <Card className="w-4xl p-10" >
                <div>

                    <div className="mb-10 flex flex-col gap-4 ">
                        <div className="flex items-baseline gap-2">
                            <h1 className="text-9xl font-bold " >{step === "User" ? "1" : "2"}</h1>
                            <h1 className="text-2xl font-semibold">{step === "User" ? "Realizar cadastro das suas informações pessoais" : "Realizar cadastro da organização no qual você será responsável"}</h1>
                        </div>



                    </div>


                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">Registrar Conta</h1>
                        <Separator />
                    </div>

                    <div>

                        {step === "User" && (
                            <UserCreateForm onClickNext={(e) => {
                                setInfo(e)
                                setStep("Org")
                            }
                                
                                }>
                            </UserCreateForm>
                        )}

                        {step === "Org" && (
                            <form  onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-full p-6  rounded shadow">

                                <label className="flex flex-col ">
                                    <span className="text-sm font-semibold mb-1">Nome</span>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={(e) => {
                                            setNameOrg(e.target.value)
                                        }}
                                        placeholder={`${info.name} organization`}
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                        required
                                    />
                                </label>


                                <label className="flex flex-col ">
                                    <span className="text-sm font-semibold mb-1">Codico de identificação</span>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={(e) => {
                                            setIdentifierCode(e.target.value)
                                        }}
                                        placeholder="Digite o codigo da sua organização"
                                        className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                        required
                                    />
                                </label>



                                <button
                                    
                                    className={`col-span-2 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}  text-white font-semibold rounded p-2  transition`}
                                >
                                    Realizar Cadastro
                                </button>
                            </form>
                        )}


                    </div>

                </div>
            </Card>
        </section>
    )
}


const UserCreateForm = (props: { onClickNext: (e: { name: string, email: string, password: string }) => void }) => {
    const [info, setInfo] = useState<{ name: string, email: string, password: string }>({
        name: "",
        email: "",
        password: "",
    })


    const { darkMode } = UseTheme()
    return (
        <form className="grid grid-cols-2 gap-4 w-full p-6  rounded shadow">

            <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Nome</span>
                <input
                    type="text"
                    name="name"
                    onChange={(e) => {
                        setInfo((prev) => ({
                            ...prev,
                            name: e.target.value
                        }))
                    }}
                    placeholder="Digite seu nome"
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>


            <label className="flex flex-col">
                <span className="text-sm font-semibold mb-1">Email</span>
                <input
                    type="email"
                    name="email"
                    onChange={(e) => {
                        setInfo((prev) => ({
                            ...prev,
                            email: e.target.value
                        }))
                    }}
                    placeholder="seuemail@exemplo.com"
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>


            <label className="flex flex-col col-span-2">
                <span className="text-sm font-semibold mb-1">Senha</span>
                <input
                    type="password"
                    name="password"
                    onChange={(e) => {
                        setInfo((prev) => ({
                            ...prev,
                            password: e.target.value
                        }))
                    }}
                    placeholder="********"
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                    required
                />
            </label>

            <button
                onClick={(e) => {
                    e.preventDefault()
                    props.onClickNext(info)
                }}
                className={`col-span-2 ${darkMode ? "bg-zinc-700" : "bg-zinc-300"}  text-white font-semibold rounded p-2  transition`}
            >
                Proximo
            </button>
        </form>
    )
}