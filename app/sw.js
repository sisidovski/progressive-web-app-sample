/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

// importScripts('bower_components/platinum-sw/service-worker.js');

var CACHE_NAME = 'cat';
var CACHE_VERSION = '1.0.0';

self.oninstall = function(event) {
  event.waitUntil(
    caches.open('statics').then(function(cache) {
      return cache.addAll([
        '/scripts/app.js',
        '/styles/main.css']);
    })
  );
};

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        var fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then(function(response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});

self.addEventListener('push', function(event) {
  e.waitUntil(
    self.registration.showNotification('Title', {
      body: 'Body',
      icon: 'http://placehold.it/192x192',
      tag: 'push-notification-tag'
    })
  );
});
