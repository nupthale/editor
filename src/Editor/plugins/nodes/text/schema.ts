import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const textBlockSchema: Record<string, NodeSpec> = {
    textBlock_head: {
        content: "inline*",
        group: "block",
        parseDOM: [{
            tag: "div",
            attrs: {
                class: "doc-textBlock-head",
            },
        }],
        toDOM() {
            return ["div", {
                class: "doc-textBlock-head",
            }, 0];
        }
    },
    textBlock_body: {
        content: 'block*',
        group: 'block',
        parseDOM: [{
          tag: "div",
          attrs: {
            class: "doc-textBlock-body",
          },
        }],
        toDOM() {
          return ["div", {
            class: "doc-textBlock-body",
          }, 0];
        }
    },
    textBlock: {
      content: "textBlock_head textBlock_body?",
      defining: true,
      group: 'block',
      attrs: {
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "div", 
        attrs: {
          class: "doc-textBlock",
          id: (dom: any) => dom.getAttribute('data-id'),
        } 
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          'data-id': node.attrs.id,
          class: "doc-textBlock",
        }, 0]
      },
    },
  };