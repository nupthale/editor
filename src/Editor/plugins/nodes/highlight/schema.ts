import { nanoid } from 'nanoid';
import { NodeSpec, DOMOutputSpec, Attrs, Fragment, Mark } from 'prosemirror-model';

export const highlightSchema: Record<string, NodeSpec> = {
    highlight: {
      content: "block*",
      group: 'block',
      attrs: {
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "div.doc-highlight", 
        priority: 51,  // 提高优先级
        getAttrs(dom: any) {
          return {
            id: dom.getAttribute('data-id'),
          }
        },
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          class: "doc-highlight",
          'data-id': node.attrs.id,
        }, 0]
      },
      customTargetNode: (schema, attrs?: Attrs | null, content?: Fragment | Node | readonly Node[] | null, marks?: readonly Mark[]) => {
        const textBlock = schema.nodes.textBlock.create({ id: nanoid(8) }, []);

        return schema.nodes.highlight.create(
          { 
            ...attrs,
            id: attrs?.id ? attrs.id : nanoid(8),
          },
          (content as Node[])?.length ? content : (content as Fragment)?.size ? [content] : [textBlock],
          marks,
        );
      },
      customStartOffset: 1,
    },
  };