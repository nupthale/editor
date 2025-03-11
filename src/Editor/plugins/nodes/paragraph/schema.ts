import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const paragraphSchema: Record<string, NodeSpec> = {
    paragraph: {
      content: "inline*",
      defining: true,
      group: 'block',
      attrs: {
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "p", 
        attrs: {
          class: "doc-paragraph",
        } 
      }],
    },
  };