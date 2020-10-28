

export const request = async (url, option) => {
    try {
        const response = await fetch(url, option);
        return await response.json();
    } catch (e) {
        console.error(e);
    }
};