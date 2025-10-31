
import Card, { Separator } from "../components/ui/Card"
import UseTheme from "../hooks/UseTheme"



export default function Register() {
    const { darkMode } = UseTheme()
    console.log(darkMode)

    return (
        <section className={`$ h-screen w-screen flex justify-center items-center`}>
            <Card className="w-2xl min-h-96 p-10" >
                <div>

                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl">Registrar Conta</h1>
                        <Separator />
                    </div>

                    <div>
                        <form>

                        </form>
                    </div>

                </div>
            </Card>
        </section>
    )
}