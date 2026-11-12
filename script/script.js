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
    if (!foto || !botao || imagens.length === 0) {
        return;
    }

    let posicao = 0;
    let fotoVisivel = false;
    let paginaAtiva = true;
    let intervalo = null;
    function avancarFoto() {
        posicao = (posicao + 1) % imagens.length;
        foto.src = imagens[posicao];
    }

    function atualizarIntervalo() {
        let deveAvancar = fotoVisivel && paginaAtiva && !document.hidden;
        if (deveAvancar && intervalo === null) {
            intervalo = setInterval(avancarFoto, 2000);
        } else if (!deveAvancar && intervalo !== null) {
            clearInterval(intervalo);
            intervalo = null;
        }
    }

    botao.addEventListener("click", avancarFoto);

    let observador = new IntersectionObserver(function(entradas) {
        fotoVisivel = entradas.some(function(entrada) {
            return entrada.isIntersecting;
        });
        atualizarIntervalo();
    });
    observador.observe(foto);

    document.addEventListener("visibilitychange", atualizarIntervalo);
    window.addEventListener("pagehide", function() {
        paginaAtiva = false;
        atualizarIntervalo();
    });
    window.addEventListener("pageshow", function() {
        paginaAtiva = true;
        atualizarIntervalo();
    });
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
    try {
        let usuarioLido = JSON.parse(usuarioSalvo);
        if (usuarioLido && typeof usuarioLido === "object" && !Array.isArray(usuarioLido)) {
            usuario = { ...usuario, ...usuarioLido };
        } else {
            console.error("Os dados salvos do usuário não têm um formato válido.");
            localStorage.removeItem("usuario");
        }
    } catch (error) {
        if (!(error instanceof SyntaxError)) {
            throw error;
        }
        console.error("Não foi possível ler os dados salvos do usuário.", error);
        localStorage.removeItem("usuario");
    }
}

let botaoSair = document.getElementById("logout-btn");
if (botaoSair) {
    botaoSair.addEventListener("click", function() {
        localStorage.removeItem("usuario");
        window.location.href = "login.html";
    });
}

if (document.body.id !== "login") {
    aplicarTema(localStorage.getItem("tema") || "claro");
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
let NomeInput = document.getElementById("name");
let TelefoneInput = document.getElementById("phone");

if (EditarPerfilBtn && FormularioEditarPerfil && NomeInput && TelefoneInput) {
    EditarPerfilBtn.addEventListener("click", function() {
        FormularioEditarPerfil.hidden = !FormularioEditarPerfil.hidden;
        if (!FormularioEditarPerfil.hidden) {
            NomeInput.value = usuario.nome || "";
            TelefoneInput.value = usuario.telefone || "";
        }
    });
    FormularioEditarPerfil.addEventListener("submit", function(event) {
        event.preventDefault();
        usuario.nome = NomeInput.value.trim();
        usuario.telefone = TelefoneInput.value.trim();
        localStorage.setItem("usuario", JSON.stringify(usuario));
        mostrarInformacoesUsuario();
        FormularioEditarPerfil.hidden = true;
    });
}

//===•===modo de luminosidade===•===//

function aplicarTema(tema) {
    let temas = ["claro", "cinza", "escuro"];
    if (!temas.includes(tema)) {
        tema = "claro";
    }

    document.body.classList.remove("tema-claro", "tema-cinza", "tema-escuro");
    document.body.classList.add("tema-" + tema);
    localStorage.setItem("tema", tema);
}

function modo_escuro() {
    aplicarTema("escuro");
}

function modo_cinza() {
    aplicarTema("cinza");
}

function modo_claro() {
    aplicarTema("claro");
}
//===•===Configuração dos eventos.html===•===//
const botoes = document.querySelectorAll(".aba-evento");
const paineis = document.querySelectorAll(".painel-evento");

botoes.forEach(botao => {

    botao.addEventListener("click", () => {

        // Identifica o conteúdo escolhido
        let alvo = botao.dataset.alvo;

        // Desativa todos os botões
        botoes.forEach(aba => {
            aba.classList.remove("ativa");
        });

        // Esconde todos os conteúdos
        paineis.forEach(painel => {
            painel.classList.remove("ativo");
        });

        // Ativa o botão escolhido
        botao.classList.add("ativa");

        // Mostra o conteúdo correspondente
        document.getElementById(alvo)
            .classList.add("ativo");

    });

});