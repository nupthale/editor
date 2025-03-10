<script lang="tsx">
import { defineComponent, onMounted, onUnmounted, ref, provide } from 'vue';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { plugins } from './Editor/plugins';
import { schema } from './Editor/plugins/schema';

import ActionDrag from './Editor/components/ActionDrag/index.vue';

import './Editor/theme/index.less';
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
          schema.node('title', null, [schema.text('123')]),
          schema.node('body', null, [
            schema.node('heading', { level: 1 }, [schema.text('标题1')]),
            schema.node('heading', { level: 2 }, [schema.text('标题2')]),
            schema.node('heading', { level: 3 }, [schema.text('标题3')]),
            schema.node('heading', { level: 4 }, [schema.text('标题4')]),
            schema.node('heading', { level: 5 }, [schema.text('标题5')]),
            schema.node('heading', { level: 6 }, [schema.text('标题6')]),
            schema.node('paragraph', null, [schema.text('开始编辑内容...')]),
            schema.node('paragraph', null, [schema.text('开始编辑内容...')]),
          ]),
        ])
      });

      // 创建 EditorView
      view = new EditorView(editorRef.value, {
        state,
      });
    });

    onUnmounted(() => {
      if (view) {
        view.destroy();
      }
    });

    return () => (
      <div>
        <div class="sticky top-0 h-[64px] border-b-[1px] border-[#dee0e3] border-solid bg-white z-10"></div>

        <div class="h-[150px] overflow-hidden bg-[auto_591px] bg-center" style={{ backgroundImage: `url(${headerImage})`}}>
        </div>

        <div class="w-[820px] mx-auto">
            <div ref={editorRef} class="min-h-[580px] prose max-w-none" />
        </div>

        <ActionDrag />
      </div>
    );
  }
});
</script>