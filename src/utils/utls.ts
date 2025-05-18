
export const GetCurrentUser = () => {
    const user: any = localStorage.getItem('data');
    if (user) {
        return JSON.parse(user);
    }
    return null;
}