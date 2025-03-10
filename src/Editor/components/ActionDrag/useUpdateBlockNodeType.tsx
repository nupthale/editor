import { Ref } from 'vue';
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

        const targetNode = targetTypeSchema.create({ ...attrs }, srcNodeView.node.content, srcNodeView.node.marks);
       
        // 确保目标节点有效
        if (!targetNode) {
            console.error('Failed to create target node');
            return;
        }

        view.dispatch(
            tr.replaceRangeWith(
                from, 
                to, 
                targetNode,
            ),
        );

        console.log('Current document after dispatch:', view.state.doc.toJSON());
        // 直接隐藏actionDrag, 要不然定位不准确
        blockMouseLeave$.next({ delay: 0 });
    }

    return {
        handleSelectType,
    };
}