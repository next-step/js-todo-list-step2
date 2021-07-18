class subject{
    constructor(){
        this.observers = [];
    }
    subscribe(observer){
        this.observers = this.observers.concat(observer);
    }
    publish(){
        this.observers.forEach((observer) => observer.update());
    }
}

export default subject;