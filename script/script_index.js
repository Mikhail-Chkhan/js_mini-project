let baseUrl = 'https://jsonplaceholder.typicode.com'
let getUsers = baseUrl + '/users'

fetch(getUsers)
    .then(response => response.json())
    .then(response => {
        let users = response
        console.log(users)

        let main = document.createElement('main')

        users.forEach((user) => {
            let div = document.createElement('div')
            let p = document.createElement('p')
            let button = document.createElement('button')

            div.classList.add('user_box')
            button.classList.add('button_user')
            button.id = user.id
            p.innerText = `${user.name} (id: ${user.id})`
            button.innerText = 'view user details'

            div.append(p,button)
            main.append(div)

            button.onclick = function (ev) {
                ev.preventDefault()
                window.location.href = `user-details.html?id=${user.id}`
            }
        })
        document.body.appendChild(main)


    })