import { NodeSpec } from 'prosemirror-model';

export const headingSchema: Record<string, NodeSpec> = {
    heading: {
      content: "inline*",
      group: 'block',
      attrs: {
        level: { default: 1 },
        id: { default: '' },
      },
      parseDOM: [{ 
        tag: "h1",
        attrs: { level: 1 },
      }, { 
        tag: "h2", 
        attrs: { level: 2 },
      }, { 
        tag: "h3",
        attrs: { level: 3 },
      }, { 
        tag: "h4", 
        attrs: { level: 4 },
      }, { 
        tag: "h5",
        attrs: { level: 5 },
      }, { 
        tag: "h6",
        attrs: { level: 6 },
      }],
    },
  };