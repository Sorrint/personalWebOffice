export const refreshAccessToken = async () => {
    try {
        await fetch(`${__SERVER_URI__}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', 
        });
        return { success: true }
    } catch (error) {
        console.error('Ошибка при обновлении токена:', error);
        return { success: false };
    }
};