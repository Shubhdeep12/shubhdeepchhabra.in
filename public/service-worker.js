const CACHE_NAME = 'shubhdeep-chhabra-v1';
const EXCLUDE_API = /^\/(?:api|stream)\//;

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(CACHE_NAME);
  resources.forEach(r => {
    try {
      cache.add(r);
    } catch (error) {
      console.log('error', { r });
    }
  })
  // await cache.addAll(resources);
};

self.addEventListener('install', event => {
  event.waitUntil(
    addResourcesToCache([
      '/',
      '/about',
      '/projects',
      '/blog',
      '/assets',
      '/_next/static/css/app/layout.css', // Tailwind or other CSS files
      '/_next/static/js/main.js',     // Main JS bundle
      '/_next/static/runtime/main.js', // Runtime JS (if exists)
      '/_next/static/chunks/',         // Cache all chunks
    ])
  );
});

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
  console.log({ request, response })
  await cache.put(request, response);
};

const fetchFromNetworkAndStoreInCache = async (request) => {
  const responseFromNetwork = await fetch(request);
  const responseClone = responseFromNetwork.clone();
  await putInCache(request, responseClone)
  return responseFromNetwork;
}

const fetchFromCache = async (request) => {
  const responseFromCache = await caches.match(request);
  return responseFromCache
}

self.addEventListener('fetch', event => {
  const { request } = event;

  if (EXCLUDE_API.test(new URL(request.url).pathname)) {
    return;
  }

  if (navigator.onLine) {
    event.respondWith(fetchFromNetworkAndStoreInCache(request));
  } else {
    event.respondWith(fetchFromCache(request));
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      self.skipWaiting();
      await self.clients.claim();
    })()
  );
});