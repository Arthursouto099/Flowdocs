import { FaTasks } from "react-icons/fa";
import UseTheme from "../hooks/UseTheme";
import { UseUserCredentials } from "../hooks/UseUserCredentials";
import type {  Task, TaskCreateInput } from "../types/ApiTypes";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";






export default function TaskForm({data, onClose, id_process}: {data?: Task, onClose: () => void, id_process: string }) {
    const [task, setTask] = useState<TaskCreateInput>({title: "", description: "", id_process: ""})
    const {darkMode} = UseTheme()
    const {token} = UseUserCredentials()
    
    onClose()

     
    if(data?.id) {
        return
    }

    

    
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
          try {
            const request = await axios.post(`http://localhost:3000/process/task/create/${id_process}`, {
            title: task?.title,
            description: task?.description
        }, {headers: {Authorization: `Bearer ${token}`}})
        
        console.log(request.data)
      
        
        toast.success(request.data.message)
        }

        catch(e) {
            toast.error((e as Error).message)
        }

       
       
    }



    return (
       
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-96 p-6  rounded shadow">

                            <label className="flex flex-col col-span-2">
                                <span className="text-sm font-semibold mb-1">Titulo (Taks)</span>
                                <input
                                    type="text"
                                    name="title"
                                    onChange={(e) => {
                                       setTask((prev) => ({
                                        ...prev,
                                        title: e.target.value
                                       }))
                                    }}
                                    placeholder={`title`}
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>

                               


                            <label className="flex flex-col col-span-2 ">
                                <span className="text-sm font-semibold mb-1">Descricao</span>
                                <textarea
                                    
                                    name="description"
                                    onChange={(e) => {
                                        setTask((prev) => ({
                                            ...prev,
                                            description: e.target.value
                                        }))
                                    }}
                                    placeholder="Imztt17*"
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>





                            <button

                                className={`col-span-2  flex justify-center gap-4 ${darkMode ?  "bg-zinc-700" : "bg-zinc-300"}  text-white font-semibold rounded p-2  transition`}
                            >
                                Cadastrar Task <FaTasks size={20}/>
                            </button>
                        </form>
                   
    )


}