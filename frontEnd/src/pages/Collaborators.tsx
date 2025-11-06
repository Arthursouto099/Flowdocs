import { FiSearch, FiUserX } from "react-icons/fi";
import Card from "../components/ui/Card";
import { useState } from "react";
import type { User } from "../types/ApiTypes";
import Modal from "../components/ui/Modal";
import UserForm from "../components/UserForm";


export default function Collaborators() {
    const [searchParam, setSearchParam] = useState<string>()
    const [collaborators, setCollaborators] = useState<User[]>([])
    const [isUserOpen, setUserOpen] = useState<boolean>(false)

    

    return (
        <section className="h-full w-full p-5 ">

            <Modal open={isUserOpen} onClose={() => { setUserOpen(prev => !prev) }}>
                            <UserForm onClose={() => { } } />
            </Modal>

            <div className="mt-2">
                <Card className="p-2 gap-3 flex rounded-md justify-between ">

                    <input
                        onChange={(e) => setSearchParam(e.target.value)}
                        placeholder="Digite um pista do modulo..."
                        className="w-full focus:outline-none focus:ring-0"
                    />
                    <FiSearch size={20} />
                </Card>

                <div className="mt-5 w-full flex justify-center">
                    <div className="rounded-lg bg-zinc-900/70 h-[500px] w-full  p-6 flex flex-col justify-center items-center border border-zinc-700 shadow-lg">
                        {collaborators.length < 1 ? (
                            <div className="flex flex-col gap-4 justify-center items-center text-center">
                                <div className="bg-zinc-800 p-4 rounded-full flex justify-center items-center">
                                    <FiUserX className="h-12 w-12 text-zinc-400" />
                                </div>
                                <h1 className="text-2xl font-semibold text-zinc-200">
                                    Nenhum colaborador adicionado
                                </h1>
                                <p className="text-zinc-400">
                                    Parece que você ainda não adicionou nenhum colaborador. Comece adicionando para ver as informações aqui.
                                </p>
                                <button onClick={() => setUserOpen(true)} className="mt-3   text-white px-5 py-2 rounded-md transition">
                                    Adicionar Colaborador
                                </button>
                            </div>
                        ) : (
                            <div>
                                {/* Lista de colaboradores aqui */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}