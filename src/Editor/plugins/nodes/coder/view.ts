import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView } from '../_common/baseBlockView';
import { FloatMenuTrigger } from '../_common/floatMenuTrigger'

import { Coder } from './components/Coder/index';

import './index.less';

export class CoderView extends BaseBlockView {
  floatMenuTrigger: FloatMenuTrigger;

  coder: Coder;
  coderDOM: HTMLElement;
  containerDOM: HTMLElement;

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-coder');
    
    this.contentDOM = null;

    this.containerDOM = document.createElement('div');
    this.containerDOM.classList.add('doc-coder-container');
    this.containerDOM.contentEditable = 'false';

    this.coderDOM = document.createElement('div');
    this.coderDOM.classList.add('w-full');

    this.containerDOM.appendChild(this.coderDOM);

    // 组装DOM结构
    this.dom.appendChild(this.containerDOM);

    this.floatMenuTrigger = new FloatMenuTrigger(this);

    this.coder = new Coder(this.coderDOM);
    this.coder.render(node.textContent || '', node.attrs.language);

    this.initEvt();
    this.updateAttrs(node);
  }

  selectNode() {
    // 返回 false 表示不要应用选中样式
    return false;
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;

    if (!this.containerDOM) return false;

    this.updateAttrs(node);

    this.node = node; // 更新节点
    return true;
  }

  updateAttrs = (node: Node) => {
    this.dom.setAttribute('data-id', node.attrs.id);
    this.dom.setAttribute('data-lang', node.attrs.language);
  }

  updateCode = (code: string) => {
    const pos = this.getPos();
    if (pos === undefined) return;

    const tr = this.view.state.tr;
    
    const textNode = this.node.type.schema.text(code);
    debugger;
    // 替换整个内容
    tr.replaceWith(
      pos + 1,  // 内容开始位置
      pos + 1 + this.node.content.size,  // 内容结束位置
      textNode,
    );
    
    this.view.dispatch(tr);
  }

  updateLanguage = (lang: string) => {
    const pos = this.getPos();
    if (pos === undefined) return;
    const tr = this.view.state.tr;

    tr.setNodeMarkup(pos, undefined, {
      ...this.node.attrs,
      language: lang,
    });
    this.view.dispatch(tr);
  }

  initEvt = () => {
    this.coder.on('changeLanguage', (lang) => this.updateLanguage(lang));
    this.coder.on('changeCode', (code) => this.updateCode(code));
  }

  // 添加 stopEvent 方法
  stopEvent = () => {
    // 返回 true 表示阻止事件传递给 ProseMirror
    return true;
  }

  destroy() {
    this.floatMenuTrigger.destroy();

    this.coder.destory();
  }
}

