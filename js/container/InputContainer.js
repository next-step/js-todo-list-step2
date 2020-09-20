import {createTodoItem} from "../api/index.js";
import {addTodoItem} from "../reducer.js";

function InputContainer($dom, store) {
    $dom.addEventListener('keyup', async ({target, key})=>{
        switch (key){
            case 'Enter':{
                try {
                    const {selectedUserId} = store.getState();
                    const todoItem = await createTodoItem(selectedUserId, target.value);
                    store.dispatch(addTodoItem({todoItem}));
                    target.value = '';
                }catch (e) {
                    alert(e);
                    console.error(e)
                    target.value = '';
                }
            }
        }
    })
}

export default InputContainer;