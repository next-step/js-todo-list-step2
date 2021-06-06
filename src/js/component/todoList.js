
// export function loadingBar(){
//     `<li>
//       <div class="view">
//         <label class="label">
//           <div class="animated-background">
//             <div class="skel-mask-container">
//               <div class="skel-mask"></div>
//             </div>
//           </div>
//         </label>
//       </div>
//     </li>`;
//   }
  
export const todoItem = (item) =>{
  console.log("todoItem");
  console.log(item);
  const selectHTML = getPriorityHTML(item.priority);
  console.log(selectHTML);
  const id = item._id;
  const contents = item.contents;
  const isCompleted = item.isCompleted ? "completed" : "";
  const checked = item.isCompleted ? "checked" : "";

  let todo =
   `<li id="li_${id}" class="${isCompleted}">
      <div class="view">
        <input class="toggle" type="checkbox" ${checked}/>
        <label class="label">
         
            ${selectHTML}
          </select>
          ${contents}
        </label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="${contents}" />
    </li>
    `;

  return todo;
}

function getPriorityHTML(priority){
  let selectedValue = "";
  if(priority ==='NONE') 
  selectedValue +=
    `
    <select class="chip select">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>`;
  if(priority ==='FIRST') 
  selectedValue += 
    `<span class="chip primary">1순위</span>`;
  if(priority ==='SECOND') 
  selectedValue +=  
    `<span class="chip secondary">2순위</span>`;
  return selectedValue;
}

export function getTodoList(){

} 