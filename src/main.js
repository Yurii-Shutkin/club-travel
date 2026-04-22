
fetch('https://club-travel-strapi.onrender.com/api/categories')
    .then(res => res.json())
    .then(data => console.log(data));