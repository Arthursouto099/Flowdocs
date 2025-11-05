// (ou de onde vem seu tipo)
import { FaArchive, FaCalendar, FaCheckSquare } from "react-icons/fa";
import{ Separator } from "../components/ui/Card";
import UseTheme from "../hooks/UseTheme";
import type { Proccess } from "../types/ApiTypes";
import { FiCheckCircle, FiCircle, FiPlusSquare } from "react-icons/fi";
import Modal from "./ui/Modal";
import TaskForm from "./TaskForm";
import { useState } from "react";
import ProfileImage from "./Profile_image";
import { toast } from "react-toastify";
import { UseUserCredentials } from "../hooks/UseUserCredentials";
import axios from "axios";

//  to={`/process/${process.name}/${process.id}`}

export default function ProcessList({ data, onUpdate }: { data: Proccess[], onUpdate?: () => void }) {
    const { darkMode } = UseTheme()
    const {token} = UseUserCredentials()
    const [isTaskOpen, setTaskOpen] = useState<boolean>(false)


    const changeStateTask = async ({id_task, oldState}: {id_task: string, oldState: string}) => {
        try {
            const request = await axios.put(`http://localhost:3000/process/task/change/${id_task}`, {
                old_state: oldState
            }, { headers: { Authorization: `Bearer ${token}` } })
            console.log(request)
            
            if(onUpdate) {
                onUpdate()
            } 

            toast.success(request.data.message)
        }

        catch (e) {
            toast.error((e as Error).message)
        }
    }

    return (
        <div className=" w-full h-full grid grid-cols-6 gap-4">



            {data.map((process) => (


                <div className="relative" key={process.id}>
                    <div className={`absolute flex  items-center gap-2 -top-3 right-0 text-sm  bg-zinc-700/20 p-2 rounded-md ${process.status}`}>

                        {process.status === "ATIVO" ? (
                            <div>
                                <FaCheckSquare />
                            </div>
                        ) : (
                            <div>
                                <FaArchive />
                            </div>
                        )}
                        {process.status}
                    </div>

                    <Modal open={isTaskOpen} onClose={() => { setTaskOpen(prev => !prev) }}>
                        <TaskForm id_process={process.id} onClose={() => { }} />
                    </Modal>

                    <div key={process.id} className="p-4 bg-zinc-700/10 shadow-md rounded">
                        <div className="flex flex-col gap-2">

                            <div className="mb-2">
                                {/* <div className="flex items-center py-4 gap-2">
                                    <FaIdBadge />
                                    <h3 className="text-sm text-zinc-500">Status: {process.status}</h3>
                                </div> */}

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
                                        <div
                                            className="p-2 bg-zinc-700/20 rounded-md flex justify-between items-center"
                                            key={task.id}
                                        >
                                            <div className="text-sm flex-1 min-w-0">
                                                <h1 className="font-semibold flex items-center gap-2 wrap-break-word whitespace-normal">
                                                    {task.status === "PENDENTE" ? <FiCircle onClick={
                                                        () => {changeStateTask({id_task: task.id, oldState: task.status})}
                                                    } /> : <FiCheckCircle onClick={
                                                        () => {changeStateTask({id_task: task.id, oldState: task.status})}
                                                    }/>}
                                                    {task.title}
                                                </h1>
                                                <p className="text-zinc-400 wrap-break-word whitespace-normal">
                                                    {task.description}
                                                </p>
                                            </div>

                                            <ProfileImage user={task.user} />
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
