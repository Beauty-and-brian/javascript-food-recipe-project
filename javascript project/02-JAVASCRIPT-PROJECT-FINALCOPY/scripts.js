document.addEventListener("DOMContentLoaded", function() {
    loadRecipes();
});

let recipes = [];
for (let i = 1; i <= 30; i++) {
    recipes.push({ 
        title: `Recipe ${i}`, 
        url: `http://example.com/recipe${i}`, 
        image: `image${i}.jpg`, 
        publisher: `Publisher ${i}`, 
        prepTime: 45, 
        servings: 4, 
        ingredients: [`Ingredient ${i}a`, `Ingredient ${i}b`], 
        bookmarked: false 
    });
}

let bookmarks = [];
const itemsPerPage = 10;
let currentPage = 1;
let filteredRecipes = recipes;

function loadRecipes() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentRecipes = filteredRecipes.slice(start, end);
    currentRecipes.forEach((recipe, index) => {
        let li = document.createElement('li');
        li.textContent = recipe.title;
        li.setAttribute('onclick', `showRecipe(${start + index})`);
        recipeList.appendChild(li);
    });

    document.getElementById('prev-button').disabled = currentPage === 1;
    document.getElementById('next-button').disabled = end >= filteredRecipes.length;
}

function showRecipe(index) {
    const recipeDetail = document.getElementById('recipe-detail');
    const recipe = filteredRecipes[index];
    recipeDetail.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}">
        <p>URL: <a href="${recipe.url}" target="_blank">${recipe.url}</a></p>
        <p>Publisher: ${recipe.publisher}</p>
        <p>Servings: ${recipe.servings}</p>
        <p>Prep Time: ${recipe.prepTime} minutes</p>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        <button onclick="removeRecipe(${index})">Remove Recipe</button>
        <button onclick="toggleBookmark(${index})">${recipe.bookmarked ? 'Remove from Bookmarks' : 'Add to Bookmarks'}</button>
    `;
}

function openAddRecipeForm() {
    document.getElementById('add-recipe-form').style.display = 'block';
}

function closeAddRecipeForm() {
    document.getElementById('add-recipe-form').style.display = 'none';
}

document.getElementById('recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const url = document.getElementById('url').value;
    const image = document.getElementById('image-url').value;
    const publisher = document.getElementById('publisher').value;
    const servings = document.getElementById('servings').value;
    const prepTime = document.getElementById('prep-time').value;
    const ingredients = [
        document.getElementById('ingredient1').value,
        document.getElementById('ingredient2').value,
        document.getElementById('ingredient3').value,
        document.getElementById('ingredient4').value,
        document.getElementById('ingredient5').value,
        document.getElementById('ingredient6').value
    ].filter(ingredient => ingredient);

    recipes.push({ title, url, image, publisher, servings, prepTime, ingredients, bookmarked: false });
    filteredRecipes = recipes;
    loadRecipes();
    closeAddRecipeForm();
});

function removeRecipe(index) {
    recipes.splice(index, 1);
    filteredRecipes = recipes;
    loadRecipes();
    document.getElementById('recipe-detail').innerHTML = '';
}

function toggleBookmark(index) {
    const recipe = filteredRecipes[index];
    recipe.bookmarked = !recipe.bookmarked;
    if (recipe.bookmarked) {
        bookmarks.push(recipe);
    } else {
        bookmarks = bookmarks.filter(bookmark => bookmark.title !== recipe.title);
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Hide the recipe details and reset the view
    document.getElementById('recipe-detail').innerHTML = '';
    filteredRecipes = recipes;
    loadRecipes();
}

function showBookmarks() {
    filteredRecipes = bookmarks;
    currentPage = 1;
    loadRecipes();
}

function closeBookmarkView() {
    // Reset to home view when bookmarks are closed
    filteredRecipes = recipes;
    currentPage = 1;
    loadRecipes();
    document.getElementById('recipe-detail').innerHTML = '';
    document.getElementById('bookmark-dropdown').classList.add('hidden');
}
document.getElementById('bookmarks-button').addEventListener('click', function() {
    const bookmarkDropdown = document.getElementById('bookmark-dropdown');
    if (bookmarkDropdown.classList.contains('hidden')) {
        showBookmarks();
    } else {
        closeBookmarkView();
    }
});

function showBookmarkRecipe(index) {
    const recipe = bookmarks[index];
    const recipeDetail = document.getElementById('recipe-detail');
    recipeDetail.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-large-image">
        <p>URL: <a href="${recipe.url}" target="_blank">${recipe.url}</a></p>
        <p>Publisher: ${recipe.publisher}</p>
        <p>Servings: ${recipe.servings}</p>
        <p>Prep Time: ${recipe.prepTime} minutes</p>
        <h3>Ingredients:</h3>
        <ul>${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
        <button onclick="removeBookmarkAndShowImages(${index})">Remove from Bookmark</button>
    `;
}

function removeBookmarkAndShowImages(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    loadBookmarks();
    updateBookmarkCount();
    document.getElementById('recipe-detail').innerHTML = '<p>Bookmark removed. Please select another recipe.</p>';

    // Return to the image slideshow after displaying the message
    setTimeout(() => {
        showImageSlideshow();  // Function that displays the image slideshow
    }, 2000); // 2 seconds delay before returning to the slideshow
}
function showImageSlideshow() {
    const recipeDetail = document.getElementById('recipe-detail');
    recipeDetail.innerHTML = `
        <div class="image-slideshow">
            <!-- Image slideshow content goes here -->
            <img id="slideshow-image" src="your-initial-image-path.jpg" alt="Slideshow Image">
        </div>
    `;
    startSlideshow();
}

function startSlideshow() {
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg',
        'image5.jpg'
    ];
    let index = 0;
    const slideshowImage = document.getElementById('slideshow-image');

    setInterval(() => {
        index = (index + 1) % images.length;
        slideshowImage.src = images[index];
        slideshowImage.classList.add('fade-in');
        setTimeout(() => {
            slideshowImage.classList.remove('fade-in');
        }, 1000); // Remove the fade-in class after the transition
    }, 5000); // Change image every 5 seconds
}



function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadRecipes();
    }
}

function nextPage() {
    if ((currentPage * itemsPerPage) < filteredRecipes.length) {
        currentPage++;
        loadRecipes();
    }
}

// document.getElementById('search').addEventListener('input', function(event) {
//     const query = event.target.value.toLowerCase();
//     filteredRecipes = recipes.filter(recipe => recipe.title.toLowerCase().includes(query));
//     currentPage = 1;
//     loadRecipes();
// });

// document.addEventListener("DOMContentLoaded", function() {
//     loadRecipes();
//     startCarousel();
// });
// function startCarousel() {
//     const carouselSlide = document.querySelector('.carousel-slide');
//     const images = carouselSlide.querySelectorAll('.carousel-image');

//     let counter = 0;
//     const size = images[0].clientWidth;

//     setInterval(() => {
//         counter++;
//         if (counter >= images.length) counter = 0;
//         carouselSlide.style.transition = "transform 1s ease-in-out";
//         carouselSlide.style.transform = `translateX(${-size * counter}px)`;
//     }, 1000); // Change slide every 6 seconds (adjust as needed)
// }
// Other existing functions...
