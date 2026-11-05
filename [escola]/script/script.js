let fotos = [
    "documento_de_imagem.img/sala1.png",
    "documento_de_imagem.img/sala2.png",
    "documento_de_imagem.img/sala3.png"
];
let fotos2 = [
    "documento_de_imagem.img/quadra1.png",
    "documento_de_imagem.img/quadra2.png",
    "documento_de_imagem.img/quadra3.png"
];

function iniciarCarrossel(id, imagens) {
    let foto = document.getElementById(id);
    if (!foto) {
        return;
    }

    let posicao = 0;
    setInterval(function(){
        posicao = (posicao + 1) % imagens.length;
        foto.src = imagens[posicao];
    }, 2000);
}

iniciarCarrossel("foto-carrossel-1", fotos);
iniciarCarrossel("foto-carrossel-2", fotos2);

//===•===login===•=== //
let usuario = {
    email: "",
    senha: ""
};
let botao = document.getElementById("Confirmar_Cadastro");
if (botao) {
    botao.addEventListener("click", function() {
        let email = document.getElementById("email");
        let senha = document.getElementById("senha");
        if (!email || !senha) {
            return;
        }

        if (email.value && senha.value) {
            usuario.email = email.value;
            usuario.senha = senha.value;
            localStorage.setItem("usuario", JSON.stringify(usuario));
            alert("Cadastro Realizado com Sucesso!");
            window.location.href = "index.html";
        } else {
            alert("Preencha todos os campos!");
        }
    });
}

let usuarioSalvo = localStorage.getItem("usuario");
if (usuarioSalvo) {
    usuario = JSON.parse(usuarioSalvo);
}

//===•===print===•===//
let campoEmail = document.getElementById("print1");
let campoNome = document.getElementById("print2");
let campoTelefone = document.getElementById("print3");
let perfil = document.getElementById("perfil");
let introducaoPerfil = document.getElementById("profile-intro");

if (campoNome && !usuario.nome) {
    let nome = prompt("Qual é o seu nome?");
    usuario.nome = nome ? nome.trim() : "";
    if (usuario.nome) {
        localStorage.setItem("usuario", JSON.stringify(usuario));
    }
}

function mostrarInformacoesUsuario() {
    if (campoNome) {
        campoNome.textContent = "Nome: " + (usuario.nome || "");
    }
    if (campoEmail) {
        campoEmail.textContent = "Email: " + (usuario.email || "");
    }
    if (campoTelefone) {
        campoTelefone.textContent = "Telefone: " + (usuario.telefone || "");
    }
}

if (perfil && introducaoPerfil) {
    let camposUsuario = [campoNome, campoEmail, campoTelefone];
    let temporizador;

    camposUsuario.forEach(function(campo) {
        if (campo) {
            campo.hidden = true;
        }
    });

    perfil.addEventListener("toggle", function() {
        clearTimeout(temporizador);

        if (!perfil.open) {
            introducaoPerfil.hidden = true;
            camposUsuario.forEach(function(campo) {
                if (campo) {
                    campo.hidden = true;
                }
            });
            return;
        }

        if (!usuario.telefone) {
            let telefone = prompt("Qual é o seu telefone?");
            usuario.telefone = telefone ? telefone.trim() : "";
            if (usuario.telefone) {
                localStorage.setItem("usuario", JSON.stringify(usuario));
            }
        }

        introducaoPerfil.hidden = false;
        temporizador = setTimeout(function() {
            introducaoPerfil.hidden = true;
            mostrarInformacoesUsuario();
            camposUsuario.forEach(function(campo) {
                if (campo) {
                    campo.hidden = false;
                }
            });
        }, 1500);
    });
}