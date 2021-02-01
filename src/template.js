export const template = {
    title (name) {
        return `<span><strong>${name}</strong>'s Todo List</span>`
    },

    userButtons (name, userId) {
        return `<button class="ripple" data-userId="${userId}">${name}</button>`
    },

    todo (contents) {
        return `<li class=">
            <div class="view">
                <input class="toggle" type="checkbox"/>
                <label class="label">${contents}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${contents}" />
        </li>`
    }
}