import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';
import { Heading1, Heading2, Heading3, Heading4, Heading5, Heading6 } from 'lucide';

import { BaseBlockView } from '../_common/baseBlockView';
import { blockMouseEnter$ } from '../../../event';
import './index.less';

export class HeadingView extends BaseBlockView implements NodeView {
  level: number = 1;

  get icon() {
    switch (this.level) {
      case 1:
        return Heading1;
      case 2:
        return Heading2;  
      case 3:
        return Heading3;
      case 4:
        return Heading4;
      case 5:
        return Heading5;
      case 6:
        return Heading6;
      default:
        return Heading1;  
    }
  }

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    this.level = node.attrs.level;

    // 创建容器元素
    this.dom.classList.add('doc-heading');
    
    this.render();

    this.initFloatMenuEvt();
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

  mouseEnter = () => {
    const map = {
      1: 5,
      2: 2,
      3: 0,
    }

   
    blockMouseEnter$.next({
      nodeView: this,
      offsetY: map[this.level] || -1,
    });
  }
}

