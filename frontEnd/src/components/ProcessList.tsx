// (ou de onde vem seu tipo)
import { FaCalendar, FaIdBadge} from "react-icons/fa";
import { Separator } from "../components/ui/Card";
import UseTheme from "../hooks/UseTheme";
import type { Proccess } from "../types/ApiTypes";
import { Link } from "react-router";

export default function ProcessList({ data }: { data: Proccess[] }) {
    const { darkMode } = UseTheme()

    return (
        <div className="w-full h-full grid grid-cols-6 gap-4">
            {data.map((process) => (
                <Link key={process.id} to={`/process/${process.name}/${process.id}`}>
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

                            <Separator/>

                          

                      

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
                </Link>
            ))}
        </div>
    );
}
