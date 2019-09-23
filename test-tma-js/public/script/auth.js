const auth = (function () {
    let user = null;
    let urlAuth = 'http://localhost:3000/auth'
    const signIn = (login, password) => {
        return new Promise((resolve, reject) => {
            $.get(`${urlAuth}/?login=${login}&password=${password}`)
                .done((userConnected) => {
                    console.log('****************$');
                    console.log(userConnected);
                    console.log('****************$');
                    user = userConnected
                    resolve(user)
                })
                .fail((e) => reject(e))
        })
    }

    const getUser = () => {
        console.log('-----', user);
        return user;
    }
    return {
        signIn: signIn,
        user: getUser
    }
})()