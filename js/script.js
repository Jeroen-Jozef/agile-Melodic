document.getElementById("idForm").addEventListener("submit", function () {
    console.log(document.getElementById("idSearchBar").value);
});

//async functie to pick up json data
async function fetchTranslateText(text, originalLanguageCode, translatedLanguageCode) {
    let response = await fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190917T143143Z.c1229abdc907b884.5520b5430c18e7eb1926dd0166c1bd73473c23f0&text=${text}&lang=${originalLanguageCode}-${translatedLanguageCode}`);
    return response.json();
}

//dummy input
var input = "[Verse 1: Pharrell]\n" +
    "Like the legend of the phoenix\n" +
    "All ends with beginnings\n" +
    "What keeps the planet spinning\n" +
    "The force from the beginning";
//put a line of text in array
inputArray = input.split("\n");
console.log(inputArray);
console.log(inputArray.length);

//process text and return translated text
function returnText(data) {
    console.log(data);
    var text = data.text[0];
    document.getElementById("idTranslation").innerText += text;
    document.getElementById("idTranslation").appendChild(document.createElement("br"));
}

for (let i = 0; i < inputArray.length; i++) {
    fetchTranslateText(inputArray[i], "en", "nl")
        .then(function (data) {
            returnText(data);
        });
}
