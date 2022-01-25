self.addEventListener("install", (event) => {
  console.log("Installing service worker");
  console.log("Caching static assets");
  event.waitUntil(
    caches
      .open("app-static-cache")
      .then((cache) => {
        return cache.addAll([
          "./index.html",
          "./style.css",
          "./offline.html",
          "./images/blue.jpeg",
        ]);
      })
      .catch((error) => {
        console.log("Following error occured: " + error);
      })
  );
});

self.addEventListener("sync", (event) => {
  if (event.tag == "firstSync") {
    event.waitUntil(connectionAlert());
  }
});

self.addEventListener("fetch", (event) => {
  console.log(`Getting the following resource: ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((res) => {
      return res || fetch(event.request);
    })
  );
});

self.addEventListener("notificationclick", function (e) {
  clients.openWindow("https://www.google.com/");
});

let connectionAlert = async function () {
  console.log("Background syncing");
};
