document.getElementById("idForm").addEventListener("submit", function () {
    console.log(document.getElementById("idSearchBar").value);
});



fetch("https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20190917T143143Z.c1229abdc907b884.5520b5430c18e7eb1926dd0166c1bd73473c23f0&text=Show syntactic highlighting&lang=nl")
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});