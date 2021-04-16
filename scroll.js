const CARREGAR_AUTOMATICAMENTE = false;
id = 0;
fim = false;

if (CARREGAR_AUTOMATICAMENTE){
    document.addEventListener('scroll', scroll);
}

function gerarPerfil(nome, descricao, id, img){
    return ['<section id="perfil-"',
                id,
            '"><div><div class="perfil"><table><th class="imagem">',
            '<img src="',
            img,
            '"></img></th><th class="dados"><h3 class="nome">',
            nome,
            '</h3><div class="descricao"><h3>',
            descricao,
            '</h3></div></th></table></div></div></section>',
        ].join('\n');
}

function scroll() {
    if(fim)return;
    if (isInViewport(document.getElementById('fim'))) {
        console.log(fim);
        inserirPerfil();
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function acabou (){
    if(fim)return;
    document.getElementById('fim').insertAdjacentHTML('beforebegin', '<h4 style="margin:50px">Fim</h4>');
    document.getElementById('fim').remove();
    fim=true;
}

function inserirPerfil(){
    if(fim)return;
    id++;
    let ajax = new XMLHttpRequest();
    url = 'https://reqres.in/api/users/'+id.toString();
    ajax.open('GET', url);
    ajax.send();
    console.log(ajax);
    ajax.onreadystatechange = () => {
        
        if (ajax.status == 404){
            acabou();
        }
        if (ajax.readyState == 4 && ajax.status == 200) {//sucesso
            dados = JSON.parse(ajax.response).data;
            console.log(dados);
            nome = dados.first_name+' '+dados.last_name;
            perfil = gerarPerfil(nome, dados.email, id.toString(), dados.avatar);
            document.getElementById("fim").insertAdjacentHTML('beforebegin', perfil);
        }
    }
    return null;
}