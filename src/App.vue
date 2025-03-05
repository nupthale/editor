<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, ref, provide } from 'vue';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { plugins } from './Editor/plugins';
import { schema } from './Editor/plugins/schema';

import './Editor/theme.less';
import headerImage from './header.png';

export default defineComponent({
  name: 'App',
  setup() {
    const editorRef = ref<HTMLElement | null>(null);
    let view: EditorView | null = null;

    // 提供应用上下文
    provide('appContext', {
      // 这里可以添加需要共享的数据和方法
    });

    onMounted(() => {
      if (!editorRef.value) return;

      // 创建初始 EditorState
      const state = EditorState.create({
        schema,
        plugins: plugins(schema),
        doc: schema.node('doc', null, [
          schema.node('title', null, [schema.text('你好，我是标题')]),
          schema.node('block', null, [schema.text('开始编辑内容...')]),
        ])
      });

      // 创建 EditorView
      view = new EditorView(editorRef.value, {
        state,
        dispatchTransaction(transaction) {
          const newState = view!.state.apply(transaction);
          view!.updateState(newState);
        }
      });
    });

    onUnmounted(() => {
      if (view) {
        view.destroy();
      }
    });

    return () => (
      <div>
        <div class="h-[150px] overflow-hidden bg-[auto_591px] bg-center" style={{ backgroundImage: `url(${headerImage})`}}>
        </div>

        <div class="w-[820px] mx-auto">
            <div ref={editorRef} class="min-h-[580px] prose max-w-none" />
        </div>
      </div>
    );
  }
});
</script>