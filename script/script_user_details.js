let params = new URLSearchParams(window.location.search)
let id = params.get('id')
let baseUrl = 'https://jsonplaceholder.typicode.com/'
fetch(baseUrl + 'users/' + id)
    .then(response => response.json())
    .then(response => {
        let user = response
        console.log(user)

        let div = document.createElement('div')
        let div_name = document.createElement('div')
        let div_contact = document.createElement('div')
        let div_address = document.createElement('div')
        let div_work = document.createElement('div')
        let button = document.createElement('button')

        div.classList.add('user_detail')
        div_name.id = 'id_name'
        div_contact.id = 'id_contact'
        div_address.id = 'id_address'
        div_work.id = 'id_work'
        button.id = 'button_user_posts'
        button.innerText = 'Post of current user'

        add_tag(user.name, div_name, 'h2')
        add_tag(`username: ${user.username}`, div_name, 'p')
        add_tag(`user id: ${user.id}`, div_name, 'p')


        add_tag('Contacts:', div_contact, 'h3')
        add_tag('Works:', div_work, 'h3')
        add_tag('Address:', div_address, 'h3')

        add_tag(`phone:  +${user.phone}`, div_contact, 'p')
        add_tag(`email:  ${user.email}`, div_contact, 'p')
        add_tag(`website: ${user.website}`, div_contact, 'p')

        add_tag(`city: ${user.address.city}`, div_address, 'p')
        add_tag(`street: ${user.address.street}`, div_address, 'p')
        add_tag(`suite: ${user.address.suite}`, div_address, 'p')
        add_tag(`zipcode: ${user.address.zipcode}`, div_address, 'p')
        add_tag(`lat: ${user.address.geo.lat}`, div_address, 'p')
        add_tag(`lng: ${user.address.geo.lng}`, div_address, 'p')

        add_tag(`company name: ${user.company.name}`, div_work, 'p')
        add_tag(`catch Phrase: ${user.company.catchPhrase}`, div_work, 'p')
        add_tag(`position: ${user.company.bs}`, div_work, 'p')

        div.append(div_name, div_contact, div_work, div_address, button)
        document.body.appendChild(div)

        button.onclick = function (ev) {
            ev.preventDefault()
            info_user_posts(user.id, user.name)

        }

    });

let add_tag = (value, tag, type_tag) => {
    let p = document.createElement(type_tag)
    p.innerText = value
    tag.appendChild(p)
}


let info_user_posts = (userId,userName) => {

    fetch(baseUrl + 'users/' + userId + '/posts')
        .then(rez => rez.json())
        .then(rez => {
            let posts = rez
            console.log(posts)

            let div_modal = document.createElement('div')
            let div_title = document.createElement('div')
            let div_content = document.createElement('div')
            let div_close = document.createElement('div')

            div_modal.classList.add('modal_window')
            div_content.classList.add('modal_content')
            div_close.id = 'close_modal'
            div_title.id = 'modal_title'
            div_title.id = 'modal_title'
            div_close.innerText = 'X'
            add_tag(`All posts ${userName}`, div_title, 'h3')
            div_title.appendChild(div_close)

            posts.forEach((post) => {
                let div_post = document.createElement('div')
                div_post.classList.add('box_title')
                div_post.id = post.id
                add_tag(post.title, div_post, 'p')
                // div_post.innerText = post.title
                div_content.appendChild(div_post)

                div_post.onclick = function (ev){
                    ev.preventDefault()
                    window.location.href = `post-details.html?id=${post.id}`
                }

            })

            div_modal.append(div_title, div_content)
            document.body.appendChild(div_modal)

            div_close.onclick = function (ev) {
                ev.preventDefault()
                div_modal.remove()
            }




        })
}