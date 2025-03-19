import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

export class ListHeadView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | null = null;

    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
        // 创建有序列表元素
        this.dom = document.createElement('div');
        this.dom.classList.add('doc-list-head');
        
        const wrapDOM = document.createElement('div');
        wrapDOM.classList.add('flex-1', 'flex', 'items-start');

        const indexDOM = document.createElement('div');
        indexDOM.classList.add('doc-list-index');
        indexDOM.innerHTML = '1.';
        indexDOM.contentEditable = 'false';

        const contentDOM = document.createElement('div');
        contentDOM.classList.add('doc-list-content');

        wrapDOM.appendChild(indexDOM);
        wrapDOM.appendChild(contentDOM);

        this.contentDOM = contentDOM;

        this.dom.appendChild(wrapDOM);
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
}