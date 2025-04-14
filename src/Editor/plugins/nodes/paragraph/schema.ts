import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const paragraphSchema: Record<string, NodeSpec> = {
    paragraph_head: {
        content: "inline*",
        group: "block",
        parseDOM: [{
            tag: "div",
            attrs: {
                class: "doc-paragraph-head",
            },
        }],
        toDOM() {
            return ["div", {
                class: "doc-paragraph-head",
            }, 0];
        }
    },
    paragraph_body: {
        content: 'block*',
        group: 'block',
        parseDOM: [{
          tag: "div",
          attrs: {
            class: "doc-paragraph-body",
          },
        }],
        toDOM() {
          return ["div", {
            class: "doc-paragraph-body",
          }, 0];
        }
    },
    paragraph: {
      content: "paragraph_head paragraph_body?",
      defining: true,
      group: 'block',
      attrs: {
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "div", 
        attrs: {
          class: "doc-paragraph",
          id: (dom: any) => dom.getAttribute('data-id'),
        } 
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          'data-id': node.attrs.id,
          class: "doc-paragraph",
        }, 0]
      },
    },
  };