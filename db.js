const baseURL = "https://rogue-marked-gondola.glitch.me/movies"


const modal = {
    all: document.querySelector("#modal"),
    main: document.querySelector("#modal > main"),
    head: document.querySelector("#modal > header"),
    foot: document.querySelector("#modal > footer"),
    container: document.querySelector("#modal-container") // represents the background
}

const createForm = (name, data) => {
    if(!data) {
        data = {
            id: 0,
            title: "",
            director: "",
            rating: "",
            genre: "",
        }
    }

    let {id, title, director, rating, genre} = data;

    // handle Z in data for timezone, might need to add back for update
    // if(data) dateOfBirth = dateOfBirth.slice(0, dateOfBirth.length-1);

    return `
        <form name="${name}">
        <input type="hidden" name="id" value="${id}">
        <label for="field1">Title</label><input type="text" name="title" value="${title.toUpperCase()}" id="field1">
        <label for="field2">First Name</label><input type="text" name="director" value="${director}" id="field2">
        <label for="field3">Last Name</label><input type="text" name="rating" value="${rating}" id="field3">
        <label for="field4">Gender</label><input type="text" name="genre" value="${genre}" id="field4">
    </form>
    `
}


// Headers this application uses across the board.
const customHeaders = new Headers({
    'Content-Type': 'application/json'
}) // required by the api to access its value!

// Defaults for fetch request
const fetchSettings = {
    method: "GET", // or gets
    headers: customHeaders,
}


fetch(baseURL + "?_start=14&_limit=15", fetchSettings)
    .then(res => res.json())
    .then(res => {
        console.log("res:", res)


        document.getElementById("movies").innerHTML +=
            res.map((item) => item.title).join("<br>");

    })
const handleCreateUserView = (event) => {
    // TODO: Create form for users to fill out
    // Inputs!

    enableModal();
    console.log("test:",modal.main)
    modal.main.innerHTML = mapUserCreateForm();
    modal.foot.innerHTML = mapButtonsForUpdate(0,"create")

    $("button.confirm.create").click(handleDoCreateUser);
}
$("#create").click(handleCreateUserView);

const handleDoCreateUser = (event) => {
    // TODO: Create a new User!
    event.preventDefault();

    const form = document.forms.create;

    let data = {
        id: form.id.value,
        title: form.title.value,
        director: form.director.value,
        genre: form.genre.value,
        rating: form.rating.value,

    }

    // Data request to create a new one
    let settings = {
        ...fetchSettings,
        method: "POST",
        body: JSON.stringify(data)
    }


    fetch(baseURL + "/create", settings)
        .then(res => res.json())
        .then(res => {
            console.log("res:", res)
        })
    document.getElementById("userTable").innerHTML +=
        res.map((item) => item.title).join("<br>");
}
const mapUserCreateForm = () => {
    return createForm("create")
}
const mapButtonsForUpdate = (id,  type='update') => {
    return ` <form>
          <button class="confirm ${type}" value="${id}">Confirm</button>
          <button class="cancel">Cancel</button>
            </form>`
}

const toggleModal = () => {
    // show hide modal logic
    modal.container.classList.toggle("hide")
    modal.all.classList.toggle("hide");
}

const enableModal = () => {
    modal.container.classList.remove("hide")
    modal.all.classList.remove("hide");
}

const disableModal = () => {
    modal.container.classList.add("hide")
    modal.all.classList.add("hide");
}


