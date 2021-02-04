/**
 * @typedef { Record<keyof Node, Node[keyof Node]> | null } PropsType
 * @typedef {{nodeType: (string | Function), props: PropsType, children: ReillyNode[] | string }} ReillyNode
 */

/**
 * Modify DOM
 * @namespace
 */
class ReillyDOM {
  /**
   * @param {ReillyNode} reillyNode - represents a root Node which contains children
   * @param {HTMLElement} container - container node for `reillyNode`
   */
  static render(reillyNode, container) {
    const $root = document.getElementById('root');
    const htmlElement = this.renderElement(reillyNode);
    if (!container) container = $root;

    container.innerHTML = '';
    container.appendChild(htmlElement);
  }

  /**
   * @param {ReillyNode} reillyNode
   * @returns {HTMLElement} HTML element referred by the `reillyNode`
   */
  static renderElement(reillyNode) {
    if (typeof reillyNode === 'string' || typeof reillyNode === 'number') {
      return document.createTextNode(reillyNode);
    }

    if (reillyNode === undefined) return;

    let $element;

    $element = document.createElement(reillyNode.nodeType);

    for (let [key, value] of Object.entries(reillyNode.props ?? {})) {
      if (key === 'children') continue;

      if (key === 'className' || key.startsWith('on')) {
        $element[key] = value;
      } else {
        $element.setAttribute(key, value);
      }
    }

    (reillyNode.children || reillyNode)
      ?.map(child => {
        return this.renderElement.call(this, child || '');
      })
      .forEach(elem => {
        $element.appendChild(elem);
      });

    return $element;
  }
}

export default ReillyDOM;
