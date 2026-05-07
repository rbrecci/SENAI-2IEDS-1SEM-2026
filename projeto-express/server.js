// ==========================
// IMPORTAÇÕES
// ==========================
const express = require("express")
const sqlite3 = require("sqlite3").verbose()
const cors = require("cors")

// ==========================
// CONFIGURAÇÕES
// ==========================
const app = express()
const PORT = 3000

// permite receber JSON
app.use(express.json())

// libera CORS
app.use(cors())

// permite acessar arquivos da pasta public
app.use(express.static("public"))

// ==========================
// BANCO DE DADOS
// ==========================
const db = new sqlite3.Database("banco.db")

db.run(`
    CREATE TABLE IF NOT EXISTS produtos (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        nome TEXT,

        preco REAL
    )
`)

// ==========================
// GET - LISTAR PRODUTOS
// ==========================
app.get("/produtos", (req, res) => {

    db.all(
        "SELECT * FROM produtos",
        [],

        (err, rows) => {

            if (err) {
                return res.status(500).json(err)
            }

            res.json(rows)
        }
    )
})

// ==========================
// POST - CRIAR PRODUTO
// ==========================
app.post("/produtos", (req, res) => {

    const { nome, preco } = req.body

    db.run(

        "INSERT INTO produtos (nome, preco) VALUES (?, ?)",

        [nome, preco],

        function (err) {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({

                id: this.lastID,
                nome,
                preco
            })
        }
    )
})

// ==========================
// PUT - ATUALIZAR PRODUTO
// ==========================
app.put("/produtos/:id", (req, res) => {

    const { id } = req.params

    const { nome, preco } = req.body

    db.run(

        "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?",

        [nome, preco, id],

        function (err) {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                mensagem: "Produto atualizado com sucesso"
            })
        }
    )
})

// ==========================
// DELETE - DELETAR PRODUTO
// ==========================
app.delete("/produtos/:id", (req, res) => {

    const { id } = req.params

    db.run(

        "DELETE FROM produtos WHERE id = ?",

        [id],

        function (err) {

            if (err) {
                return res.status(500).json(err)
            }

            res.json({
                mensagem: "Produto deletado com sucesso"
            })
        }
    )
})

// ==========================
// INICIAR SERVIDOR
// ==========================
app.listen(PORT, () => {

    console.log(`Servidor rodando em:
    http://localhost:${PORT}`)
})