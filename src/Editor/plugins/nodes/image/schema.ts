import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

import { ImageAlignEnum } from './interface';

export const imageSchema: Record<string, NodeSpec> = {
    image: {
      group: 'block',
      atom: true,
      selectable: false,
      isolating: true,
      attrs: {
        id: { default: '' },
        src: { default: '' },
        width: { default: 100 },
        align: { default: ImageAlignEnum.LEFT },
      },
      parseDOM: [{ 
        tag: "div.doc-image", 
        getAttrs(dom: any) {
          return {
            id: dom.getAttribute('data-id'),
            width: dom.getAttribute('data-width'),
            align: dom.getAttribute('data-align'),
            src: dom.getAttribute('data-src'),
          }
        },
      }],
      toDOM(node): DOMOutputSpec {
        return ["div", {
          class: "doc-image",
          'data-id': node.attrs.id,
          'data-width': node.attrs.width,
          'data-height': node.attrs.height,
          'data-align': node.attrs.align,
          'data-src': node.attrs.src,
        }, 0]
      },
    },
  };