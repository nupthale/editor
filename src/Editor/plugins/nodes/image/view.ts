import { Node } from 'prosemirror-model';
import { EditorView } from 'prosemirror-view';

import { BaseBlockView } from '../_common/baseBlockView';
import { FloatMenuTrigger } from '../_common/floatMenuTrigger'

import { Image } from './components/Image/index';

import './index.less';

export class ImageView extends BaseBlockView {
  floatMenuTrigger: FloatMenuTrigger;

  image: Image;
  imageDOM: HTMLElement;
  containerDOM: HTMLElement;
  leftResizerDOM: HTMLElement;
  rightResizerDOM: HTMLElement;

  resizing: 'left' | 'right' | null = null;
  resizeX = 0;

  constructor(public node: Node, public view: EditorView, public getPos: () => number | undefined) {
    super(node, view, getPos);

    // 创建容器元素
    this.dom.classList.add('doc-image');
    this.dom.contentEditable = 'false';
    
    // 对于完全由Vue管理的组件，设置contentDOM为null
    this.contentDOM = null;

    this.containerDOM = document.createElement('div');
    this.containerDOM.classList.add('doc-image-container');
    this.containerDOM.contentEditable = 'false';

    this.imageDOM = document.createElement('div');

    this.containerDOM.appendChild(this.imageDOM);

    this.leftResizerDOM = document.createElement('div');
    this.leftResizerDOM.classList.add('doc-image-resizer', 'left');
    this.containerDOM.appendChild(this.leftResizerDOM);

    this.rightResizerDOM = document.createElement('div');
    this.rightResizerDOM.classList.add('doc-image-resizer', 'right');
    this.containerDOM.appendChild(this.rightResizerDOM);

    // 组装DOM结构
    this.dom.appendChild(this.containerDOM);

    this.floatMenuTrigger = new FloatMenuTrigger(this);

    this.image = new Image(this.imageDOM);
    this.image.render(node.attrs);

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
    this.dom.setAttribute('data-width', node.attrs.width);
    this.dom.setAttribute('data-align', node.attrs.align);
    this.dom.setAttribute('data-src', node.attrs.src);

    if (this.containerDOM) {
      this.containerDOM.style.width = `${node.attrs.width}px`;
    }
  }

  toggleShowResizer = () => {
    if (this.resizing) {
      this.leftResizerDOM.style.opacity = '1';
      this.rightResizerDOM.style.opacity = '1';
    } else {
      this.leftResizerDOM.style.opacity = '0';
      this.rightResizerDOM.style.opacity = '0';
    }
  }

  startResizeLeft = (e) => {
    this.resizing = 'left';
   
    this.resizeX = e.clientX;

    this.toggleShowResizer();
  }

  startResizeRight = (e) => {
    this.resizing = 'right';

    this.resizeX = e.clientX;

    this.toggleShowResizer();
  }

  endResize = () => {
    this.resizing = null;
    
    this.toggleShowResizer();
  }

  resize = (e) => {
    if (!this.resizing) return;


    const deltaX = this.resizing === 'left' ? this.resizeX - e.clientX : e.clientX - this.resizeX;
    this.resizeX = e.clientX;

    const pos = this.getPos();
    if (pos === undefined) return;

    // 计算新的宽度
    const currentWidth = this.node.attrs.width || 100;
    const newWidth = Math.max(100, Math.min(820, currentWidth + deltaX)); // 限制最小50px，最大800px
    console.info('#newWidth', newWidth);

    // 更新节点属性
    const tr = this.view.state.tr;
    tr.setNodeAttribute(pos, 'width', newWidth);
    this.view.dispatch(tr);
  }

  initEvt = () => {
    this.leftResizerDOM.addEventListener('mousedown', this.startResizeLeft);
    this.rightResizerDOM.addEventListener('mousedown', this.startResizeRight);
    document.addEventListener('mousemove', this.resize);
    document.addEventListener('mouseup', this.endResize);
  }

  destroy() {
    this.floatMenuTrigger.destroy();

    this.leftResizerDOM.removeEventListener('mousedown', this.startResizeLeft);
    this.rightResizerDOM.removeEventListener('mousedown', this.startResizeRight);
    document.removeEventListener('mousemove', this.resize);
    document.removeEventListener('mouseup', this.endResize);
  }
}

