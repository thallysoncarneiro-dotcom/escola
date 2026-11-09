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

function iniciarCarrossel(idFoto, idBotao, imagens) {
    let foto = document.getElementById(idFoto);
    let botao = document.getElementById(idBotao);
    if (!foto || !botao) {
        return;
    }

    let posicao = 0;
    function avancarFoto() {
        posicao = (posicao + 1) % imagens.length;
        foto.src = imagens[posicao];
    }

    botao.addEventListener("click", avancarFoto);
    setInterval(function(){
        avancarFoto();
    }, 2000);
}

iniciarCarrossel("foto-carrossel-1", "botao-carrossel-1", fotos);
iniciarCarrossel("foto-carrossel-2", "botao-carrossel-2", fotos2);

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
//===•===editar perfil===•===//
let EditarPerfilBtn = document.getElementById("edit-profile-btn");
let FormularioEditarPerfil = document.getElementById("edit-profile-form");
let BotaoSalvarPerfil = document.getElementById("save-profile-btn");
let NomeInput = document.getElementById("name");
let TelefoneInput = document.getElementById("phone");
let SalvarPerfilBtn = document.getElementById("save-profile-btn");

if (EditarPerfilBtn && FormularioEditarPerfil && BotaoSalvarPerfil) {
    EditarPerfilBtn.addEventListener("click", function() {
        FormularioEditarPerfil.hidden = !FormularioEditarPerfil.hidden;
    });
    FormularioEditarPerfil.addEventListener("submit", function(event) {
        event.preventDefault();
    });
    BotaoSalvarPerfil.addEventListener("click", function() {
            NomeInput = document.getElementById("name");
            TelefoneInput = document.getElementById("phone");
    });
    SalvarPerfilBtn.addEventListener("click", function() {
        usuario.nome = NomeInput.value.trim();
        usuario.telefone = TelefoneInput.value.trim();
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarInformacoesUsuario();
        FormularioEditarPerfil.hidden = true;
    });
}