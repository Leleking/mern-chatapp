export const  authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) 
        return user.token ;
    return ''
}