// $(document).on('ready', () => {
auth.signIn('test', 'test')
    .then(() => {
        Socket.init(io)
        users.init()
        users.getAllUsers.subscribe((users)=> console.log(users))
    })

// })