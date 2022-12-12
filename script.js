const searchBtn = document.querySelector('.search-btn')
const searchEl = document.querySelector('.meal-search');
const mealListEl = document.getElementById("meal")
const mealDetialsContent = document.querySelector('.meal-details-content')
const closeBtn = document.getElementById('recipe-close-btn');

// Event Listener

searchBtn.addEventListener('click', getMeallist);
mealListEl.addEventListener('click', getMealRecipe);
closeBtn.addEventListener('click', () => {
    mealDetialsContent.parentElement.classList.remove('show-recipe')
})

function getMeallist() {
    let searchInputText = document.getElementById("search-input").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div class="meal-item" data-id="${meal.idMeal}">
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="">

                        </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
                </div>`
                })
            } else {
                html = `Sorry, We didn't find any meal!`
                mealListEl.classList.add('not-found')
            }
            mealListEl.innerHTML = html;
        })
}

function getMealRecipe(e) {
    e.preventDefault()
    if (e.target.classList.contains('recipe-btn')) {
        let mealItem = e.target.parentElement.parentElement
        console.log(mealItem.dataset.id)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(respose => respose.json())
            .then(data => mealRecipeModel(data.meals))
    }
}

function mealRecipeModel(meal) {
    meal = meal[0]
    //console.log(meal)
    let htm = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
                    <p class="recipe-category">${meal.strCategory}</p>
                    <div class="recipe-instruct">
                        <h3>Instruction</h3>
                        <p>${meal.strInstructions}</p>
                        <div class="recipe-meal-image">
                            <img src="${meal.strMealThumb
        }" alt="">
                        </div>
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="_blank">weach video</a>
                        </div>
                    </div>`;
    mealDetialsContent.innerHTML = htm;
    mealDetialsContent.parentElement.classList.add('show-recipe');

}