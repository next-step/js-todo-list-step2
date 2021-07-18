import Subject from "../js/core/Subject.js";
import {FILTER} from "../js/constants/constants.js"

export default class FilterState extends Subject{
    constructor() {
        super();
        this.filter = FILTER.ALL;
      }
    
      get() {
        return this.filter;
      }
    
      set(updateFilter) {
        this.filter = updateFilter;
        this.publish();
      }   
}