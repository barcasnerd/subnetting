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
    rango: null
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
    console.log(Network);
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
    while ((2 ^ i) < cant) {
        i++;
    }
    Network.requested = cant;
    Network.bitsRobados = (i - 1);
    Network.format = Network.bitsRobados + Network.porcionRed;
    Network.newMask = newMask(Network.format);
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

function identifyRange(clase, mask) {
    if (clase === 'A') {
        return 256 - parseInt(mask.split(".")[1]);
    } else if (clase === 'B') {
        return 256 - parseInt(mask.split(".")[2]);
    } else {
        return 256 - parseInt(mask.split(".")[3]);
    }
}

