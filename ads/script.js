document.getElementById('showFoodButton').addEventListener('click', function() {
    const foodGallery = document.getElementById('foodGallery');
    foodGallery.innerHTML = ''; // Clear existing content

    const foodImages = [
        'https://images.unsplash.com/photo-1543352632-6a66e16c1b21', // Pizza
        'https://images.unsplash.com/photo-1550547660-d9450f859349', // Burger
        'https://images.unsplash.com/photo-1512058564366-c9eced6dcc59', // Pasta
        'https://images.unsplash.com/photo-1553621042-f6e147245754', // Sushi
        'https://images.unsplash.com/photo-1556804174-2993a0c6cba1'  // Salad
    ];

    foodImages.forEach(imageUrl => {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Food Image';
        foodGallery.appendChild(img);
    });
});
