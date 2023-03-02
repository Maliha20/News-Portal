let fetchData = [];
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
 fetch(url)
 .then(res => res.json())
 .then(data =>{

  fetchData =data.data;
   showAllnews(data.data,category_name)
 }) 
}

const showAllnews = (data, category_name) =>{
    document.getElementById('news-count').innerText = data.length;
    document.getElementById('category-name').innerText = category_name;
  
const newsContainer = document.getElementById('all-news');
 newsContainer.textContent = ''
     
   data.forEach(singleNews =>{
    const {_id, image_url,title,details,author,total_view,rating}= singleNews
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('card' ,'mb-3')
      newsDiv.innerHTML = `
      <div class="row g-0">
              <div class="col-md-4">
                <img src="${image_url}" class="img-fluid rounded-start" alt="...">
              </div>
              <div class="col-md-8 d-flex flex-column">
                <div class="card-body">
                  <h5 class="card-title">${title}
                  </h5>
                  <p class="card-text">${details.slice(0,200)}...</p>
                 
                </div>
                <div class="card-footer border-0 bd-body d-flex justify-content-between"> 
                <div class= "d-flex g-2">
                <img src="${author.img} " class="img-fluid rounded-circle" alt="..." height="40", width="40">
                <div>
                <p class="p-0 m-0">${author.name ? author.name : "not available"}</p>
                <p class="p-0 m-0">${author.published_date}</p>
                </div>
                </div>
                <div class="d-flex gap-2 align-items-center">
                <i class="fa-regular fa-eye"></i>
                <p class="p-0 m-0">${total_view ? total_view : "not available"}</p>
                </div>
                <div class=d-flex gap-2>
                ${generateStars(rating.number)}
                <p>${rating.number}</p>
                </div>
                <div>
                <i class="fa-solid fa-arrow-right text-primary " onclick = "fetchNewsDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#news-detail-modal"></i>
                </div>
                </div>
              </div>
             
        </div>
      `;
      newsContainer.appendChild(newsDiv);
    });

    
}


const fetchNewsDetails = news_id =>{
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`
    fetch(url)
    .then(res => res.json())
    .then(data => showNewsDetails(data.data[0]))
  
}

const showNewsDetails = newsDetails =>{
  
  const {image_url,title,details,others_info}= newsDetails
     
  document.getElementById('modal-body').innerHTML= `
      <div class="card mb-3">
      <div class="row g-0">
      <div class="col-md-12">
        <img src="${image_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-12 d-flex flex-column">
        <div class="card-body">
          <h5 class="card-title">${title}
          <span class="badge text-bg-warning">${others_info.is_trending ? "Trending" : ""}</span><span class="badge text-bg-success">${others_info.is_todays_pick ? "" : "Today's Pick"}</span></h5>
          <p class="card-text">${details}</p>
         
        </div>
        <div class="card-footer border-0 bd-body d-flex justify-content-between"> 
       
        </div>
       
       
        </div>
      </div>
     
</div>
      </div>`;
     

}

const showTrending=()=>{
  
  let trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending ===true);
  
  const category_name =document.getElementById('category-name').innerText 
  showAllnews (trendingNews,category_name)
}
const showTodaysPick=()=>{
  
  let todaysPick = fetchData.filter(singleData => singleData.others_info.is_todays_pick  !== true);
  
  const category_name =document.getElementById('category-name').innerText 
  showAllnews (todaysPick,category_name)
}

const generateStars = rating  =>{
  let ratingHTML = '';
  for (let i = 1; i <= Math.floor(rating); i++){
    ratingHTML += `
    <i class="fa-solid fa-star"></i> `
    
  }
if(rating - Math.floor(rating)>0){
  ratingHTML += `<i class="fa-solid fa-star-half"></i>`
}
return ratingHTML;
}
