import { createApp} from 'vue';

import { Node } from 'prosemirror-model';
import { EditorView, NodeView, ViewMutationRecord } from 'prosemirror-view';

import DocMeta from '../../../components/DocMeta/index.vue';

import './index.less';

export class TitleView implements NodeView {
  dom: HTMLElement;
  contentDOM: HTMLElement;
  node: Node;
  view: EditorView;
  app: any;

  constructor(node: Node, view: EditorView) {
    this.node = node;
    this.view = view;

    // 创建容器元素
    this.dom = document.createElement('div');
    this.dom.className = 'doc-title-container';
    this.dom.setAttribute('data-id', node.attrs.id);

    // 创建标题元素
    const titleElement = document.createElement('h1');
    titleElement.className = 'doc-title';
    titleElement.setAttribute('data-placeholder', node?.attrs?.placeholder || '请输入标题');

    // 标题头部操作区
    const titleHeader = document.createElement('div');
    titleHeader.className = 'doc-title-header';
    titleHeader.contentEditable = 'false';

    // 创建用户信息容器元素
    const metaContainer = document.createElement('div');
    metaContainer.className = 'doc-metas';
    metaContainer.contentEditable = 'false';

    // 设置contentDOM为标题元素
    this.contentDOM = titleElement;

    // 组装DOM结构
    this.dom.appendChild(titleHeader);
    this.dom.appendChild(titleElement);
    this.dom.appendChild(metaContainer);

    // 使用createApp创建新的Vue应用实例来渲染DocMeta组件
    if (!this.app) {
      this.app = createApp(DocMeta);
      this.app.mount(metaContainer);

       // 添加样式
      const style = document.createElement('style');
      style.textContent = `
        .doc-title-container {
          padding: 20px 0 22px;
        }
        .doc-title-header {
          height: 28px;
        }  
        .doc-metas {
          display: flex;
          align-items: center;
          padding: 12px 0 8px;
        }
      `;
      document.head.appendChild(style);
    }
  }

  update(node: Node) {
    if (node.type !== this.node.type) return false;
    this.node = node;
    return true;
  }

  ignoreMutation(record: ViewMutationRecord): boolean {
    // 忽略metaContainer及其子元素的修改
    const metaContainer = this.dom.querySelectorAll('[contentEditable=false]');

    if (metaContainer?.length) {
      for (let i = 0; i < metaContainer.length; i++) {
        if (metaContainer[i].contains(record.target) || record.target === metaContainer[i]) {
          return true;
        }
      }
    }
    
    return false;
  }

  destroy() {
    // 清理DOM元素
    if (this.app) {
      this.app.unmount();
    }
  }
}

