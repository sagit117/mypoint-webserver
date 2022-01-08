(() => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/static/sw.js', { scope: '/' })
            .then((reg) => {
                // регистрация сработала
                console.log('Registration SW succeeded. Scope is ' + reg.scope);
            }).catch((error) => {
                // регистрация прошла неудачно
                console.log('Registration SW failed with ' + error);
            })
      }
})()