const API = "http://localhost:3000/produtos"

const form = document.getElementById("formProduto")
const tabela = document.getElementById("tabelaProdutos")

// ==========================
// LISTAR PRODUTOS
// ==========================
async function listarProdutos() {

    const resposta = await fetch(API)

    const produtos = await resposta.json()

    tabela.innerHTML = ""

    produtos.forEach(produto => {

        tabela.innerHTML += `
            <tr>
                <td>${produto.id}</td>
                <td>${produto.nome}</td>
                <td>R$ ${produto.preco}</td>

                <td>

                    <button onclick="editarProduto(
                        ${produto.id},
                        '${produto.nome}',
                        ${produto.preco}
                    )">
                        Editar
                    </button>

                    <button onclick="deletarProduto(${produto.id})">
                        Excluir
                    </button>

                </td>
            </tr>
        `
    })
}

// ==========================
// SALVAR PRODUTO
// ==========================
form.addEventListener("submit", async (e) => {

    e.preventDefault()

    const id = document.getElementById("produtoId").value

    const produto = {

        nome: document.getElementById("nome").value,

        preco: document.getElementById("preco").value
    }

    // UPDATE
    if (id) {

        await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        })

    } else {

        // CREATE
        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(produto)
        })
    }

    form.reset()

    document.getElementById("produtoId").value = ""

    listarProdutos()
})

// ==========================
// EDITAR
// ==========================
function editarProduto(id, nome, preco) {

    document.getElementById("produtoId").value = id
    document.getElementById("nome").value = nome
    document.getElementById("preco").value = preco
}

// ==========================
// DELETE
// ==========================
async function deletarProduto(id) {

    const confirmar = confirm("Deseja excluir este produto?")

    if (!confirmar) return

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    })

    listarProdutos()
}

listarProdutos()