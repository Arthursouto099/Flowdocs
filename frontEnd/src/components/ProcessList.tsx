// (ou de onde vem seu tipo)
import { FaCalendar, FaIdBadge } from "react-icons/fa";
import Card, { Separator } from "../components/ui/Card";
import UseTheme from "../hooks/UseTheme";
import type { Proccess } from "../types/ApiTypes";
import { FiPlusSquare } from "react-icons/fi";
import Modal from "./ui/Modal";
import TaskForm from "./TaskForm";
import { useState } from "react";

//  to={`/process/${process.name}/${process.id}`}

export default function ProcessList({ data }: { data: Proccess[] }) {
    const { darkMode } = UseTheme()
    const [isTaskOpen, setTaskOpen] = useState<boolean>(false)


    return (
        <div className="w-full h-full grid grid-cols-6 gap-4">

            {data.map((process) => (

                <div key={process.id}>
                    <Modal open={isTaskOpen} onClose={() => { setTaskOpen(prev => !prev) }}>
                        <TaskForm id_process={process.id} onClose={() => {}}/> 
                    </Modal>

                    <div key={process.id} className="p-4 bg-zinc-700/10 shadow-md rounded">
                        <div className="flex flex-col gap-2">

                            <div className="mb-2">
                                <div className="flex items-center py-4 gap-2">
                                    <FaIdBadge />
                                    <h3 className="text-sm text-zinc-500">Status: {process.status}</h3>
                                </div>

                                <h1 className="text-lg font-semibold">{process.name}</h1>
                                <p className={`${darkMode ? "text-zinc-400" : "text-zinc-200"}`}>
                                    {process.description}
                                </p>
                            </div>

                            <Separator />


                            <div className="pt-2">
                                <div 
                                onClick={() => setTaskOpen(prev => !prev)}
                                className="text-sm flex items-center gap-2 cursor-pointer font-semibold">
                                    <h1>Adicionar nova tarefa</h1>
                                    <FiPlusSquare />
                                </div>

                                <div className="mt-3 flex gap-2 flex-col">
                                    {process.tasks.map((task) => (
                                        <div className="p-2 flex justify-between items-center" key={task.id}>
                                            <div className="text-sm">
                                                <h1 className="font-semibold">{task.title}</h1>
                                                <p className="text-zinc-400">{task.description}</p>
                                            </div>

                                            <div>
                                                
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>





                            <div className="pt-3">
                                <h1 className="flex gap-2 items-center text-sm text-zinc-500">
                                    <FaCalendar />
                                    {new Date(process.created_at).toLocaleString('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                    })}
                                </h1>
                            </div>

                            <div>

                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
