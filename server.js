import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import VendaMensal from "./VendaMensal.js"

dotenv.config()

// process.env.MONGO_URI
const app = express()
const PORT = 3000

// tudo de req virar json
app.use(express.json())

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`CONECTADO AO MONGODB!`)
    }catch(error){
        console.error(`ERRO AO CONECTADO COM O BANCO DE DADOS!, ${error}`)
    }
}

connectDB()

// Middleware - Função que trata as informações recebidas

// enviar
app.post("/vendas", async (req, res)=> {
    try{
        const novaVendaMensal = await VendaMensal.create(req.body)
        res.json(novaVendaMensal)
        
    }catch(error){
        res.json({error: error})
    }
})

// buscar todos
app.get("/vendas", async (req, res) => {
    try{
        const vendasMensais = await VendaMensal.find()
        console.table(vendasMensais)
        res.json(vendasMensais)
        
    }catch(error){
        res.json({error: error})
    }
})

// atualizar
app.put("/vendas/:id", async (req, res)=>{
    try {
        
        const novaVendaMensal = await VendaMensal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )

        res.json(novaVendaMensal)

    } catch (error) {
        res.json({error: error})
    }
})


// deletar
app.delete("/vendas/:id", async (req, res) => {
    try {
        const vendaMensalExcluida = await VendaMensal.findByIdAndDelete(
            req.params.id
        )
        res.json(vendaMensalExcluida)
    } catch (error) {
        res.json({error: error})
    }
})




app.get("/", (req, res) => {
    res.send("<h1>Bem Vindo a API!</h1>")
})



app.listen(PORT, ()=> console.info(`Server online: http://localhost:${PORT}`))


