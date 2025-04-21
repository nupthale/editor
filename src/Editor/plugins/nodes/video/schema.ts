import { NodeSpec, DOMOutputSpec } from 'prosemirror-model';

import { VideoAlignEnum } from './interface';

export const videoSchema: Record<string, NodeSpec> = {
    video: {
      group: 'block',
      selectable: false,
      isolating: true,
      attrs: {
        id: { default: '' },
        src: { default: '' },
        width: { default: 0},
        align: { default: VideoAlignEnum.LEFT },
      },
      parseDOM: [{ 
        tag: "div.doc-video", 
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
          class: "doc-video",
          'data-id': node.attrs.id,
          'data-width': node.attrs.width,
          'data-height': node.attrs.height,
          'data-align': node.attrs.align,
          'data-src': node.attrs.src,
        }, 0]
      },
    },
  };