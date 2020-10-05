export class Component{
    $target;
    props;
    event;
    constructor($target , event , props = {}) {
        this.$target = $target;
        this.event = event;
        this.props = props;
    }

    setState(){}
    render(){}
    initEventHandler(){}
}