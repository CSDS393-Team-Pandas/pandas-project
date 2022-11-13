export default {
    admin: {
        login: {
            method: "POST",
            url: "/admin/login"
        },
        register: {
            method: "POST",
            url: "/admin/register"
        }
    },
    upload: {
        method: "POST",
        url: "/api/upload"
    },
    user: {
        init: {
            method: "GET",
            url: "/admin/user"
        }
    },
    game: {
        create: {
            method: "POST",
            url: "/admin/game"
        },
        update: {
            method: "PUT",
            url: "/admin/game"
        },
        init: {
            method: "POST",
            url: "/admin/gameInit"
        },
        delete: {
            method: "DELETE",
            url: "/admin/game"
        }
    },
    comment: {
        init: {
            method: "POST",
            url: "/admin/comment"
        },
        delete: {
            method: "DELETE",
            url: "/api/comment"
        }
    }
}