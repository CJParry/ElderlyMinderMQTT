/**
 * Check out https://googlechromelabs.github.io/sw-toolbox/ for
 * more info on how to use sw-toolbox to custom configure your service worker.
 */


'use strict';
importScripts('./build/sw-toolbox.js');

self.toolbox.options.cache = {
  name: 'ionic-cache'
};

// pre-cache our key assets
self.toolbox.precache(
  [
    './build/main.js',
    './build/vendor.js',
    './build/main.css',
    './build/polyfills.js',
    'index.html',
    'manifest.json'
  ]
);

// dynamically cache any other local assets
self.toolbox.router.any('/*', self.toolbox.fastest);

// for any other requests go to the network, cache,
// and then only use that cached resource if your user goes offline
self.toolbox.router.default = self.toolbox.networkFirst;

self.addEventListener('message', function(evt){
	showNotification();
});

self.addEventListener('notificationclick', function(event) {
  if (!event.action) {
    event.waitUntil(self.clients.claim().then(() => {
      return self.clients.matchAll({type: 'window'});
    }).then(clients => {
      return clients.map(client => {
        if ('navigate' in client) {
          console.log(client);
          if(client.url != "http://localhost:8100/"){
            return client.navigate('http://localhost:8100/');
          }
          else{
            return client.focus();
          }
        }
      });
    }));
  }
});

function showNotification(){
	self.registration.showNotification('Warning', {body:'Person has not moved for over 5 minutes'});
}