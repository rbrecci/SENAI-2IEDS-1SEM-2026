let mensagem = document.getElementById("mensagem");
let chances = 3;
import dados from './data.json' with { type: 'json' };
document.getElementById("Login").addEventListener("click", login);

function login() {
    const user = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    const encontrado = dados.find(usuario => 
        user == usuario.nome && senha == usuario.senha
    );

    if (encontrado) {
        mensagem.innerHTML = "Acesso liberado";
        return;
    } else {
        chances--;
        if (chances <= 0) {
            mensagem.innerHTML = "SISTEMA BLOQUEADO - Procure o Suporte.";
        } else {
            mensagem.innerHTML = `${chances} chances restantes`;
        }
    }
}