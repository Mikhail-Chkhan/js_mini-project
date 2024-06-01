let params = new URLSearchParams(window.location.search)
let id = params.get('id')
let baseUrl = 'https://jsonplaceholder.typicode.com/'

fetch(baseUrl + 'posts/'+id)
    .then(response => response.json())
    .then(response => {
        let post = response

        let main = document.createElement('main')
        let div_title = document.createElement('div')
        let div_text = document.createElement('div')
        let div_comments = document.createElement('div')

        main.classList.add('main_post')
        div_title.id = 'title_post'
        div_text.classList.add('text_post')
        div_comments.id = 'comments_post'

        add_tag(post.title, div_title, 'h2')
        add_tag(post.body, div_text, 'p')
        // add_tag('Comment:', div_comments, 'h3')


        main.append(div_title, div_text, div_comments )
        document.body.appendChild(main)

        user_name(post.userId)
        get_comments(post.id)


    })

let user_name = (userID) => {
    fetch(baseUrl + 'users/' + userID)
        .then(response => response.json())
        .then(response => {
            let user = response
            let div_title = document.getElementById('title_post')
            add_tag(`Author: ${user.name}`, div_title, 'p')
})}

let get_comments = (postID) => {
    fetch(baseUrl + 'posts/'+id+ '/comments')
        .then(response => response.json())
        .then(response => {
            let comments = response
            console.log(comments)
            let div_com = document.getElementById('comments_post')
            console.log(div_com)
            comments.forEach((comment) => {
                let div = document.createElement('div')
                div.classList.add('comment_box')
                add_tag(comment.name,div,'p')
                add_tag(comment.email,div,'p')
                add_tag(comment.body,div,'p')
                div_com.appendChild(div)
            })



        })}


let add_tag = (value, tag, type_tag) => {
    let p = document.createElement(type_tag)
    p.innerText = value
    tag.appendChild(p)
}