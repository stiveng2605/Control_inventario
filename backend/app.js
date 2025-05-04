import express, { json } from 'express'
import { productRouter } from './routes/productRoutes.js'
import cors from 'cors'

const app = express()


app.disable('x-powered-by')

//middleware que Toma el cuerpo del requerimiento para usarlo en el post
app.use(json())

app.use(cors({
    origin: ['http://localhost:8100', 'http://localhost:4200'],
}));

app.use('/products', productRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
})

export default app

