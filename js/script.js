document.getElementById("idSearchButton").addEventListener("click", async function () {
    song = document.getElementById("idSearchBar").value;
    artist = document.getElementById("artist").value;
    await reset();
    getData(artist, song);
});


//reset results
function reset(){
    document.getElementById("idOriginal").innerHTML = "";
    document.getElementById("idTranslated").innerHTML = "";
}

//error message
function errorMsg(msg){
    alert(msg);
}

//fetch search song
function getData(artist, song) {
    artist = artist.replace(/\s/g, "%2520");
    song = song.replace(/\s/g, "%2520");

    if (artist === "" || song===""){
        errorMsg("please fill in the form");
        return;
    }

    url = `https://api-gateway-becode.herokuapp.com/?goto=http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect%3Fartist%3D${artist}%26song%3D${song}`;

    console.log(url);
    fetch(url, {
        "method": "GET",
    })
        .then(response => {
            console.log(url);
            return response.text();
        })

        .then(async function (data) {
            document.querySelector("input[type='button']").disabled = true;

            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');

            text = xmlDoc.getElementsByTagName('Lyric')[0].innerHTML;

            if (text ==""){
                errorMsg("no data found");
                return;
            }

            console.log(text);
            var textArray = text.split("\n");
            console.log("text fetched",textArray);

            for (let i = 0; i < textArray.length; i++) {
                if (textArray[i] === "") {
                    document.getElementById("idOriginal").appendChild(document.createElement("br"));
                } else {
                    var paragraph = document.createElement("p");
                    paragraph.innerHTML = textArray[i];
                    document.getElementById("idOriginal").appendChild(paragraph);
                }
            }


            for (let i = 0; i < textArray.length; i++) {
                if (textArray[i] === "") {
                    textArray[i] = "|"
                }
                await fetchTranslateText(textArray[i], "en", "nl")
                    .then(function (data) {
                        returnText(data);
                        if (i === textArray.length-1){
                            document.querySelector("input[type='button']").disabled = false;
                        }
                    })
            }


        })

        .catch(err => {
            errorMsg("no data found");
        });
}

//async functie to pick up json data
async function fetchTranslateText(text, originalLanguageCode, translatedLanguageCode) {
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190917T143143Z.c1229abdc907b884.5520b5430c18e7eb1926dd0166c1bd73473c23f0&text=${text}&lang=${originalLanguageCode}-${translatedLanguageCode}`);
    return response.json();
}

//process text and return translated text
function returnText(data) {
    var text = data.text[0];
    if (text === "|") {
        document.getElementById("idTranslated").appendChild(document.createElement("br"));
    } else {
        var paragraph = document.createElement("p");
        paragraph.innerHTML = text;
        document.getElementById("idTranslated").appendChild(paragraph);
    }
}