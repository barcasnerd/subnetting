// Elementos de HTML
var generateButton = document.getElementById("buttonGenerator");
var resultsContainer = document.getElementById("resultsContainer");

// Variables de uso
var Network = {
    ip: null,
    requested: null,
    clase: null,
    mask: null,
    porcionRed: null,
    porcionHost: null,
    bitsRobados: null,
    newMask: null,
    format: null,
    rango: null,
    hosts: null
};

//Acciones de eventos
generateButton.addEventListener('click', () => {
    resultsContainer.innerHTML = "";
    var ip1 = parseInt(document.getElementById("ip1").value);
    var ip2 = parseInt(document.getElementById("ip2").value);
    var ip3 = parseInt(document.getElementById("ip3").value);
    var ip4 = parseInt(document.getElementById("ip4").value);
    var nets = parseInt(document.getElementById("network").value);
    var IP = [ip1, ip2, ip3, ip4];
    generateSubnetting(IP, nets);
});

//Funciones y métodos
function generateSubnetting(IP, cant) {
    var sw = validateFields(IP, cant);
    if (sw) {
        stepByStep(IP, cant);
    } else {
        alert('Revisa los campos');
    }
}

//Valida los campos de entrada
function validateFields(IP, n) {
    var cont = 0;
    for (let i = 0; i < IP.length; i++) {
        if (isNaN(IP[i])) {
            cont++;
        }
    }
    if (cont > 0 || isNaN(n)) {
        return false;
    } else {
        return true;
    }
}

//Identifica la clase de la red dada
function identifyClass(ip) {
    if (ip < 128) {
        return 'A';
    } else if (ip > 127 && ip < 192) {
        return 'B';
    } else {
        return 'C';
    }
}

//Identifica la máscara por defecto de la clase dada
function identifyMask(clase) {
    if (clase === 'A') {
        return '255.0.0.0';
    } else if (clase === 'C') {
        return '255.255.0.0';
    } else {
        return '255.255.255.0';
    }
}

//Funciones de los procesos paso a paso
function stepByStep(ip, cant) {
    firsStep(ip);
    secondStep(Network.clase);
    thirdStep(ip, cant, Network.mask);
    fourthStep(Network.clase, Network.newMask);
    showAllSteps(Network);
}

//Primer paso
function firsStep(ip) {
    Network.ip = identifyIp(ip);
    Network.clase = identifyClass(ip[0]);
    Network.mask = identifyMask(Network.clase);
}

//Agrega la Ip al objeto principal
function identifyIp(ip) {
    return "" + ip[0] + "." + ip[1] + "." + ip[2] + "." + ip[3];
}

//Agrega el tipo de clase al objeto principal
function identifyClass(ip) {
    if (ip < 128) {
        return 'A';
    } else if (ip > 127 && ip < 192) {
        return 'B';
    } else {
        return 'C';
    }
}

// Agrega la máscara por defecto al objeto principal
function identifyMask(clase) {
    if (clase === 'A') {
        return '255.0.0.0';
    } else if (clase === 'B') {
        return '255.255.0.0';
    } else {
        return '255.255.255.0';
    }
}

//Segundo paso
function secondStep(clase) {
    if (clase == 'A') {
        Network.porcionRed = 8;
    } else if (clase == 'B') {
        Network.porcionRed = 16;
    } else {
        Network.porcionRed = 24;
    }
    Network.porcionHost = 32 - Network.porcionRed;
}

//Tercer paso
function thirdStep(ip, cant, mask) {
    var i = 0;
    while ((2 ** i) < cant) {
        i++;
    }
    if (i > 0 && i < 25) {
        Network.requested = cant;
        Network.bitsRobados = i;
        Network.hosts = 2 ** (Network.porcionHost - Network.bitsRobados);
        Network.format = Network.bitsRobados + Network.porcionRed;
        Network.newMask = newMask(Network.format);
    } else {
        alert('La cantidad de de redes pedidas para esta red supera el límite de procesamiento');
    }
}

//Proporciona la nueva máscara de red de las redes a generar
function newMask(n) {
    var cad = "";
    var mask = [];
    for (let i = 0; i < n; i++) {
        cad = cad + 1;
    }
    for (let i = n; i < 32; i++) {
        cad = cad + 0;
    }

    mask[0] = cad.substring(0, 8);
    mask[1] = cad.substring(8, 16);
    mask[2] = cad.substring(16, 24);
    mask[3] = cad.substring(24, 32);
    mask = mask2Decimal(mask);
    return "" + mask[0] + "." + mask[1] + "." + mask[2] + "." + mask[3];
}

// convierte una máscara en formato vector en binario a formato vector en decimal
function mask2Decimal(mask) {
    for (let i = 0; i < mask.length; i++) {
        mask[i] = parseInt(mask[i], 2);
    }
    return mask;
}

//Cuarto paso
function fourthStep(clase, mask) {
    Network.rango = identifyRange(clase, mask);
}

//Devuelve el rango de cada subred
function identifyRange(clase, mask) {
    if (clase === 'A') {
        return 256 - parseInt(mask.split(".")[1]);
    } else if (clase === 'B') {
        return 256 - parseInt(mask.split(".")[2]);
    } else {
        return 256 - parseInt(mask.split(".")[3]);
    }
}

