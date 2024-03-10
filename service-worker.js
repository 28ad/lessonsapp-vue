let cacheName = "lessons-app";
let cacheFiles = [
//  "/public/app.html",
 //"products.js",
 "/lessons-app.github.io/images/icon32.png",
 "/lessons-app.github.io/images/icon512.png",
 "/lessons-app.github.io/images/mathslesson.png",
 "/lessons-app.github.io/images/biology.png",
 "/lessons-app.github.io/images/chemistry.png",
 "/lessons-app.github.io/images/german.png",
 "/lessons-app.github.io/images/geography.png",
 "/lessons-app.github.io/images/englishlesson.png",
 "/lessons-app.github.io/images/history.png",
 "/lessons-app.github.io/images/japanese.png",
 "/lessons-app.github.io/images/physics.png",
 "/lessons-app.github.io/images/programming.png",
];

self.addEventListener("install", function(e) {
 console.log("[Service Worker] Install");
 e.waitUntil(
 caches.open(cacheName).then(function(cache) {
 console.log("[Service Worker] Caching files");
 return cache.addAll(cacheFiles);
 })
 );
});

self.addEventListener("fetch", function(e) {
    e.respondWith(
    caches.match(e.request).then(function (cachedFile) {
    //if the file is in the cache, retrieve it from there
    if (cachedFile) {
    console.log("[Service Worker] Resource fetched from the cache for: " + e.request.url);
    return cachedFile;
    } else {//if the file is not in the cache, download the file
    return fetch(e.request).then(function (response) {
    return caches.open(cacheName).then(function (cache) {
    //add the new file to the cache
   cache.put(e.request, response.clone());
    console.log("[Service Worker] Resource fetched and saved in the cache for: " + 
   e.request.url);
    return response;
    });
    });
    }
    })
    ); 
   });