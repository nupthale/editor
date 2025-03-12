<script lang="tsx">
import { v4 as uuidv4 } from 'uuid';
import { defineComponent, onMounted, onUnmounted, ref, provide } from 'vue';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { plugins } from './Editor/plugins';
import { schema } from './Editor/plugins/schema';

import FloatingMenu from './Editor/components/FloatingMenu/index.vue';
import BubbleMenu from './Editor/components/BubbleMenu/index.vue';
import Catalog from './Editor/components/Catalog/index.vue';
import { contextStore } from './Editor/context';
import { docChanged$ } from './Editor/event';

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
          schema.node('title', null, [schema.text('123👨👩👧👦')]),
          schema.node('body', null, [
            schema.node('heading', { level: 1, id: uuidv4() }, [schema.text('标题1')]),
            schema.node('heading', { level: 3, id: uuidv4() }, [schema.text('标题2')]),
            schema.node('heading', { level: 4, id: uuidv4() }, [schema.text('标题3')]),
            schema.node('heading', { level: 3, id: uuidv4() }, [schema.text('标题4')]),
            schema.node('heading', { level: 1, id: uuidv4() }, [schema.text('标题5')]),
            schema.node('heading', { level: 6, id: uuidv4() }, [schema.text('标题6')]),
            schema.node('paragraph', { id: uuidv4() }, [schema.text('1. 任务处理信息展示优化，用户可以点击列表中的任务或者操作列的处理按钮，触发任务详情的展示。')]),
            schema.node('paragraph', { id: uuidv4() }, [schema.text('2. 客户信息展示优化，将原有信息进行分类，按模块在左侧边栏展示。')]),
          ]),
        ])
      });

      // 创建 EditorView
      view = new EditorView(editorRef.value, {
        state,
        dispatchTransaction(transaction) {
          // 监听文档变化
          const newState = view!.state.apply(transaction);
          view!.updateState(newState);

          if (transaction.docChanged) {
            // 在这里处理文档变化
            docChanged$.next();
          }
        },
      });

      contextStore.getState().setEditorView(view);

      // 初始化
      docChanged$.next();
    });

    onUnmounted(() => {
      if (view) {
        view.destroy();
      }
    });

    return () => (
      <div>
        <div class="sticky top-0 h-[64px] border-b-[1px] border-[#dee0e3] border-solid bg-white z-10"></div>

        <div class="h-[278px] overflow-hidden bg-[auto_591px] bg-center" style={{ backgroundImage: `url(${headerImage})`}}>
        </div>

        <div class="flex">
          {/* 左侧目录 */}
          <Catalog />

          <div class="w-[820px] mx-auto">
              <div ref={editorRef} class="min-h-[580px] prose max-w-none" />
          </div>
        </div>

        <FloatingMenu />

        <BubbleMenu />
      </div>
    );
  }
});
</script>./Editor/components/FloatingMenu/index.vue