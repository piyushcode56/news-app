const Api_key = "71aa68a080ab4f28957ff92d114d850a";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', ()=>{
    fetchNews("India");
})

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apikey=${Api_key}`);
    const data = await response.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById('cards-container');
    const newsTemplate = document.getElementById('news-template');

    cardsContainer.innerHTML = "";
    articles.forEach(article => {
        if(!article.urlToImage) {
            return;
        }
        const cardClone = newsTemplate.content.cloneNode(true);

        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);


    })

}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-img');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#news-source');
    const newsDescription = cardClone.querySelector('#news-description');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDescription.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/jakarta"
    })

    newsSource.innerHTML = `${article.source.name} • ${date}`

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url, "_blank")
    })

}
const ipl = document.getElementById('ipl');
const finance = document.getElementById('finance');
const politics = document.getElementById('politics');
const newsLogo = document.getElementById('news-logo');

newsLogo.addEventListener('click', ()=>{
    ipl.style.color = "";
    finance.style.color = '';
    politics.style.color = '';
    fetchNews("India");
    searchText.value = '';
})
ipl.addEventListener('click', ()=>{
    ipl.style.color = "blue";
    finance.style.color = '';
    politics.style.color = '';
    fetchNews('ipl');
    searchText.value = '';
})

finance.addEventListener('click', ()=>{
    finance.style.color = "blue";
    ipl.style.color = '';
    politics.style.color ='';
    fetchNews('finace');
    searchText.value = '';
})
politics.addEventListener('click', ()=>{
    politics.style.color = "blue";
    finance.style.color = '';
    ipl.style.color ='';
    fetchNews('politics');
    searchText.value = '';
})


const searchText = document.getElementById('search-text');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', ()=>{
    fetchNews(searchText.value);
})








