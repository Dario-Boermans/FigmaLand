const Burger=document.querySelector(".burger"),navMenu=document.querySelector(".nav-menu");Burger.addEventListener("click",()=>{Burger.classList.toggle("active"),navMenu.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>e.addEventListener("click",()=>{Burger.classList.remove("active"),navMenu.classList.remove("active")}));