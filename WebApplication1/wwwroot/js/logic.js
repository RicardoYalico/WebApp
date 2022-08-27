// Funcion que que recibe la entrada de texto (input) y el array de datos 
function autocomplete(inp, arr) {
    var currentFocus;

    //Evento de sugerencias
    inp.addEventListener("input", function (e) {
        var a, b, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        a.setAttribute("style", "position:absolute; z-index:3; background-color: white")
        this.parentNode.appendChild(a);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].place.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].place.substr(0, val.length) + "</strong>";
                b.innerHTML += b.id = arr[i].place.substr(val.length);

                b.innerHTML += "<input type='hidden' value='" + arr[i].place + "'>";

                b.addEventListener("click", function (e) {
                    document.getElementById('lat').value = arr[i].lat 
                    document.getElementById('lon').value = arr[i].lon
                    inp.value = this.getElementsByTagName("input")[0].value;

                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    //Cerrar las sugerencias
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    //Evento de respuesta ante una selección de sugerencia
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var myInput = document.getElementById("Direccion")
var locations = [];

// API que nos proporciona un json de locacalización
myInput.addEventListener('keydown', async function () {

    await axios.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${myInput.value}&apiKey=72a723001681496c8d25dcf9ac5dddd5`,
        { responseType: 'json' })
        .then(async function (res) {
            if (await res.status == 200) {
                locations = await res.data.features.map(function (obj) {
                    return {
                        place: `${obj.properties.address_line1} ${obj.properties.address_line2}`,
                        lon: `${obj.properties.lon}`,
                        lat: `${obj.properties.lat}`
                    }
                })
                autocomplete(document.getElementById("Direccion"), locations)
            }
        })
}
);

var searchLocation = document.getElementById("searchLocation")

//Evento del envio de una sugerencia, se dibuja en el html
searchLocation.addEventListener('click', function (e) {
    marker.setLatLng([document.getElementById('lat').value, document.getElementById('lon').value])
    popup
        .setLatLng([document.getElementById('lat').value, document.getElementById('lon').value])
        .setContent(document.getElementById('Direccion').value)
        .openOn(map);
})


