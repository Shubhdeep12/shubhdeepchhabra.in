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
  try {
    event.waitUntil(
      addResourcesToCache([
        '/',
      ])
    );

  } catch (error) {
    console.log({ error })
  }
});

const putInCache = async (request, response) => {
  const cache = await caches.open(CACHE_NAME);
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
  if (event.request.method !== 'GET') {
    return;
  }
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