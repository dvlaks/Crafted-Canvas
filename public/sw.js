const CACHE_NAME = 'aakash-portfolio-v2.0.0'
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.svg',
  // Add optimized 3D assets
  '/tbp/scene-optimized.gltf',
  '/tbp/scene.bin',
  '/tbp/textures-optimized/material_baseColor.webp',
  '/tbp/textures-optimized/hierbas_baseColor.webp',
  '/tbp/textures-optimized/plantas_baseColor.webp',
  '/tbp/textures-optimized/tela_baseColor.webp',
  '/tbp/textures-optimized/material_6_baseColor.webp',
  // Add fallback PNG versions
  '/tbp/textures-optimized/material_baseColor.png',
  '/tbp/textures-optimized/hierbas_baseColor.png',
  '/tbp/textures-optimized/plantas_baseColor.png',
  '/tbp/textures-optimized/tela_baseColor.png',
  '/tbp/textures-optimized/material_6_baseColor.png'
]

// Install event - cache resources with performance optimizations
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        // Cache critical resources first, then non-critical
        const criticalResources = urlsToCache.slice(0, 4)
        const nonCriticalResources = urlsToCache.slice(4)
        
        return cache.addAll(criticalResources)
          .then(() => {
            // Cache non-critical resources in background
            return Promise.allSettled(
              nonCriticalResources.map(url => 
                cache.add(url).catch(err => console.warn(`Failed to cache ${url}:`, err))
              )
            )
          })
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error)
      })
  )
  self.skipWaiting()
})

// Fetch event - serve from cache with network fallback and performance optimization
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Skip caching for non-GET requests
  if (event.request.method !== 'GET') {
    return
  }
  
  // Skip caching for external domains
  if (url.origin !== location.origin) {
    return
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response
        }
        
        // For 3D assets, try to fetch with timeout
        if (event.request.url.includes('.gltf') || event.request.url.includes('.bin') || event.request.url.includes('textures')) {
          return fetchWithTimeout(event.request, 10000)
            .then(response => {
              if (response && response.status === 200) {
                const responseToCache = response.clone()
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, responseToCache))
                  .catch(err => console.warn('Failed to cache response:', err))
              }
              return response
            })
            .catch(() => {
              console.warn('Failed to fetch 3D asset:', event.request.url)
              return new Response('', { status: 404 })
            })
        }
        
        return fetch(event.request).then((response) => {
          // Don't cache if not a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          
          // Clone the response
          const responseToCache = response.clone()
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache)
            })
            .catch(err => console.warn('Failed to cache response:', err))
          
          return response
        }).catch(() => {
          // Return offline fallback for navigation requests
          if (event.request.destination === 'document') {
            return caches.match('/index.html')
          }
        })
      })
  )
})

// Helper function to fetch with timeout
function fetchWithTimeout(request, timeout = 5000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Fetch timeout')), timeout)
    )
  ])
}

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
  self.clients.claim()
})

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore Portfolio',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('Aakash Portfolio', options)
  )
})

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      self.clients.openWindow('/')
    )
  }
})
