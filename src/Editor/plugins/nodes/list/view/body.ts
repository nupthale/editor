import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

export class ListBodyView implements NodeView {
    dom: HTMLElement;
    contentDOM: HTMLElement | null = null;

    constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {

        // 创建有序列表元素
        this.dom = document.createElement('div');
        this.dom.classList.add('doc-list-body');
        
        this.contentDOM = this.dom;
    }

    update(node: Node) {
        if (node.type !== this.node.type) return false;
        
        // 更新节点引用
        this.node = node;
        
        return true;
    }

    selectNode() {
        // 返回 false 表示不要应用选中样式
        return false;
    }
}