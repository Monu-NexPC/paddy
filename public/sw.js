let cacheMe = 'Paddy';
const fileToCache = [
    '/',
    'index.html',
    '/signup',
    '/home',
    '/static/js/bundle.js',
    '/static/media/Dino_Skate_Thumb.b14cef8dfc05f38169f2.gif',
    '/favicon.ico'
]
self.addEventListener('install',(e)=>{
    e.waitUntil(
        caches.open(cacheMe).then((c)=>{
            c.addAll(fileToCache)
        })
    )
})

self.addEventListener('fetch', (e)=>{
    if(!navigator.onLine){
    e.respondWith(
        caches.match(e.request).then((r)=>{
            if(r)
            {
                return r
            }
        })
    )}
})