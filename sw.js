let staticCacheName = 'newsly-static-v1';
let imagesCacheName = 'newsly-images';

let cacheNames = [
    staticCacheName,
    imagesCacheName
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll([
                './',
                './css/style.css',
                './js/main.js',
                'https://use.fontawesome.com/releases/v5.0.13/css/solid.css',
                'https://use.fontawesome.com/releases/v5.0.13/css/fontawesome.css',
                'https://use.fontawesome.com/releases/v5.0.13/webfonts/fa-solid-900.ttf',
                'https://use.fontawesome.com/releases/v5.0.13/webfonts/fa-solid-900.woff',
                'https://use.fontawesome.com/releases/v5.0.13/webfonts/fa-solid-900.woff2',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
                'https://fonts.googleapis.com/css?family=Lato|Leckerli+One',
                'https://fonts.gstatic.com/s/leckerlione/v8/V8mCoQH8VCsNttEnxnGQ-1idKpZdJNE9Fg.woff2',
                'https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2',
                'https://unpkg.com/dexie@latest/dist/dexie.js',
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheList => {
            cacheList.filter(staleCaches => {
                return staleCaches.startsWith('newsly') && !cacheNames.includes(staleCaches);
            })
            .map(deleteCache => {
                return caches.delete(deleteCache);
            })
        })
    );
});

self.addEventListener('fetch', event => {
    // First intercept requests and check if we have any cached requests
    // If we do, return a reponse else fetch from the server
    // Intercept images and check if the we get an error in response
    // Then replace failed image resources with default /images/newsly.png placeholder

    if (event.request.destination !== 'image'){
        event.respondWith(
            caches.open(staticCacheName).then(cache => {
                return cache.match(event.request.url).then(response => {
                    if (response) {
                        return response;
                    }
                    // If no item matched in cache, attempt fetching from network
                    return fetch(event.request);
                });
            })
        );
    }
    else {
        event.respondWith(
            caches.open(imagesCacheName).then(cache => {
                return cache.match(event.request.url).then(response => {
                    cache.addAll(['./images/newsly.png']);
                    return response || fetch('https://cors-anywhere.herokuapp.com/' + event.request.url, { mode: 'cors' })
                    .then(response => {
                        if (response.ok) {
                            cache.put(event.request, response.clone());
                        }
                        return response;
                    })
                    // If all fetch image attempts fail,fallback to default placeholder
                    .catch(error => {
                        return fetch('./images/newsly.png');
                    });
                });
            })
        );
    }
});

// Listen for messages from main.js controller
self.addEventListener('message', function(event) {
    if (event.data.action) {
        self.skipWaiting();
    }
});
