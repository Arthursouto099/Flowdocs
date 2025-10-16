import express, { urlencoded } from "express"
import "dotenv/config"
import cors from "cors"

import { connectPrisma} from  "./lib/prisma"
import appRouterV1 from "./routes/v1/router"

const app = express()


app.use(cors())
app.use(express.json())
app.use(urlencoded({extended: true}))
app.use(appRouterV1)


const port = process.env.PORT ?? 3000

app.listen(port, () => {
    connectPrisma()
    console.log(`runing in port http://localhost:${port}/api`)
})