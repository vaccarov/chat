const http = (function () {
    const baseUrl = 'http://localhost:3000'

    function authHeader(xhr) {
        console.log('$$$$$');
        xhr.setRequestHeader("Authorization", `Bearer ${auth.user ? auth.user.uid : ''}`);
    }

    function post(url, data) {
        return new Promise((resolve, reject) => $.ajax(
            {
                type: 'Post',
                url: `${baseUrl}/${url}`,
                data: data,
                beforeSend: authHeader
            }
            )
                .done((data) => resolve(data))
                .fail((data) => reject(data))
        )
    }

    function get(url) {
        return new Promise((resolve, reject) => {
           return  $.get(
                    {
                        url: `${baseUrl}/${url}`,
                        beforeSend: authHeader,
                    }
                )
                    .done((data) => {
                        console.log('gggggeeeettttt', data);
                        return resolve(data)
                    })
                    .fail((data) => {
                        console.log(data);
                        reject(data)
                    })
                    .always(function () {
                        alert("complete");
                    })
            }
        )
    }

    return {
        post,
        get: get
    }
})()