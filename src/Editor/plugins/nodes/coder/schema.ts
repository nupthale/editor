import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const coderSchema: Record<string, NodeSpec> = {
    coder: {
      group: 'block',
      content: 'text*',
      attrs: {
        id: { default: '' },
        language: { default: 'javascript' },
      },
      parseDOM: [{ 
        tag: "div.doc-coder", 
        getAttrs(dom: any) {
          return {
            id: dom.getAttribute('data-id'),
            language: dom.getAttribute('data-language'),
          }
        },
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          class: "doc-coder",
          'data-id': node.attrs.id,
          'data-language': node.attrs.language,
        }, 0]
      },
    },
  };