//Mostrar todo
function showAllSteps(Network) {
    const hosts = Network.hosts;
    resultsContainer.innerHTML = resultsContainer.innerHTML + `
    <h4 class="display-4">Entradas:</h4>
    <p class="lead">Dirección IP: ${Network.ip} <br> Número de redes a generar:  ${Network.requested} </p>
    <h4 class="display-6">Paso 1</h3>
    <p class="lead">Identificar la clase y la máscara de red por defecto: <br> Clase: ${Network.clase} <br> Máscara por defecto: ${Network.mask}</p>
    <h4 class="display-6">Paso 2</h3>
    <p class="lead">Convertir la máscara a binario e identificar la porción de red y porción de host</p>
    <p class=lead>Porción de red: ${Network.porcionRed}</p>
    <p class=lead>Porción de Host: ${Network.porcionHost}</p>
    <h4 class="display-6">Paso 3</h3>
    <p class=lead>Identificar la cantidad de redes a generar</p>
    <p class=lead>Se desea crear ${Network.requested} redes con la dirección ${Network.ip}, entonces:</p>
    <p class=lead>2 <sup>n</sup> = # Redes <br> 2<sup>n</sup> &#8805 ${Network.requested} <br> 2
    <sup>${Network.bitsRobados}</sup> = ${2 ** Network.bitsRobados} , lo que indica que "se perderán ${(2 ** Network.bitsRobados) - Network.requested} redes y que robaremos ${Network.bitsRobados} bits (n)"</p>
    <p class="lead">Nueva Máscara de Red: ${Network.newMask} / ${Network.format}</p>
    <h4 class="display-6">Paso 4</h3>
    <p class="lead">Definir el rango de cada subred a crear</p>
    <p class="lead">Rango: 256 - Valor modificado de la máscara = ${Network.rango}</p>
    <h4 class="display-6">Paso 5</h3>
    <p class="lead">Determinar la dirección de red y la dirección de broadcast, así como el rango de IPs utilizables para cada subred</p>
    <div class="text-center table-responsive" id="tableResult">
    </div>
 `;
    var finalResults = document.getElementById("tableResult");
    for (let i = 1; i < Network.requested; i++) {
        finalResults.innerHTML = finalResults.innerHTML + `
            <div class="container table-responsive mt-4" style="max-width:70%;border-radius: 10px;padding: 30px;background-color: rgba(255,255,255,0.1);">
            <h5>Red número ${i}</h5>
            <p class="lead">Dirección de Red: ${showigIp(Network.ip, i, Network.clase, Network.rango)}</p>
            <p class="lead">1° Dirección Disponible: ${showingFirstIp(Network.ip, i, Network.clase, Network.rango)}</p>
            <p class="lead">Últ Dirección Disponible: ${showingLastIp(Network.ip, i, Network.clase, Network.rango)}</p>
            <p class="lead">Dirección de Broadcast: ${showingBroadcast(Network.ip, i, Network.clase, Network.rango)}</p>
            </div>
        `;
    }
    resultsContainer.innerHTML = resultsContainer.innerHTML + `
    <h4 class="display-6">Paso 6</h3>
    <p class="lead">Determinar la cantidad de Hosts por subred:</p>
    <p class="text-center lead">Cantidad de hosts por subred: <br> 2<sup>m</sup>-2 # Hosts disponibles por subred <br>m: Cantidad de 0 en la máscara de red <br> 2 <sup>${Network.porcionHost - Network.bitsRobados}</sup> - 2 = ${hosts} hosts disponibles por subred</p>
   `;

}

//Devuelve la ip de la red
function showigIp(ip, n, clase, range) {
    var vec = ip.split(".");
    if (clase == 'A') {
        vec[1] = ((n * range) == 256) ? 255 : (n * range);
        vec[2] = 0;
        vec[3] = 0;
    } else if (clase == 'B') {
        vec[2] = ((n * range) == 256) ? 255 : (n * range);
        vec[3] = 0;
    } else {
        vec[3] = ((n * range) == 256) ? 255 : (n * range);
    }
    return "" + vec[0] + "." + vec[1] + "." + vec[2] + "." + vec[3];
}

//Retorna la primera ip disponible de la red
function showingFirstIp(ip, n, clase, range) {
    var vec = ip.split(".");
    if (clase == 'A') {
        vec[1] = (n * range);
        vec[3] = 1;
    } else if (clase == 'B') {
        vec[2] = (n * range);
        vec[3] = 1;
    } else {
        vec[3] = (n * range) + 1;
    }

    return "" + vec[0] + "." + vec[1] + "." + vec[2] + "." + vec[3];
}

//devuelve la ultima ip disponible de la red
function showingLastIp(ip, n, clase, range) {
    var vec = ip.split(".");
    if (clase == 'A') {
        vec[1] = ((n + 1) * range) == 256 ? 255 - 1 : ((n + 1) * range) - 1;
        vec[2] = 255;
        vec[3] = 254;
    } else if (clase == 'B') {
        vec[2] = ((n + 1) * range) == 256 ? 255 - 1 : ((n + 1) * range) - 1;
        vec[3] = 254;
    } else {
        vec[3] = ((n + 1) * range) == 256 ? 255 - 1 : ((n + 1) * range) - 2;
    }

    return "" + vec[0] + "." + vec[1] + "." + vec[2] + "." + vec[3];
}

//Devuelve la dirección de broadcast de la red  
function showingBroadcast(ip, n, clase, range) {
    var vec = ip.split(".");
    if (clase == 'A') {
        vec[1] = ((n + 1) * range) == 256 ? 255 - 1 : ((n + 1) * range) - 1;
        vec[2] = 255;
        vec[3] = 255;
    } else if (clase == 'B') {
        vec[2] = ((n + 1) * range) == 256 ? 255 - 1 : ((n + 1) * range) - 1;
        vec[3] = 255;
    } else {
        vec[3] = ((n + 1) * range) == 256 ? 255 : ((n + 1) * range) - 1;
    }
    return "" + vec[0] + "." + vec[1] + "." + vec[2] + "." + vec[3];
}
