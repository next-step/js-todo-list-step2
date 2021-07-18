import Subject from "../js/core/Subject.js";

export default class CountState extends Subject{
    constructor() {
        super();
        this.count = "";
      }
    
      get() {
        return this.count;
      }
    
      set(updateCount) {
        this.count = updateCount;
        this.publish();
      }   
}