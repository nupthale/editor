import { Ref } from 'vue';
import { Selection } from 'prosemirror-state';
import { BaseBlockView } from '../../plugins/nodes/_common/baseBlockView';

import { contextStore } from '../../context';
import { blockMouseLeave$ } from '../../event';


export const useUpdateBlockNodeType = (
    crtNodeViewRef: Ref<BaseBlockView | null>,
) => {

    const handleSelectType = (targetType: string, attrs?: Record<string, any>) => {
        const view = contextStore.getState().editorView;
        const state = view?.state;
        const srcNodeView = crtNodeViewRef.value;
        
        if (!view || !state || !srcNodeView) return;
        
        const schema = state.schema;
        const targetTypeSchema = schema.nodes[targetType];
       
        const tr = state.tr;
        const { from, to } = srcNodeView.range;

        const targetNode = targetTypeSchema.create({ 
            ...srcNodeView.node.attrs, 
            ...attrs, 
        }, srcNodeView.node.content, srcNodeView.node.marks);
       
        // 确保目标节点有效
        if (!targetNode) {
            console.error('Failed to create target node');
            return;
        }

        tr.replaceRangeWith(
            from, 
            to, 
            targetNode,
        );

        tr.setSelection(
            Selection.near(tr.doc.resolve(from))
        );

        view.dispatch(tr);

        view.focus();

        // 直接隐藏actionDrag, 要不然定位不准确
        blockMouseLeave$.next({ delay: 0 });
    }

    return {
        handleSelectType,
    };
}