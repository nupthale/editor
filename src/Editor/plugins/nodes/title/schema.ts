import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const titleSchema: Record<string, NodeSpec> = {
    title: {
      content: "inline*",
      defining: true,
      attrs: {
        id: { default: "" },
        placeholder: { default: "请输入标题" }
      },
      parseDOM: [{ 
        tag: "h1", 
        attrs: {
          class: "doc-title",
          "data-placeholder": "请输入标题",
        },
        getAttrs(dom: any) {
          return {
            id: dom.getAttribute('data-id') || '',
          };
        }
      }],
      toDOM(node): DOMOutputSpec { 
        return ["h1", { 
          'data-id': node.attrs.id,
          class: "doc-title", 
          "data-placeholder": node.attrs.placeholder
        }, 0] 
      }
    },
  };