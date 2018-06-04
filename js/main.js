// Instantiate a Dexie DB Object
let db = new Dexie('Newsly');
db.version(1).stores({
    posts: 'id, news_time'
});

// Register our service worker
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('./sw.js')
    .then(reg => {
        if (!navigator.serviceWorker.controller) {
            return;
        }

        // If there's a waiting worker
        // Display a notification message
        if (reg.waiting) {
            notifyUpdate($('.toast'));
        }
        
        // If there's an installing worker
        // Display a notification message
        if (reg.installing) {
            reg.installing.addEventListener('statechange', function(){
                if (this.state === 'installed') {
                    notifyUpdate($('.toast'));
                }
            });
        }

        // If there's a Service Worker Update found
        reg.addEventListener('updatefound', function () {
            reg.installing.addEventListener('statechange', function(){
                if (this.state === 'installed') {
                    notifyUpdate($('.toast'));
                }
            })
        });

        // Send message to the service worker
        // If user hits the refresh button
        $(document).on('click', '.refresh', function () {
            refreshPage(reg.waiting || reg.installing);
        });
    });

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
}

// Check if user is trying to load Newsly for the first time
// Then try to fetch from network, if not, try load post from IndexedDB before going to network
db.posts.count().then(postsCount => {
    if (!postsCount) {
        // Fetch news from server as JSON and store it in the database
        console.log('Fetched from network');
        fetch('./api/fetch.php').then(function (response) {
            return response.json();
        }).then(function (response) {
            response.map(news => {
                db.transaction('rw', db.posts, () => {
                    db.posts.put(news);
                });
                let news_card = `<div class="col-sm-4 col-xs-12">
                    <a href="${news.news_url}" target="_blank">
                        <div class="card">
                            <div class="card-header">
                                <span class="news-time text-left">${moment(news.news_time).fromNow()}</span>
                                <span class="news-source text-right visible-xs">${news.news_source}</span>
                            </div>
                            <div class="col-xs-5 col-sm-12 news-image-parent remove-padding">
                                <img class="news-img" src="${news.news_image}" onerror="if(this.src !== './images/newsly.png') this.src = './images/newsly.png'">
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
            });
        }).catch(error => {
            return 'Oops!!! Something is broken';
        });
    }
    else {
        // Retrieve posts from IndexedDB
        console.log('Fetched from IndexedDB');
        db.transaction('rw', db.posts, () => {
            db.posts.orderBy('news_time').reverse().each(news => {
                let news_card = `<div class="col-sm-4 col-xs-12">
                    <a href="${news.news_url}" target="_blank">
                        <div class="card">
                            <div class="card-header">
                                <span class="news-time text-left">${moment(news.news_time).fromNow()}</span>
                                <span class="news-source text-right visible-xs">${news.news_source}</span>
                            </div>
                            <div class="col-xs-5 col-sm-12 news-image-parent remove-padding">
                                <img class="news-img" src="${news.news_image}" onerror="if(this.src !== './images/newsly.png') this.src = './images/newsly.png'">
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
            });
        });
    }
});

// Handle events
$(document).on('click', '.navbar-toggle', function (event) {
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

// Function to toggle notification display
function notifyUpdate(notif) {
    notif.addClass('toast-show');
}

function refreshPage(worker){
    if (worker) {
        worker.postMessage({ action: 'refresh' });
    }
}