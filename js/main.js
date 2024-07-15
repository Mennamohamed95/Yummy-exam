let mainSec =document.querySelector('#main-sec');
let searchBtn = document.querySelector('#search');
let categoriesBtn = document.querySelector('#categories');
let AreaBtn = document.querySelector('#Area');
let IngredientsBtn = document.querySelector('#Ingredients');
let ContactusBtn = document.querySelector('#ContactUs');
let searchName =document.querySelector('#searchName');
let searchFLeter =document.querySelector('#searchFLeter');
let searchContanier =document.querySelector('#searchContanier');
let contactUsContanier =document.querySelector('#contactUsContanier');




$(function () {
    $('.loading').fadeOut(1000 , function(){
         $('body').css({overflowY: 'auto'})
         getSearchNameApi('')
    })
   

})

$(document).ready(function() {
    function openSideNav() {
        $(".side-nav-menu").animate({
            left: 0
        }, 500);

        $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x");

        $(".links li").each(function(i) {
            $(this).animate({
                top: 0
            }, (i + 5) * 100);
        });
    }

    function closeSideNav() {
        let boxWidth = $(".side-nav-menu .nav-tab").outerWidth();
        $(".side-nav-menu").animate({
            left: -boxWidth
        }, 500);

        $(".open-close-icon").addClass("fa-align-justify").removeClass("fa-x");

        $(".links li").animate({
            top: 300
        }, 500);
    }

    closeSideNav();

    $(".side-nav-menu i.open-close-icon").on("click", function() {
        if ($(".side-nav-menu").css("left") == "0px") {
            closeSideNav();
        } else {
            openSideNav();
        }
    });
    $(".side-nav-menu .links li").on("click", function() {
        closeSideNav();
    });

});



async function getApi(){
    try{
        let res = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    let finallRes = await res.json()
    let data = finallRes.meals
    displayApi(data)
    }
    catch(err){

        console.log('error')
    }
    
    
}


 function displayApi(data){
    let box = ``
    for(let i =0 ; i < data.length ; i++){
        box +=`
      <div class="mealPage col-md-3">
                    <div data-id="${data[i].idMeal}"class="layer position-relative rounded-2 pointer overflow-hidden" >
                        <img src="${data[i].strMealThumb}" alt="" class="w-100">
                        <div class="card-layer position-absolute d-flex align-items-center text-black p-2">
                            <h3>${data[i].strMeal.split(" ").slice(0,4).join(" ")}</h3>
                        </div>
                    </div>
                </div>
        
        `
            mainSec.innerHTML = box
            document.querySelectorAll('.layer').forEach(card =>{
                card.addEventListener('click', function(){
                    mealId = card.dataset.id
                    gatMealIdApi(mealId)
                    
                })
            })
    }
  
}



async function categApi(){
    let categRes = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let finallRes = await categRes.json()
    let categories = finallRes.categories
    console.log(categories)
    displayCateg(categories)
}

function displayCateg(categories){
    mainSec.innerHTML =""
    let box = ``
    for(let i =0; i<=categories.length ;i++){
        box +=`
        
         <div class="col-md-3 ">
                    <div data-id="${categories[i].strCategory}" class="layer rounded-3 position-relative p-0 overflow-hidden pointer">
                    <img class="w-100" src="${categories[i].strCategoryThumb}" alt="">
                    <div class="card-layer position-absolute text-center p-2  ">
                        <h3>${categories[i].strCategory}</h3>
                        <p>${categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                    </div>

                  </div>
      
        
        `
       
        mainSec.innerHTML = box
        document.querySelectorAll('.layer').forEach(card =>{
            card.addEventListener('click', function(){
                mealCterg = card.dataset.id
                displayMealByCateg(mealCterg)
            })
        })
    }
    

}
async function displayMealByCateg(mealCterg){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCterg}`)
    let finallRes = await res.json()
    data = finallRes.meals.slice(0,20)

    displayApi(data)
    
    console.log(data)

}



async function areaApi(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    let areaFinall = await res.json()
    let area = areaFinall.meals
    displayArea(area)
}



function displayArea(area){
    mainSec.innerHTML = ' '
    let box =``
    for(let i =0 ;i<= area.length ; i++){
        box +=`
        <div class="col-md-3 text-center text-white pointer ">
                    <div data-id="${area[i].strArea}" class="areas p-2">
                        <i class="fa-solid fa-house-laptop fa-4x" ></i>
                    <h3>${area[i].strArea}</h3>
                    </div>
                    
                 </div>

                 
        `
        mainSec.innerHTML = box
        document.querySelectorAll('.areas').forEach(card =>{
            card.addEventListener('click', function(){
                mealArea = card.dataset.id
                displayMealByArea(mealArea)
                console.log(mealArea)
            })
        })

      
    }
}


async function IngredientsApi(){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let finallRes = await res.json()
    let Ingredients = finallRes.meals.slice(0, 20) 
    console.log(Ingredients)
    displayIngredients(Ingredients)

}
async function displayMealByArea(mealArea){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`)
    let finallRes = await res.json()
    let data = finallRes.meals.slice(0,20)

    displayApi(data)
    
}



function displayIngredients(Ingredients){
    mainSec.innerHTML = " "
    let box = ``
    for(let i= 0 ; i <= Ingredients.length ; i++){
        box += `
         <div data-id="${Ingredients[i].strIngredient}" class="ingrediants col-md-3 text-center text-white text-center text-white pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${Ingredients[i].strIngredient}</h3>
                    <p>${Ingredients[i].strDescription.split(" ").slice(0,20).join(" ")}</p>


                  </div>
        
        `
        mainSec.innerHTML = box
        document.querySelectorAll('.ingrediants').forEach(card =>{
            card.addEventListener('click', function(){
             let mealIngrediants = card.dataset.id
                displayMealByingrat( mealIngrediants)
                console.log(mealIngrediants)
            })
        })


    }
}

