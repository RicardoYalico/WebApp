function autocomplete(inp, arr) {
    var currentFocus;

    inp.addEventListener("input", function (e) {
        var a, b, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].place.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].place.substr(0, val.length) + "</strong>";
                b.innerHTML +=
                    b.id = arr[i].place.substr(val.length);

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

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

var myInput = document.getElementById("Direccion")
var locations = [];

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



