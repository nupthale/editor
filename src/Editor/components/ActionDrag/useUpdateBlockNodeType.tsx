import { Ref } from 'vue';
import { BaseBlockView } from '../../plugins/nodes/_common/baseBlockView';
import { EditorView } from 'prosemirror-view';

export const useUpdateBlockNodeType = (
    viewRef: Ref<EditorView | null>,
    crtNodeViewRef: Ref<BaseBlockView | null>,
) => {

    const handleSelectType = (targetType: string, attrs?: Record<string, any>) => {
        
        const view = viewRef.value;
        const state = view?.state;
        const srcNodeView = crtNodeViewRef.value;
        
        if (!viewRef.value || !state || !srcNodeView) return;
        
        const schema = state.schema;
        const targetTypeSchema = schema.nodes[targetType];

        const tr = state.tr;
        const { from, to } = srcNodeView.range;

        // 找到该位置的 DOM 元素
        const dom = view.domAtPos(from)?.node;
        console.log('from:', from, 'to:', to, dom);

        const transaction = tr.deleteRange(from, to);

        view.dispatch(
            transaction
            // tr.replaceRangeWith(from, to, targetTypeSchema.create({
            //     ...attrs,
            // })),
        );
    }

    return {
        handleSelectType,
    };
}