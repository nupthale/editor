import { v4 as uuidv4 } from 'uuid';
import { NodeSpec, DOMOutputSpec, Attrs, Fragment, Mark } from 'prosemirror-model';

export const highlightSchema: Record<string, NodeSpec> = {
    highlight: {
      content: "block+",
      group: 'block',
      attrs: {
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "div.doc-highlight", 
        priority: 51,  // 提高优先级
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          class: "doc-highlight",
        }, 0]
      },
      customCreate: (schema, attrs?: Attrs | null, content?: Fragment | Node | readonly Node[] | null, marks?: readonly Mark[]) => {
        const paragraph = schema.nodes.paragraph.create({ id: uuidv4() }, []);

        return schema.nodes.highlight.create(
          { 
            ...attrs,
            id: attrs?.id ? attrs.id : uuidv4(),
          },
          (content as Node[])?.length ? content : (content as Fragment)?.size ? [content] : [paragraph],
          marks,
        );
      },
      customStartOffset: 1,
    },
  };