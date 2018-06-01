// Register our service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js');
}

// Fetch news from DB as JSON
fetch('./api/fetch.php')
.then(function(response){
    return response.json();
})
.then(function(response){
    for (let news of response) {
        let news_card = `<div class="col-sm-4 col-xs-12">
                    <a href="${news.news_url}" target="_blank">
                        <div class="card">
                            <div class="card-header">
                                <span class="news-time text-left">${moment(news.news_time).fromNow()}</span>
                                <span class="news-source text-right visible-xs">${news.news_source}</span>
                            </div>
                            <div class="col-xs-5 col-sm-12 news-image-parent remove-padding">
                                <img class="news-img" src="${news.news_image}">
                            </div>
                            <div class="col-xs-6 col-sm-12 news-body-parent remove-padding">
                                <p class="news-title">${news.news_title}</p>
                                <p class="news-body">${news.news_body || ''}</p>
                            </div>
                            <div class="card-footer hidden-xs">
                                <span class="news-source text-right">${news.news_source}</span>
                            </div>
                        </div>
                    </a>
                </div>`;
        $('.news-content').append(news_card);
    }
})
.catch(function(error){
    return 'Oops!!! Something is broken';
});

// Handle events
$(document).on('click', '.navbar-toggle', function(event){
    event.preventDefault();
    $('body').addClass('menu-open');
    $('.sidebar').addClass('sidebar-open');
});

$(document).on('click', '.menu-open', function (event) {
    event.preventDefault();
    $(this).removeClass('menu-open');
    if (event.target.id !== 'sidebar') {
        $('.sidebar').removeClass('sidebar-open');
    }
});