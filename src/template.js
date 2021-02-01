export const template = {
    title (name) {
        return `<span><strong>${name}</strong>'s Todo List</span>`
    },

    userButtons (name) {
        return `<button class="ripple">${name}</button>`
    }
}