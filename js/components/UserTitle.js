export default function UserTitle($element) {
    
    this.render = (username) => {
        $element.innerHTML = 
        `<span><strong>${username}</strong>'s Todo List</span>`
    }
}