async function displayMealByingrat(mealIngrediants){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIngrediants}`)
    let finallRes = await res.json()
    let data = finallRes.meals.slice(0,20)
    displayApi(data)

}


async function gatMealIdApi(mealId){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    let finallres = await res.json()
    let mealData = finallres.meals
    console.log(mealData)
    displayMealPage(mealData[0])
}



function displayMealPage(mealData){
    mainSec.innerHTML=' '

    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (mealData[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${mealData[`strMeasure${i}`]} ${mealData[`strIngredient${i}`]}</li>`
        }
    }

    let tags = mealData.strTags?.split(",") || []
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    
    let box = ``
    
        box =`
        <div class="mealPage text-white d-flex">
                   <div class="col-md-4">
                       <div class="rounded-3 overflow-hidden  mb-2"><img class="w-100" src="${mealData.strMealThumb}" alt=""></div>
                       <h3>${mealData.strMeal}</h3>
                   </div>
                   <div class="col-md-8 px-3">
                       <h3>instractions:</h3>
                       <p>${mealData.strInstructions}</p>
                       <h2>area: ${mealData.strArea}</h2>
                       <h2>gategore: ${mealData.strCategory}</h2>
                       <h3>Recipes :</h3>
                       <ul class="list-unstyled receipes d-flex flex-wrap">
    
                       ${ingredients}
                       
                       </ul>
                       
                       <h3>tags:</h3>
                       <ul class="list-unstyled receipes d-flex flex-wrap">
    
                       ${tagsStr}
                          
                           
                           </ul>
    
                       <div>
                           <button class="btn btn-success"><a target="_blank" href="${mealData.strSource}">sourse</a></button>
                           <button class="btn btn-danger"><a target="_blank" href="${mealData.strYoutube}">youtube</a></button>
                       </div>
    
                   </div>
               </div>
       `
       mainSec.innerHTML = box
      

    
}


categoriesBtn.addEventListener('click' , function(){
    searchContanier.classList.replace('d-block' , 'd-none')
    contactUsContanier.classList.replace('d-block' , 'd-none')
   
    categApi()

    displayCateg()

    

})
AreaBtn.addEventListener('click' , function(){
    searchContanier.classList.replace('d-block' , 'd-none')
    contactUsContanier.classList.replace('d-block' , 'd-none')
    mainSec.innerHTML=''
    areaApi()

    displayArea()

    

})
IngredientsBtn.addEventListener('click' , function(){
    searchContanier.classList.replace('d-block' , 'd-none')
    contactUsContanier.classList.replace('d-block' , 'd-none')
    mainSec.innerHTML=''
    IngredientsApi()

    displayIngredients()

    

})

searchName.addEventListener('input' , function(e){
    getSearchNameApi(e.target.value)
})
searchFLeter.addEventListener('input' , function(e){
    getSearchFLetterApi(e.target.value)
})
async function getSearchNameApi(query){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    let finallres = await res.json()
    displayApi(finallres.meals)

    // console.log(finallres)
}
async function getSearchFLetterApi(query){
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`)
    let finallres = await res.json()

    displayApi(finallres.meals)

    console.log(finallres)
}


searchBtn.addEventListener('click',function(){
 searchContanier.classList.replace('d-none' , 'd-block') 
 contactUsContanier.classList.replace('d-block' , 'd-none')
 mainSec.innerHTML =''

})

ContactusBtn.addEventListener('click' , function(){
    mainSec.innerHTML = ''
    searchContanier.classList.replace('d-block' , 'd-none')
    contactUsContanier.classList.replace('d-none' , 'd-block')
})







document.addEventListener("DOMContentLoaded", () => {
    const submitBtn = document.getElementById("submit");

    const inputFields = [
        { id: "nameInput", alertId: "nameAlert", validation: nameValidation, touched: false },
        { id: "emailInput", alertId: "emailAlert", validation: emailValidation, touched: false },
        { id: "phoneInput", alertId: "phoneAlert", validation: phoneValidation, touched: false },
        { id: "ageInput", alertId: "ageAlert", validation: ageValidation, touched: false },
        { id: "passInput", alertId: "passwordAlert", validation: passwordValidation, touched: false },
        { id: "repassInput", alertId: "repasswordAlert", validation: repasswordValidation, touched: false },
    ];

    inputFields.forEach(field => {
        const inputElement = document.getElementById(field.id);
        inputElement.addEventListener("focus", () => {
            field.touched = true;
            inputsValidation();
        });
        inputElement.addEventListener("input", inputsValidation);
    });

    function inputsValidation() {
        let allValid = true;

        inputFields.forEach(field => {
            if (field.touched) {
                const isValid = field.validation();
                document.getElementById(field.alertId).classList.replace(isValid ? "d-block" : "d-none", isValid ? "d-none" : "d-block");
                if (!isValid) {
                    allValid = false;
                }
            } else {
                allValid = false; 
            }
        });

        submitBtn.disabled = !allValid;
    }

    function nameValidation() {
        return /^[a-zA-Z ]+$/.test(document.getElementById("nameInput").value);
    }

    function emailValidation() {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById("emailInput").value);
    }

    function phoneValidation() {
        return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phoneInput").value);
    }

    function ageValidation() {
        return /^(0?[1-9]|[1-9][0-9]|1[0-9][0-9]|200)$/.test(document.getElementById("ageInput").value);
    }

    function passwordValidation() {
        return /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("passInput").value);
    }

    function repasswordValidation() {
        return document.getElementById("repassInput").value === document.getElementById("passInput").value;
    }
});