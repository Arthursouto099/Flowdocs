import axios from "axios"
import { useParams } from "react-router"
import type { Proccess } from "../types/ApiTypes"
import { useEffect, useState, type SetStateAction } from "react"
import { UseUserCredentials } from "../hooks/UseUserCredentials"
import Card, { Separator } from "../components/ui/Card"
import { FiGrid, FiPlus } from "react-icons/fi"
import Modal from "../components/ui/Modal"
import ProcessForm from "../components/ProcessForm"
import ProcessList from "../components/ProcessList"
import TaskForm from "../components/TaskForm"

const findProcces = async ({ id_module, token, set, page }: { id_module: string, token: string, set: React.Dispatch<SetStateAction<Proccess[]>>, page: number }) => {
    const request = await axios.get(`http://localhost:3000/process/${id_module}/all`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: { page: page }
    })

    set((prev) => {
        const allModules = [...prev, ...request.data.data as Proccess[]]

        const uniqueModules = Array.from(
            new Map(allModules.map(module => [module.id, module])).values()
        )

        return uniqueModules

    })
}


export default function ModulePage() {
    const [page, setPage] = useState<number>(1)
    const [isProcessOpen, setProcessOpen] = useState<boolean>(false)
    const { token } = UseUserCredentials()
    const [process, setProcess] = useState<Proccess[]>([])
    const { name, id } = useParams<{name: string, id: string}>()

    useEffect(() => {
        if (!token) return

        findProcces({ id_module: id!, page, set: setProcess, token })
    }, [page, id, name, token])

    console.log(process)

    return (
        <section className="h-screen w-screen">

            <Modal open={isProcessOpen} onClose={() => {setProcessOpen(prev => !prev)}}>
                <ProcessForm id_module={id!} onClose={() => {}}/>
            </Modal>


          

            <div className="p-5">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold flex items-center gap-3"><FiGrid size={30}/> Processos do {name}</h1>
                        <Card onClick={() => setProcessOpen(prev => !prev)} className="p-3"><FiPlus/></Card>
                    </div>
                    <Separator />
                </div>

                <div className="w-full pt-5 overflow-x-auto ">
                    <ProcessList data={process}/>
                </div>



            </div>
        </section>
    )
}