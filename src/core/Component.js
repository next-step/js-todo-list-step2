export const Component = class {

  $target; $state = {}; $props;

  constructor (target, props = {}) {
    this.$target = target;
    this.$props = props;
    this.#setup();
  }

  async #setup () {
    await this.init(); // state 정의를 할 예정
    this.setEvent(); // 이벤트 등록. 이 때 이벤트 버블링을 활용해야 됨
    this.setState(this.$state); // 컴포넌트 렌더링
  }

  init () {};

  #render () {
    this.$target.innerHTML = this.render();
    this.componentDidMount(); // 컴포넌트 렌더링 후에 추가적으로 할일
  }

  render () {
    return '';
  }

  componentDidMount () {}

  setState (payload) {
    this.$state = { ...this.$state, ...payload };
    this.#render();
  }

  setEvent () {}
  addEvent () {}

}