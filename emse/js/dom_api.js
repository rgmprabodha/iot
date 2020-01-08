// Création d'une requête HTTP
var req = new XMLHttpRequest();
// Requête HTTP GET synchrone vers l'api' publiée
//req.open("GET", "https://faircorp.cleverapps.io/api/rooms");
req.open("GET", "http://thawing-journey-78988.herokuapp.com/api/rooms");

req.addEventListener("load", function () {
    if (req.status >= 200 && req.status < 400) { // Le serveur a réussi à traiter la requête
        var data = req.response;
        afficher(data);
    } else {
// Affichage des informations sur l'échec du traitement de la requête
        console.error(req.status + " " + req.statusText);
    }
});

req.addEventListener("error", function () {
// La requête n'a pas réussi à atteindre le serveur
    console.error("Erreur réseau");
});

req.send(null);
// affiche la reponse en console

function afficher(reponse) {
    var json = JSON.parse(reponse);
    var i = 0;

    json.forEach(function (obj) {
        var rowId = "row-" + i;

        //tr
        var tr = document.createElement("TR");
        tr.setAttribute("id", rowId);
        document.getElementById("myTable").appendChild(tr);

        //td1
        var td1 = document.createElement("TD");
        var id = document.createTextNode(obj.id);
        td1.appendChild(id);
        document.getElementById(rowId).appendChild(td1);

        //td2
        var td2 = document.createElement("TD");
        var light = obj.light;
        var lightStatus = document.createTextNode(light.status);

        var lightImg = document.createElement("IMG");
        if (lightStatus.textContent == "ON") {
            lightImg.setAttribute("src", "images/light-on.png");
        } else {
            lightImg.setAttribute("src", "images/light-off.png");
        }
        lightImg.setAttribute("width", "40");
        lightImg.setAttribute("height", "40");
        lightImg.setAttribute("alt", "light");
        td2.appendChild(lightImg);

        document.getElementById(rowId).appendChild(td2);

        //td3
        var td3 = document.createElement("TD");
        var lightLevel = document.createTextNode(light.level);
        td3.appendChild(lightLevel);
        document.getElementById(rowId).appendChild(td3);

        //td4
        var td4 = document.createElement("TD");
        var noise = obj.noise;
        var noiseStatus = document.createTextNode(noise.status);

        var ringerImg = document.createElement("IMG");
        if (noiseStatus.textContent == "ON") {
            ringerImg.setAttribute("src", "images/ringer-on.png");
        } else {
            ringerImg.setAttribute("src", "images/ringer-off.png");
        }
        ringerImg.setAttribute("width", "40");
        ringerImg.setAttribute("height", "40");
        ringerImg.setAttribute("alt", "noice");
        td4.appendChild(ringerImg);

        document.getElementById(rowId).appendChild(td4);

        //td5
        var td5 = document.createElement("TD");
        var noiseLevel = document.createTextNode(noise.level);
        td5.appendChild(noiseLevel);
        document.getElementById(rowId).appendChild(td5);

        //td6
        var td6 = document.createElement("TD");
        var sl = document.createElement("IMG");
        sl.setAttribute("src", "images/switch.png");
        sl.setAttribute("width", "25");
        sl.setAttribute("height", "25");
        sl.setAttribute("alt", "switch");
        td6.appendChild(sl);
        document.getElementById(rowId).appendChild(td6);

        //td7
        var td7 = document.createElement("TD");
        var sr = document.createElement("IMG");
        sr.setAttribute("src", "images/switch.png");
        sr.setAttribute("width", "25");
        sr.setAttribute("height", "25");
        sr.setAttribute("alt", "switch");
        td7.appendChild(sr);
        document.getElementById(rowId).appendChild(td7);

        i++;
    });
}

// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
// Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}
