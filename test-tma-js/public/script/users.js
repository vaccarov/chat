const users = (function () {
    let users$ = new Observable([]);

    const init = () => {
        console.log('coucpu');
        http.get('a')
            .then(users => {
                console.log(users);
                users$.next(users)
            })
        Socket.receive('users', (users) => {
            console.log('coucou');
            users$.next(users)
        })
    }

    return {
        init,
        getAllUsers: users$
    }

})()