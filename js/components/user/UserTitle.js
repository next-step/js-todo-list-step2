const template = (userName) => {
    return `<div><storng>${userName}</storng></div>
            <div>Todo LIST</div>
`;
}

export class UserTitle {
    constructor($userTitle,username ) {
        this.$userTitle = $userTitle;
        this.username = username;
    }

    setState(selectUsername){
        this.username = selectUsername;
        this.render();
    }
    render(){
        this.$userTitle.innerHTML = template(this.username);
    }

}