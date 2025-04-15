import { nanoid } from 'nanoid';
import { NodeSpec, DOMOutputSpec, Attrs, Fragment } from 'prosemirror-model';
import { Transaction } from 'prosemirror-state';
import { BaseBlockView } from '../_common/baseBlockView';


export const headingSchema: Record<string, NodeSpec> = {
    heading: {
      content: "inline*",
      group: 'block',
      attrs: {
        level: { default: 1 },
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "h1",
        attrs: { level: 1 },
      }, { 
        tag: "h2", 
        attrs: { level: 2 },
      }, { 
        tag: "h3",
        attrs: { level: 3 },
      }, { 
        tag: "h4", 
        attrs: { level: 4 },
      }, { 
        tag: "h5",
        attrs: { level: 5 },
      }, { 
        tag: "h6",
        attrs: { level: 6 },
      }],
      toDOM(node): DOMOutputSpec {
        return [`h${node.attrs.level}`, {
          class: "doc-heading",
        }, 0]
      },
      // schema, tr, srcNodeView, newAttrs
      customUpdateNodeType: (schema, tr: Transaction, srcNodeView: BaseBlockView, _attrs?: Attrs | null) => {
        const { from, to } = srcNodeView.range;
        const srcNode = srcNodeView.node;
        const marks = srcNode.marks;

        if (srcNode?.type.name === 'list' || srcNode?.type.name === 'textBlock') {
          const head = srcNode.children[0];
          const body = srcNode.children[1];

          // 创建新的 heading 节点
          const headingNode = schema.nodes.heading.create(
            { id: nanoid(8) }, 
            head.content, 
            marks || []
          );

          // 先删除原有内容
          // tr.deleteRange(from, to);
          
          // 插入 heading 和 body 内容
          tr.insert(
            from,
            Fragment.from([body])
          );
        }
      },
    },
  };