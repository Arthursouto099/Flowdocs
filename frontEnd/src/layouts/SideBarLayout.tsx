import { Outlet, Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaUsers } from "react-icons/fa"; // Ícones de UI
import UseTheme from "../hooks/UseTheme";
import Card from "../components/ui/Card";
import { UseUserCredentials } from "../hooks/UseUserCredentials";

export default function SideBarLayout() {
    const { darkMode } = UseTheme();
    const { credentials } = UseUserCredentials()

    return (

        <div className="flex h-screen">
            {/* Sidebar */}
            <Card
                className={`w-64  rounded-none ${darkMode ? "bg-zinc-800" : "bg-zinc-300"
                    } flex flex-col`}
            >



                <nav className="flex-1 flex  p-5 flex-col">
                    <div className="p-3 flex gap-3">
                        <FaUser/>
                        <h1 className="font-semibold text-sm">{credentials?.name}</h1>
                    </div>

                    <Link
                        to="/home"
                        className="p-3  flex items-center gap-2"
                    >
                        <FaHome size={15} /> Home
                    </Link>
                    <Link
                        to="/collaborators"
                        className="p-3  flex items-center gap-2"
                    >
                        <FaUsers size={15} /> Colaboradores
                    </Link>
                    <Link
                        to="/settings"
                        className="p-3  flex items-center gap-2"
                    >
                        <FaCog size={15} /> Configurações
                    </Link>
                </nav>
            </Card>

            {/* Conteúdo principal */}
            <section className="flex-1 p-5 overflow-auto">
                <Outlet />
            </section>
        </div>
    );
}
