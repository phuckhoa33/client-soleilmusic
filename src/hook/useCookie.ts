function useCookie(name: string) {
    const cookieValue = document.cookie
        .split(';')
        .find(cookie => cookie.trim().startsWith(`${name}=`));
    

    if (cookieValue) {
        return cookieValue.split('=')[1];
    }

    return null;
}

export default useCookie;