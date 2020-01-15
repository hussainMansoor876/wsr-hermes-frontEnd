const loginUser = (user) => {
    return {
        type: "LOGIN_USER",
        user
    }
}

const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}


export {
    loginUser,
    removeUser
}