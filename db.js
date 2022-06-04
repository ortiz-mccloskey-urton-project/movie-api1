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
        <label for="field1">Title</label><input type="text" name="title" value="${title}" id="field1">
        <label for="field2">director</label><input type="text" name="director" value="${director}" id="field2">
        <label for="field3">Rating</label><input type="text" name="rating" value="${rating}" id="field3">
        <label for="field4">Genre</label><input type="text" name="genre" value="${genre}" id="field4">
        <input type="hidden" name="id" value="${id}" >
            
  
    </form>
    `
}


// document.getElementById('cancel')
// Headers this application uses across the board.
const customHeaders = new Headers({
    'Content-Type': 'application/json'
}) // required by the api to access its value!

// Defaults for fetch request
const fetchSettings = {
    method: "GET", // or gets
    headers: customHeaders,
}


fetch(baseURL + "?_start=14&_limit=25", fetchSettings)
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
    modal.foot.innerHTML = /*mapButtonsForUpdate(0,"create")*/ "<button class='confirm create'>Confirm</button><button class='cancel'>Cancel</button>"

    $('button.cancel').click( function (e) {
        console.log("test:")
        e.preventDefault();
        toggleModal();
    })
    $("button.confirm.create").click(handleDoCreateMovie);
    enableModal();
}



$("#create").click(handleCreateUserView);



// document.getElementById('modal-container').classList.remove('hide')
const handleDoCreateMovie = (event) => {

    // TODO: Create a new User!

    event.preventDefault();

    const form = document.forms.create;

    let data = {

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


    fetch(baseURL , settings)
        .then(data => data.json())
        .then(data => {
            console.log("res:", data)
        })
    // document.getElementById("userTable").innerHTML +=
    //     data.map((item) => item.title).join("");

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

// document.getElementById('.confirm').addEventListener('click', () => {
//     console.log("test")
// })


const handleDeleteView = (event) => {
    // console.log("handle Delete")


    modal.head.innerHTML = `<h3>Do you wish to delete this User?</h3>`
    modal.main.innerHTML = "<p>If you delete this User its gone forever.</p>"
     modal.foot.innerHTML = mapUserToDelete(event.target.value);

    $("button.confirm.delete").click(handleDoDelete);
    toggleModal();
};
$(".delete").click(handleDeleteView);


//  delete fetch request
const handleDoDelete = (event) => {
    event.preventDefault();

    // TODO: Delete User by ID
    // TODO: Hide Modal
    // TODO: Reload form

    let settings = fetchSettings;
    settings.method = "DELETE";

    fetch(baseURL + "/" + event.target.value, settings)
        .then(res => res.json())
        .then(res => {
            tableFetch().then(() => disableModal());

        })

}

const mapUserToDelete = (id) => {
    return `<form>
          <button class="confirm delete" value="${id}">Confirm</button>
          <button class="cancel">Cancel</button>
    </form>
    `

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


const handleDisplayProfile = (event) => {
    toggleModal();
    // TODO: Create fetch to get the profile information
    // TODO: Map info to modal in view.

    console.log("event.target.dataset.id", event.target.dataset.id);

    fetch(baseURL + event.target.dataset.id, fetchSettings)
        .then(res => res.json())
        .then(res => {
            // console.log("res user:", res)
            modal.foot.innerHTML = `<button class="close-modal">Close</button>`

            $(".close-modal").click(() => disableModal());


        })
}
$(".user-record").click(handleDisplayProfile);



const mapUserToRecord = ({id, director, rating, picture, title}) => {
    return `<tr data-id="${id}" >
                       <td>
<!--                            <img src="${picture}">-->
                       </td>
                       <td data-id="${id}" class="user-record">Title: <em>${title}</em> - Directed by: <em>${director} </em> Rated: ${rating}/5</td>
              
                       <td>
                            <button class="delete" value="${id}">X</button>
                            <button class="edit" value="${id}">Edit</button>
                       </td>
                   </tr>`

};
// $('button.cancel').click( function (e) {
//     console.log("test:")
//     e.preventDefault();
//     toggleModal();
// })

function tableFetch () {
    return fetch(baseURL + "?_start=14&_limit=25" + fetchSettings)
        .then(res => res.json())
        .then(res => {
            // want to map the users to the page
            // console.log("res:", res)
            // mapUserToRecord()

            console.log("res:", res)

            document.getElementById("movie").innerHTML =
                res.map(mapUserToRecord).join("");

            //event handlers!
            $(".delete").click(handleDeleteView);
            // $(".edit").click(handleDisplayUpdate);
            // $(".user-record").click(handleDisplayProfile);
            // $("#create").click(handleCreateUserView);
        });
}
tableFetch()