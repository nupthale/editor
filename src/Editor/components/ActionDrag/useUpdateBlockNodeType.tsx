import { Ref } from 'vue';
import { BaseBlockView } from '../../plugins/nodes/_common/baseBlockView';

import { contextStore } from '../../context';

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

        // 找到该位置的 DOM 元素
        const dom = view.domAtPos(from)?.node;

        view.dispatch(
            tr.replaceRangeWith(from, to, targetTypeSchema.create({
                ...attrs,
            }, srcNodeView.node.content, srcNodeView.node.marks)),
        );
    }

    return {
        handleSelectType,
    };
}