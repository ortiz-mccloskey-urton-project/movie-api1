const baseURL = "https://rogue-marked-gondola.glitch.me/movies"



// Headers this application uses across the board.
const customHeaders = new Headers({
    'Content-Type': 'application/json'
}) // required by the api to access its value!

// Defaults for fetch request
const fetchSettings = {
    method: "GET", // or gets
    headers: customHeaders,
}






    fetch(baseURL + "?_start=14&_limit=15", fetchSettings )
        .then(res => res.json())
        .then(res => {
            console.log("res:", res)


            document.getElementById("movies").innerHTML +=
                res.map((item) => item.title).join("<br>");

        })










// const modal = {