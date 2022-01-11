const cacheVersion = "static-v110120221034";
const cacheUrls = [
    "/",
    "/offline",
    "/static/manifest.json",
    "/admin/panel",
    "/static/index.css",
    "/static/admin-home.css",
    "/static/appicons/144.png",
    "/static/buttons.css",
    "/static/chevron-right.svg",
    "/static/colors.css",
    "/static/common/DefaultHTMLComponent.js",
    "/static/components/SideMenu.js",
    "/static/components/TopPanel.js",
    "/static/control-panel.css",
    "/static/home.svg",
    "/static/inputs.css",
    "/static/left-side-menu.css",
    "/static/main_menu_toggle.svg",
    "/static/registerSW.js",
    "/static/roles.svg",
    "/static/spinner.css",
    "/static/table.css",
    "/static/toasts.css",
    "/static/top-panel.css",
    "/static/topPanelController.js",
    "/static/users.svg",
    "/static/close.svg",
    "/static/favicon.png"
];


self.addEventListener("install", (event) => {
    console.log("install SW");

    event.waitUntil(
        caches.open(cacheVersion)
            .then((cache => {
                cache.addAll(cacheUrls)
            })
        )
    )
})

self.addEventListener('activate', (event) => {
    console.log("activate")
    event.waitUntil(
        caches.keys()
            .then((keyList) => {
                return Promise.all(
                    keyList.map((key) => {
                        if (cacheVersion.indexOf(key) === -1) {
                            return caches.delete(key);
                        }
                    })
                )
            })
            .catch((error) => {
                console.error(error);
            })
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheFirstStrategy(event))
})

function cacheFirstStrategy(event) {
    return caches.match(event.request)
            .then((resp) => {
                return resp || fetch(event.request)
                    .then((response) => {
                        return caches.open(cacheVersion)
                            .then((cache) => {
                                if (response.status === 200 && event.request.method === "GET") {
                                    cache.put(event.request, response.clone());
                                }

                                return response;
                            })
                            .catch(() => {
                                return caches.match("/offline");
                            })
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            })
            .catch(() => {
                return caches.match("/offline");
            })
}