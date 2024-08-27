const recipes = [
    { name: 'Jollof Rice', image: 'images/jollof_rice.jpg', description: 'A popular West African dish made with rice, tomatoes, and spices.' },
    { name: 'Egusi Soup', image: 'images/egusi_soup.jpg', description: 'A hearty soup made with melon seeds, leafy vegetables, and assorted meats.' },
    { name: 'Pounded Yam and Egusi', image: 'images/pounded_yam_egusi.jpg', description: 'Pounded yam served with egusi soup.' },
    // Add more recipes here
];

document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        
        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image;
        recipeImage.alt = recipe.name;
        
        const recipeName = document.createElement('h2');
        recipeName.textContent = recipe.name;
        
        const recipeDescription = document.createElement('p');
        recipeDescription.textContent = recipe.description;
        
        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(recipeDescription);
        
        recipeList.appendChild(recipeCard);
    });
});


// const recipes = [
//     { name: 'Jollof Rice', image: 'images/jollof_rice.jpg', description: 'A popular West African dish made with rice, tomatoes, and spices.' },
//     { name: 'Egusi Soup', image: 'images/egusi_soup.jpg', description: 'A hearty soup made with melon seeds, leafy vegetables, and assorted meats.' },
//     { name: 'Pounded Yam and Egusi', image: 'images/pounded_yam_egusi.jpg', description: 'Pounded yam served with egusi soup.' },
//     { name: 'Bitterleaf Soup', image: 'images/bitterleaf_soup.jpg', description: 'A traditional soup made with bitterleaf and various meats.' },
//     { name: 'Suya', image: 'images/suya.jpg', description: 'Spicy grilled meat skewers, a popular Nigerian street food.' },
//     { name: 'Akara', image: 'images/akara.jpg', description: 'Fried bean cakes made from black-eyed peas paste.' },
//     { name: 'Moi Moi', image: 'images/moi_moi.jpg', description: 'Steamed bean pudding made from ground peeled beans, onions, and spices.' },
//     { name: 'Fried Rice', image: 'images/fried_rice.jpg', description: 'Rice stir-fried with vegetables and sometimes mixed with meat or shrimp.' },
//     { name: 'Pepper Soup', image: 'images/pepper_soup.jpg', description: 'A spicy soup typically made with fish, meat, or chicken.' },
//     { name: 'Efo Riro', image: 'images/efo_riro.jpg', description: 'A rich and savory spinach stew.' },
//     // Add more recipes here up to 50
// ];