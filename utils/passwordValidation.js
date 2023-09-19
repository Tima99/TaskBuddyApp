const passwordValidator = (password) => {
    if (password.length <= 0)
        return Promise.reject("Password cannot be empty");
    else if(/\s+/.test(password))
        return Promise.reject("Password must not contain one or more spaces")
    else if(password.length < 4)
        return Promise.reject("Password must have at least 4 characters")
};

export default passwordValidator