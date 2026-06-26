/**
 * ==========================================================
 * Bolão Se Joga Copa do Mundo 2026
 * Flags / Seleções
 * ==========================================================
 */

(function () {

    "use strict";

    if (!window.Bolao) {

        throw new Error(
            "core.js deve ser carregado antes de flags.js"
        );

    }

    //------------------------------------------------------
    // Objeto principal
    //------------------------------------------------------

    Bolao.flags = {

  BANDEIRAS = {
  'Argentina':'ar','Brasil':'br','Colômbia':'co','Equador':'ec',
  'Paraguai':'py','Uruguai':'uy','Canadá':'ca','Curaçao':'cw',
  'Estados Unidos':'us','Haiti':'ht','México':'mx','Panamá':'pa',
  'Alemanha':'de','Áustria':'at','Bélgica':'be',
  'Bósnia e Herzegovina':'ba','Croácia':'hr','Escócia':'gb-sct',
  'Espanha':'es','França':'fr','Holanda':'nl','Inglaterra':'gb-eng',
  'Noruega':'no','Portugal':'pt','República Tcheca':'cz','Suécia':'se',
  'Suíça':'ch','Turquia':'tr','África do Sul':'za','Argélia':'dz',
  'Cabo Verde':'cv','RD Congo':'cd','Costa do Marfim':'ci','Egito':'eg',
  'Gana':'gh','Marrocos':'ma','Senegal':'sn','Tunísia':'tn',
  'Arábia Saudita':'sa','Austrália':'au','Coreia do Sul':'kr',
  'Iraque':'iq','Irã':'ir','Japão':'jp','Jordânia':'jo',
  'Catar':'qa','Uzbequistão':'uz','Nova Zelândia':'nz',
};

  TRIGRAMAS = {
  // CONMEBOL
  'Argentina':'ARG','Brasil':'BRA','Colômbia':'COL','Equador':'ECU',
  'Paraguai':'PAR','Uruguai':'URU',
  // CONCACAF
  'Canadá':'CAN','Curaçao':'CUW','Estados Unidos':'USA',
  'Haiti':'HAI','México':'MEX','Panamá':'PAN',
  // UEFA
  'Alemanha':'GER','Áustria':'AUT','Bélgica':'BEL',
  'Bósnia e Herzegovina':'BIH','Croácia':'CRO','Escócia':'SCO',
  'Espanha':'ESP','França':'FRA','Holanda':'NED','Inglaterra':'ENG',
  'Noruega':'NOR','Portugal':'POR','República Tcheca':'CZE','Suécia':'SWE',
  'Suíça':'SUI','Turquia':'TUR',
  // CAF
  'África do Sul':'RSA','Argélia':'ALG','Cabo Verde':'CPV',
  'Congo DR':'COD','Costa do Marfim':'CIV','Egito':'EGY',
  'Gana':'GHA','Marrocos':'MAR','Senegal':'SEN','Tunísia':'TUN',
  // AFC
  'Arábia Saudita':'KSA','Austrália':'AUS','Coreia do Sul':'KOR',
  'Iraque':'IRQ','Irã':'IRN','Japão':'JPN','Jordânia':'JOR',
  'Catar':'QAT','Uzbequistão':'UZB',
  // OFC
  'Nova Zelândia':'NZL',
};

       Object.keys(
    Bolao.flags.TRIGRAMAS
).forEach(nome=>{

    const tri =
        Bolao.flags.TRIGRAMAS[nome];

    const iso =
        Bolao.flags.BANDEIRAS[nome];

    if(tri && iso){

        Bolao.flags.BANDEIRAS_TRIGRAMA[
            tri
        ] = iso;

    }

});

//------------------------------------------------------
// Índice reverso por ISO
//------------------------------------------------------

Bolao.flags.SELECOES_ISO = {};

Object.keys(Bolao.flags.BANDEIRAS).forEach(nome => {

    const iso = Bolao.flags.BANDEIRAS[nome];

    Bolao.flags.SELECOES_ISO[iso] = nome;

});

//------------------------------------------------------
// Retorna todas as informações de uma seleção
//------------------------------------------------------

Bolao.flags.getSelecao = function (valor) {

    if (!valor) return null;

    valor = String(valor).trim();

    let nome = null;

    //--------------------------------------------------
    // Pesquisa pelo nome
    //--------------------------------------------------

    if (Bolao.flags.BANDEIRAS[valor]) {

        nome = valor;

    }

    //--------------------------------------------------
    // Pesquisa pelo trigrama
    //--------------------------------------------------

    if (!nome) {

        nome = Object.keys(Bolao.flags.TRIGRAMAS).find(

            pais =>

                Bolao.flags.TRIGRAMAS[pais].toUpperCase() ===
                valor.toUpperCase()

        );

    }

    //--------------------------------------------------
    // Pesquisa pelo ISO
    //--------------------------------------------------

    if (!nome) {

        nome = Bolao.flags.SELECOES_ISO[
            valor.toLowerCase()
        ];

    }

    //--------------------------------------------------
    // Não encontrou
    //--------------------------------------------------

    if (!nome) {

        return null;

    }

    const iso = Bolao.flags.BANDEIRAS[nome];

    const tri = Bolao.flags.TRIGRAMAS[nome];

    return {

        nome,

        trigrama: tri,

        iso,

        bandeira:

            `${Bolao.config.FLAG_CDN}/w80/${iso}.png`,

        //--------------------------------------------------
        // Renderizador padrão
        //--------------------------------------------------

        render(options = {}) {

            const largura = options.largura || 40;

            const mostrarNome =
                options.nome ?? false;

            const mostrarTrigrama =
                options.trigrama ?? true;

            const classe =
                options.classe || "";

            const estilo =
                options.style || "";

            return `

                <div class="flag-card ${classe}"
                     style="${estilo}">

                    <img
                        src="${Bolao.config.FLAG_CDN}/w${largura}/${iso}.png"
                        alt="${nome}"
                        loading="lazy">

                    ${
                        mostrarTrigrama
                        ? `<div class="flag-tri">${tri}</div>`
                        : ""
                    }

                    ${
                        mostrarNome
                        ? `<div class="flag-name">${nome}</div>`
                        : ""
                    }

                </div>

            `;

        }

    };

};
  





  
  Bolao.flags.getISO =
function(trigrama){

    return Bolao.flags
        .BANDEIRAS_TRIGRAMA[
            trigrama
        ] || null;

};

Bolao.flags.getTrigrama =
function(nome){

    return Bolao.flags
        .TRIGRAMAS[nome] || "";

};

  Bolao.flags.getBandeira =
function(trigrama,
         largura=40){

    const iso =
        Bolao.flags.getISO(
            trigrama
        );

    if(!iso) return "";

    return

`${Bolao.config.FLAG_CDN}/w${largura}/${iso}.png`;

};


  Bolao.flags.timePorTrigrama =
function(tri){

    const img =
        Bolao.flags.getBandeira(
            tri,
            40
        );

    return `

    <div class="time-card">

        <img
            src="${img}"
            class="flag">

        <span>

            ${tri}

        </span>

    </div>

    `;

};
  
  //======================================================
// FORMATA JOGO
//======================================================
Bolao.flags.formatarJogo = 
function (texto){

    if(!texto) return "-";

    const partes =
        texto.split(" ");

    if(partes.length<3)
        return texto;

    const casa =
        partes[0];

    const placar =
        partes[1];

    const fora =
        partes[2];

    return `

    <div style="display:flex;
                justify-content:center;
                align-items:center;
                gap:10px;">

        ${timePorTrigrama(casa)}

        <strong style="color:var(--gold)">

            ${placar.replace("x"," × ")}

        </strong>

        ${timePorTrigrama(fora)}

    </div>

    `;

}
  

    };

})();

