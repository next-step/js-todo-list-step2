import UserTitle from './components/userTitle.js';
import UserList from './components/userList.js';
import TodoApp from './components/TodoApp.js';


export default function App ($element) {
    this.state = {
        userInfo: null,
        loading: false
    }
    this.userTitle = null;
    this.userList = null;

    this.setState = ({userInfo, loading}) => {
        if(userInfo){
            this.state.userInfo = userInfo ?? {};
        }
        
        if(loading !== null && loading !== 'undefined'){
            this.state.loading = loading ?? false;
        }
        
        this.render();
    }

    this.toggleLoading = () => {
        const loading = document.querySelector('.page-loading');
        loading.classList.toggle('display-none', !this.state.loading);
    }

    this.init = () => {
        const $userTitle = $element.querySelector('#user-title');
        const $userList = $element.querySelector('#user-list');
        const $todoApp = $element.querySelector('#todoapp');

        
        this.userTitle = new UserTitle($userTitle);
        this.userList = new UserList(
            $userList,
            {
                setUserInfo: userInfo => {
                    this.setState({
                        userInfo,
                    })
                    this.todoApp.setUserInfo(userInfo);
                    this.todoApp.getTodoListByUserId();
                }
            });
    
        this.todoApp = new TodoApp($todoApp);
    }
    
    this.init();

    this.render = () => {
        if(this.state.loading){
            return;
        }
        this.userTitle.render(this.state.userInfo.name);
        this.userList.render();
    }
}