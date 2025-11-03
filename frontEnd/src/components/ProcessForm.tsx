
import UseTheme from "../hooks/UseTheme";
import { UseUserCredentials } from "../hooks/UseUserCredentials";
import type { Proccess } from "../types/ApiTypes";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FiRepeat } from "react-icons/fi";






export default function ProcessForm({data, onClose, id_module}: {data?: Proccess, onClose: () => void, id_module: string }) {
    const [process, setProcess] = useState<{name: string, description: string, id_module: string}>({name: "", description: "", id_module: ""})
    const {darkMode} = UseTheme()
    const { token} = UseUserCredentials()

    
    
    onClose()

     
    if(data?.id) {
        return
    }

    

    
    
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
          try {
            const request = await axios.post(`http://localhost:3000/process/create`, {
            name: process?.name,
            description: process?.description,
            id_module: id_module
        }, {headers: {Authorization: `Bearer ${token}`}})

      
        
        toast.success(request.data.message)
        }

        catch(e) {
            toast.error((e as Error).message)
        }

       
       
    }



    return (
       
          <form onSubmit={onSubmit} className="grid grid-cols-2 gap-4 w-96 p-6  rounded shadow">

                            <label className="flex flex-col col-span-2">
                                <span className="text-sm font-semibold mb-1">Nome (Processo)</span>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={(e) => {
                                       setProcess((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                       }))
                                    }}
                                    placeholder={`email@gmail.com`}
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring focus:ring-blue-400"
                                    required
                                />
                            </label>

                               


                            <label className="flex flex-col col-span-2 ">
                                <span className="text-sm font-semibold mb-1">Descricao</span>
                                <textarea
                                    
                                    name="description"
                                    onChange={(e) => {
                                        setProcess((prev) => ({
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
                                Cadastrar Processo <FiRepeat size={20}/>
                            </button>
                        </form>
                   
    )


}