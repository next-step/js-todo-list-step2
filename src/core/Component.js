import { base_url, fetchAPI, METHOD } from "../components/constants";

export default class Component {
    $target;
    $props;
    $state;
    $users;
    constructor($target, $props = {}) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.init();
        this.render();
        this.setEvent();
    }
    setup() {
      
    }
    async init() { };
    mount() { };
    template() { return ``; };
    render() {
        this.$target.innerHTML = this.template();
        this.mount();
    }
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    
    setEvent() { };
    addEvent(eventype, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);
        this.$target.addEventListener(eventype, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
       
        })
    }

    fetchAPI = async (url = '', method = METHOD.GET, payload = {}) => {
        try {
          const option = {
            method,
            headers : { 'Content-Type': 'applicatoin/json' }
          }
          if (method!==METHOD.GET) {
            option.body = JSON.stringify(payload);
          }
          const response = await fetch(`${base_url}${url}`, option);
          if (!response.ok) { throw new Error(response.status); }
          const json = await response.json();
            this.setState({ idsLoading: true });
          console.log(json);
          return json;
        } catch (e) {
          console.error(e);
        } finally {
            this.setState({ isLoading: false });
        }
    };

   


}