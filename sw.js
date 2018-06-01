let cacheName = 'newsly-static-v2';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
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
                'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.1/moment.min.js',
                'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
            ]);
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            cacheNames.filter(filteredCaches => {
                return filteredCaches.startsWith('newsly') && filteredCaches !== cacheName;
            })
            .map(deleteCache => {
                return caches.delete(deleteCache);
            })
        })
    );
});

self.addEventListener('fetch', event => {
    // First imtercept requests and check if we have any cached requests
    // If we do, return a reponse else fetch from the server
    // Intercept images and check if the we get an error in response
    // Then replace failed image resources with default /images/newsly.png placeholder
    event.respondWith(
        caches.open(cacheName).then(cache => {
            return cache.match(event.request.url).then(response => {
                if (response) {
                    console.log('Loaded from cache', response.url);
                    return response;
                }
                else if (event.request.destination === 'image') {
                    return fetch('https://cors-anywhere.herokuapp.com/' + event.request.url, { mode: 'cors' })
                    .then(response => {
                        if (response.status !== 200) {
                            return fetch('./images/newsly.png');
                        }
                        return response;
                    })
                    .catch(error => {
                        return fetch('./images/newsly.png');
                    });
                }
                return fetch(event.request);
            });
        })
    );
});
