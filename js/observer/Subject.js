export const Subject = class {
    #observers;

    constructor(observers = []) {
        this.#observers = new Set(observers);
    }

    addObservers(...observers) {
        observers.forEach(this.#addObserver);
    }

    #addObserver = (observer) => {
        this.#observers.add(observer);
    };

    deleteObserver = (observer) => {
        this.#observers.delete(observer);
    };

    notify = () =>{
        if (this.#observers && this.#observers.size > 0) {
            this.#observers.forEach(observer=> observer.setState());
        }
    };
    execute(){

    }
};
