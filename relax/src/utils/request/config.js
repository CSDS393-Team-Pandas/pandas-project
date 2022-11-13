export default {
    user: {
        login: {
            method: "POST",
            url: '/api/login'
        },
        register: {
            method: "POST",
            url: '/api/register'
        },
        init: {
            method: "GET",
            url: '/api/user'
        },
        info: {
            method: "GET",
            url: '/api/user'
        },
        update: {
            method: "PUT",
            url: '/api/user'
        },
        rate: {
            method: 'GET',
            url: '/api/rate'
        },
    },
    upload: {
        method: "POST",
        url: '/api/upload'
    },
    comment: {
        init: {
            method: "POST",
            url: "/api/commentInit"
        },
        create: {
            method: "POST",
            url: "/api/comment"
        },
        user: {
            method: "GET",
            url: "/api/comment"
        }
    },
    game: {
        init: {
            method: "GET",
            url: "/api/game"
        },
        info: {
            method: "POST",
            url: "/api/getGameInfo"
        },
        category: {
            method: "POST",
            url: "/api/gameCategory"
        },
    },
    rate: {
        init: {
            method: "POST",
            url: "/api/rateInit"
        },
        create: {
            method: "POST",
            url: "/api/rate"
        },
    },
    search: {
        product: {
            method: "POST",
            url: "/api/search"
        }
    }
}