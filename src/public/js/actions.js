// Elementos de HTML
var ip1 = document.getElementById("ip1");
var ip2 = document.getElementById("ip2");
var ip3 = document.getElementById("ip3");
var ip4 = document.getElementById("ip4");
var nets = document.getElementById("network").value;
var generateButton = document.getElementById("buttonGenerator");

//Variables de uso
var ip = [ip1.value, ip2.value, ip3.value, ip4.value];

//Acciones de eventos
generateButton.addEventListener('click', () => {
    generateSubnetting(this.ip, this.nets);
});

//Funciones y métodos
function generateSubnetting(ip, nets) {
    alert(nets);
    var sw = verifyValues(ip, nets);
    if (sw === false) {
        alert("Campos vacíos");
    }
};

function verifyValues(ip, n) {
    if (ip[0].length == 0 || ip[1].length == 0 || ip[2].length == 0 || ip[3].length == 0) {
        return false;
    } else {
        return true;
    }
};