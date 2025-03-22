document.addEventListener("DOMContentLoaded", function () {
    const newsContainer = document.getElementById("news-container");
    
    // Sample news data
    const newsData = [
        { title: "Breaking: Market Hits Record Highs", content: "The stock market reached new heights today..." },
        { title: "Tech Giant Releases New Phone", content: "The latest smartphone model boasts amazing features..." },
        { title: "Sports Update: Local Team Wins Championship", content: "In an exciting final match, the team secured victory..." }
    ];
    
    newsData.forEach(news => {
        const newsItem = document.createElement("div");
        newsItem.classList.add("news-item");
        newsItem.innerHTML = `<h2>${news.title}</h2><p>${news.content}</p>`;
        newsContainer.appendChild(newsItem);
    });
});
