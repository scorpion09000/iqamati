/* =========================================================================
   Service Worker لمنصة إقامتي (PWA)
   يُفعّل التثبيت الأصلي على أندرويد (WebAPK) مع أولوية الشبكة لجلب التحديثات فوراً
   ========================================================================= */
const CACHE_NAME = 'iqamati-pwa-v1';

// تثبيت Service Worker وتفعيله فوراً
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

// تنظيف أي ذاكرة تخزين مؤقت قديمة
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
            )
        )
    );
    self.clients.claim();
});

// استراتيجية Network-First لضمان ظهور أحدث نسخة من التطبيق والبيانات دائماً
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
