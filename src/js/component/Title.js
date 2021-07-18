import Observer from "../core/observer.js";
import { $ } from "../util/util.js";

export class Title extends Observer{
   constructor(selectedUserIdState){
       super();
       this.state = selectedUserIdState;
   }  
   template(){
        const name = this.state.get().name;
        //console.log(name);
        return `
        <span><strong>${name}</strong>'s Todo List</span>
        `
   }
   render(){
       const target = $("#user-title");
       target.innerHTML = this.template();
   }
   update(){
      // console.log(this.state);
       this.render();
   }
}