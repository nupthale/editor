import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView, Convertible } from '../_common/baseBlockView';
import { FloatMenuTrigger } from '../_common/floatMenuTrigger';
import './index.less';

export class HeaderView extends BaseBlockView implements Convertible {
  level: number = 1;

  floatMenuTrigger: FloatMenuTrigger;

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.level = node.attrs.level;

    // 创建容器元素
    this.dom.classList.add('doc-header');
    
    this.render();

    this.floatMenuTrigger = new FloatMenuTrigger(this, this.getMouseEnterProps);
  }

  render() {
    this.dom.className = this.dom.className.replace(/level\d/gm, '').trim();

    const level = this.node.attrs.level;
    this.dom.classList.add(`level${level}`);

    const orginalContent = this.contentDOM?.innerHTML || '';
    if (this.contentDOM) {
       // 删除this.contentDOM
       this.contentDOM.remove();
    }

    this.contentDOM = document.createElement(`h${level}`);
    this.contentDOM.innerHTML = orginalContent;
    this.dom.appendChild(this.contentDOM);
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;

    this.node = node; // 更新节点
    if (node.attrs.level !== this.level) {
      this.render();
    }
    this.level = node.attrs.level;

    return true;
  }

  getMouseEnterProps = () => {
    const map = {
      1: 5,
      2: 2,
      3: 0,
    }

    return {
      offsetY: map[this.level] || -1,
    }
  }

  destroy() {
    super.destroy();

    this.floatMenuTrigger.destroy();
  }

  convertTo(targetType: string, attrs?: Record<string, any>) {
    console.info(targetType, attrs);
  }
}

