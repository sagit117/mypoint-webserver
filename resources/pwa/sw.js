const cacheVersion = "static-v080120221425";
const cacheUrls = [
    "/offline",
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
    "/static/manifest.json",
    "/static/registerSW.js",
    "/static/roles.svg",
    "/static/spinner.css",
    "/static/table.css",
    "/static/toasts.css",
    "/static/top-panel.css",
    "/static/topPanelController.js",
    "/static/users.svg",
    "/static/close.svg",
];


self.addEventListener("install", (event) => {
    console.log("install SW");

    event.waitUntil(
        caches.open(cacheVersion)
            .then((cache => {
                cache.addAll(cacheUrls);
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
                                cache.put(event.request, response.clone());
                                return response;
                            })
                    })
            })
            .catch(() => {
                return caches.match("/offline");
            })
}