import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import { BaseBlockView } from '../../_common/baseBlockView';

export class TextBlockHeadView  extends BaseBlockView implements NodeView {
    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
        super(node, view, getPos);  
        
        // 创建有序列表元素
        this.dom.classList.add('doc-textBlock-head');

        this.contentDOM = this.dom;

        this.initFloatMenuEvt();
    }

    update(node: Node) {
        if (node.type !== this.node.type) return false;
      
        // 更新节点引用
        this.node = node;

        return true;
    }

    ignoreMutation(record: ViewMutationRecord): boolean {
        const noneEditables = this.dom.querySelectorAll('[contentEditable=false]');
    
        if (noneEditables?.length) {
          for (let i = 0; i < noneEditables.length; i++) {
            if (noneEditables[i].contains(record.target) || record.target === noneEditables[i]) {
              return true;
            }
          }
        }
        
        return false;
    }

    selectNode() {
      // 返回 false 表示不要应用选中样式
      return false;
    }
}