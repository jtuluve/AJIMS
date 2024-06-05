//unused code, css has been used instead
let links = document.querySelectorAll('.menuOptions a')
links.forEach((e)=>{
    e.addEventListener('click',(event)=>{
        links.forEach(e=>{
            e.classList?.remove('active')
        })
        e.classList?.add('active')
    })
})