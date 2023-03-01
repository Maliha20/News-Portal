const loadNewsCategories = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data =>displayNewsCategory(data.data.news_category))
}

const displayNewsCategory = data =>{
    const categoryContainer = document.getElementById('categories-container');
    data.forEach(singleCategory=>{
        categoryContainer.innerHTML += `<a class="nav-link" href="#" onclick = "fetchCategoryNews('${singleCategory.category_id}' ,'${singleCategory.category_name}')" >${singleCategory.category_name}</a>
        
        `
    })
}

const fetchCategoryNews = (category_id, category_name) =>{
 const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
 fetch(url).then(res => res.json()).then(data => showAllnews(data.data,category_name))
}

const showAllnews = (data, category_name) =>{
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
}