import React, { useEffect, useState, type SetStateAction } from "react"
import { UseUserCredentials } from "../hooks/UseUserCredentials"
import type { Module } from "../types/ApiTypes"
import axios from "axios"
import Card, { Separator } from "../components/ui/Card"
import UseTheme from "../hooks/UseTheme"
import { FaPlus, FaCalendar } from "react-icons/fa"
import { FiGrid, FiSearch } from "react-icons/fi"
import ModuleForm from "../components/ModuleForm"
import Modal from "../components/ui/Modal"
import ModulesList from "../components/ModulesList"

const findModulesByOwner = async ({ token, set, page }: { token: string, set: React.Dispatch<SetStateAction<Module[]>>, page: number }) => {
    const request = await axios.get("http://localhost:3000/module/owner/all", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: { page: page }
    })

    set((prev) => {
        const allModules = [...prev, ...request.data.data as Module[]]

        const uniqueModules = Array.from(
            new Map(allModules.map(module => [module.id, module])).values()
        )

        return uniqueModules

    })
}

export default function Home() {

    const [isModuleOpen, setModuleOpen] = useState<boolean>(false)
    const [modules, setModules] = useState<Module[]>([])
    const [page, setPage] = useState(1);
    const [searchParam, setSearchParam] = useState<string>("")
    const { credentials, token } = UseUserCredentials()
    const { darkMode } = UseTheme()

    const fillModules = searchParam !== "" ? modules.filter((module) => module.name.toUpperCase().includes(searchParam.toUpperCase()))  : modules 

    useEffect(() => {
        if (!token) return



        findModulesByOwner({ set: setModules, token: token, page })
    }, [token, page])

    return (
        <section className="h-full w-full p-5 ">

            <Modal open={isModuleOpen} onClose={() => { setModuleOpen(prev => !prev) }}>
                <ModuleForm onClose={() => { }} />
            </Modal>

            <div className="flex flex-col gap-4 ">


                <div className="flex justify-between items-center gap-5 ">
                    <div>
                        <h1 className="text-3xl font-semibold ">Olá, {credentials?.name.split(" ")[0]}</h1>
                        <h3 className={`${darkMode ? "text-zinc-400" : "text-shadow-zinc-300"}`}>Sempre é um prazer ter você de volta!</h3>
                    </div>
                    <div className=" flex gap-5">
                        <Card onClick={() => setModuleOpen(prev => !prev)} className=" cursor-pointer p-3">
                            <FaPlus size={17} />
                        </Card>
                        <Card className="cursor-pointer p-3">
                            <FaCalendar size={17} />
                        </Card>
                    </div>

                </div>

                <Separator />

                <div className=" flex flex-col gap-4 mt-4  mb-4">
                    <div className="flex items-center gap-4">
                        <FiGrid size={30} />
                        <h1 className="text-3xl font-semibold">Modulos da organização </h1>
                    </div>

                    <div className="mt-2">
                        <Card className="p-2 gap-3 flex rounded-md justify-between ">
                         
                         <input
                         onChange={(e) => setSearchParam(e.target.value)}
                         placeholder="Digite um pista do modulo..."
                         className="w-full focus:outline-none focus:ring-0"
                         />
                            <FiSearch size={20} />
                        </Card>
                    </div>

                </div>


                <div className="w-full no-scrollbar max-h-[600px] overflow-y-auto">
                    <ModulesList data={fillModules} />
                </div>


                <div className="mt-5">
                    <Separator/>
                </div>





            </div>

        </section>
    )
}