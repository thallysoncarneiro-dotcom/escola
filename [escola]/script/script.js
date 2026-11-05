let fotos = [
    "documento_de_imagem.img/sala1.png",
    "documento_de_imagem.img/sala2.png",
    "documento_de_imagem.img/sala3.png"
];
let posicao = 0;
let foto = document.getElementById("foto-carrossel-1");
setInterval(function(){
    posicao += 1;
    if(posicao >= fotos.length){
        posicao = 0;
    }
    foto.src = fotos[posicao];
}, 2000);
let fotos2 = [
    "documento_de_imagem.img/quadra1.png",
    "documento_de_imagem.img/quadra2.png",
    "documento_de_imagem.img/quadra3.png"
];
let posicao2 = 0;
let foto2 = document.getElementById("foto-carrossel-2");
setInterval(function(){
    posicao2 += 1;
    if(posicao2 >= fotos2.length){
        posicao2 = 0;
    }
    foto2.src = fotos2[posicao2];
}, 2000);
//===•===login===•=== //
let usuario = {
    email: "",
    senha: ""
};
let botao = document.getElementById("Confirmar_Cadastro");
botao.addEventListener("click", function() {
    usuario.email = document.getElementById("email").value;
    usuario.senha = document.getElementById("senha").value;
    
    localStorage.setItem("usuario",JSON.stringify(usuario));
    alert("Cadastro Realizado com Sucesso!");
    
    
});
usuario =JSON.parse(localStorage.getItem("usuario"));
//===•===print===•===//
let print = usuario;
document.getElementById("print1").textContent = print;