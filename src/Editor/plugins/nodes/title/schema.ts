import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

export const titleSchema: Record<string, NodeSpec> = {
    title: {
      content: "text*",
      defining: true,
      attrs: {
        placeholder: { default: "请输入标题" }
      },
      parseDOM: [{ 
        tag: "h1", 
        attrs: { 
          class: "doc-title",
          "data-placeholder": "请输入标题"
        } 
      }],
      toDOM(node): DOMOutputSpec { 
        return ["h1", { 
          class: "doc-title", 
          "data-placeholder": node.attrs.placeholder
        }, 0] 
      }
    },
  };