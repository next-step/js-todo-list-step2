const template = (userName) => {
    return `<div><storng>${userName}</storng></div>
            <div>Todo LIST</div>
`;
}

export class UserTitle {
    constructor({username , $userTitle}) {
        this.username = username;
        this.$userTitle = $userTitle;
    }

    setState(selectUsername){
        this.username = selectUsername;
        this.render();
    }
    render(){
        this.$userTitle.innerHTML = template(this.username);
    }

}