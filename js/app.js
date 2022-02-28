/*======
all element selecting 
====================================*/
const search_section = document.querySelector('.search_section')
const input = document.querySelector('.search_section input')




/*=========
all EventListener
=============================*/
input.addEventListener('focus', inputFoucsFunc)
input.addEventListener('blur', inputUnFoucsFunc)



/*=========
all function
=============================*/

function inputFoucsFunc(){
    search_section.classList.add('active_border')
}
function inputUnFoucsFunc(){
    search_section.classList.remove('active_border')
}




fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
.then(res => res.json())
.then(data => console.log(data))