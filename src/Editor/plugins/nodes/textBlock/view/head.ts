import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { FloatMenuTrigger } from '../../_common/floatMenuTrigger';
import { BaseBlockView } from '../../_common/baseBlockView';

export class TextBlockHeadView extends BaseBlockView {
    floatMenuTrigger: FloatMenuTrigger;

    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
        super(node, view, getPos);
        
        // 创建有序列表元素
        this.dom.classList.add('doc-textBlock-head');

        this.contentDOM = this.dom;

        this.floatMenuTrigger = new FloatMenuTrigger(this);
    }

    selectNode() {
      // 返回 false 表示不要应用选中样式
      return false;
    }

    destroy = () => {
      super.destroy();

      this.floatMenuTrigger.destroy();
    }
}