const baseURL = "https://rogue-marked-gondola.glitch.me/movies/"

const modal = {
    all: document.querySelector("#modal"),
    main: document.querySelector("#modal > main"),
    head: document.querySelector("#modal > header"),
    foot: document.querySelector("#modal > footer"),
    container: document.querySelector("#modal-container") // represents the background
}

const fetchSettings = {
    method: "GET"
}


    fetch(baseURL + "?id=260" , fetchSettings )
        .then(res => res.json())
        .then(res => {
            console.log("res:", res)
        })
