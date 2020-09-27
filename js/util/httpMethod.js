export default new class HttpMethod {
    get DELETE() { return { method : "DELETE" } }
    POST = (content) => {
        return {
            method : "POST",
            headers  : { 'Content-Type': 'application/json' },
            body : content
        }
    }
    PUT = (content) => {
        return {
            method : "PUT",
            headers  : { 'Content-Type': 'application/json' },
            body : content
        }
    }
}