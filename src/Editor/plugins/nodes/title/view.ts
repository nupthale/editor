import { createApp} from 'vue';

import { Node } from 'prosemirror-model';
import { EditorView, NodeView } from 'prosemirror-view';

import DocMeta from '../../../components/DocMeta/index.vue';

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
    this.dom.className = 'title-container';

    // 创建标题元素
    const titleElement = document.createElement('h1');
    titleElement.className = 'doc-title';
    titleElement.setAttribute('data-placeholder', node?.attrs?.placeholder || '请输入标题');

    // 创建用户信息容器元素
    const metaContainer = document.createElement('div');
    metaContainer.className = 'doc-metas';
    metaContainer.contentEditable = 'false';

    // 设置contentDOM为标题元素
    this.contentDOM = titleElement;

    // 组装DOM结构
    this.dom.appendChild(titleElement);
    this.dom.appendChild(metaContainer);

    // 使用createApp创建新的Vue应用实例来渲染DocMeta组件
    if (!this.app) {
      this.app = createApp(DocMeta);
      this.app.mount(metaContainer);

       // 添加样式
      const style = document.createElement('style');
      style.textContent = `
        .title-container {
          padding: 20px 0 22px;
        }
        .doc-metas {
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

  ignoreMutation(record: MutationRecord): boolean {
    // 忽略metaContainer及其子元素的修改
    const metaContainer = this.dom.querySelector('.doc-metas');
    if (metaContainer && metaContainer.contains(record.target)) {
      return true;
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

