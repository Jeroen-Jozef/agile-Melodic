document.getElementById("idForm").addEventListener("submit", function () {
    console.log(document.getElementById("idSearchBar").value);
});


document.getElementById("idForm").addEventListener("submit", function () {
    song = document.getElementById("idSearchBar").value;
    artist = document.getElementById("artist").value;
    getData(artist, song);
});


//fetch search song
function getData(artist, song) {

    artist = artist.replace(/\s/g, "%2520");
    song = song.replace(/\s/g, "%2520");

    //michael%2520jackson
    url = "https://api-gateway-becode.herokuapp.com/?goto=http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect%3Fartist%3D"+artist+"%26song%3D"+song;
    //right one: https://api-gateway-becode.herokuapp.com/?goto=http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect%3Fartist%3Dmichael%2520jackson%26song%3Dthriller
    console.log(url);
    fetch(url, {
        "method": "GET",
    })
        .then(response => {
            console.log(url)
            return response.text();
        })

        .then(function (data) {

            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');

            text = xmlDoc.getElementsByTagName('Lyric')[0].innerHTML;
            //text = xmlDoc.getElementsByTagName('Lyric')[0].childNodes[0];

            document.getElementById("results").innerHTML = "<pre>"+text+"</pre>";


        })

        .catch(err => {
            console.log(err);
        });
}
