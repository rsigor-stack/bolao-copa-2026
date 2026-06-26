window.Bolao = window.Bolao || {};

Bolao.flags = {};

Bolao.flags.BANDEIRAS = {
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

Bolao.flags.TRIGRAMAS = {
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

Bolao.flags.timePorTrigrama = 
function (tri){

    const iso =
        Bolao.flags.BANDEIRAS_TRIGRAMA[tri];

    const img = iso
        ? `
            <img
                src="https://flagcdn.com/w40/${iso}.png"
                style="
                    width:36px;
                    height:26px;
                    border-radius:4px;
                    object-fit:cover;
                    display:block;
                    margin:auto;
                ">
          `
        : "";

    return `

        <div style="
            display:flex;
            flex-direction:column;
            align-items:center;
            gap:4px;
            min-width:42px;
        ">

            ${img}

            <span style="
                font-size:.72rem;
                font-weight:700;
                letter-spacing:.5px;
            ">

                ${tri}

            </span>

        </div>

    `;

}

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

        ${Bolao.flags.timePorTrigrama(casa)}

        <strong style="color:var(--gold)">

            ${placar.replace("x"," × ")}

        </strong>

        ${Bolao.flags.timePorTrigrama(fora)}

    </div>

    `;

}
