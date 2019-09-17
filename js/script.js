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

    console.log("https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist="+artist+"&song="+song+"");
    fetch("https://sridurgayadav-chart-lyrics-v1.p.rapidapi.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=bad", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "sridurgayadav-chart-lyrics-v1.p.rapidapi.com",
            "x-rapidapi-key": "ee05e32eabmshb0e8bb69aff436ap10a280jsnd9466639d2a3"
        }
    })
        .then(response => {
            return response.text();
        })
        .then(function (data) {
            let parser = new DOMParser(),
                xmlDoc = parser.parseFromString(data, 'text/xml');

            text = xmlDoc.getElementsByTagName('Lyric')[0].innerHTML;

            document.getElementById("results").innerHTML = "<pre>"+text+"</pre>";

        })













        .catch(err => {
            console.log(err);
        });
}
