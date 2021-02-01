export const template = {
    title (name) {
        return `<span><strong>${name}</strong>'s Todo List</span>`
    },

    userButtons (name, userId) {
        return `<button class="ripple" data-userId="${userId}">${name}</button>`
    }
}