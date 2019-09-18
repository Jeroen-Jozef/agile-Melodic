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
            console.log(url);
            return response.text();
        })

        .then(function (data) {

            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');

            text = xmlDoc.getElementsByTagName('Lyric')[0].innerHTML;
            //text = xmlDoc.getElementsByTagName('Lyric')[0].childNodes[0];
            var input = text;

            document.getElementById("results").innerHTML = "<pre>"+text+"</pre>";

            var inputArray = input.split("\n");
            console.log(inputArray);
            console.log(inputArray.length);

            for (let i = 0; i < inputArray.length; i++) {
                fetchTranslateText(inputArray[i], "en", "nl")
                    .then(function (data) {
                        returnText(data);
                    });
            }




        })

        .catch(err => {
            console.log(err);
        });
}

//async functie to pick up json data
async function fetchTranslateText(text, originalLanguageCode, translatedLanguageCode) {
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190917T143143Z.c1229abdc907b884.5520b5430c18e7eb1926dd0166c1bd73473c23f0&text=${text}&lang=${originalLanguageCode}-${translatedLanguageCode}`);
    return response.json();
}

//dummy input
/*var input = "[Verse 1: Pharrell]\n" +
    "Like the legend of the phoenix\n" +
    "All ends with beginnings\n" +
    "What keeps the planet spinning\n" +
    "The force from the beginning";*/
//put a line of text in array
/*inputArray = input.split("\n");
console.log(inputArray);
console.log(inputArray.length);*/

//process text and return translated text
function returnText(data) {
    console.log(data);
    var text = data.text[0];
    document.getElementById("idTranslation").innerText += text;
    document.getElementById("idTranslation").appendChild(document.createElement("br"));
}

/*for (let i = 0; i < inputArray.length; i++) {
    fetchTranslateText(inputArray[i], "en", "nl")
        .then(function (data) {
            returnText(data);
        });
}*/
