export class Component{
    $target;
    props;

    constructor($target , props = {}) {
        this.$target = $target;
        this.props = props;
    }

    setState(){}
    render(){}
    initEventHandler(){}
}