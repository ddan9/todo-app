const cacheName = 'TODO';

const assets = [

	'./',
	'./index.html',
	'./index.js',
	'./style.css',
	'./manifest.json',
	'./serviceWorker.js',
	'https://img.icons8.com/stickers/100/000000/task.png',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js',
	'https://code.jquery.com/jquery-3.2.1.min.js',
	'https://cdn.jsdelivr.net/npm/vue@2.7.0'

]

self.addEventListener('install', e => {

	e.waitUntil(

		caches.open(cacheName).then(cache => {

			return cache.addAll(assets);

		})

	);

});

self.addEventListener('fetch', event => {

	event.respondWith(

		caches.open(cacheName)

			.then(cache => cache.match(event.request, { ignoreSearch: true }))

			.then(response => {

				return response || fetch(event.request);

			})

	);

});
