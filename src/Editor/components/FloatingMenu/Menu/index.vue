<script lang="tsx">
import { defineComponent, PropType, toRef, Ref } from 'vue';
import { Type, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, List, ListOrdered, ListTodo, ListCollapse, Trash2, Copy, MessageSquareText } from 'lucide';
import { Tooltip } from 'ant-design-vue';
import { TextButton } from '@zsfe/zsui';

import { useUpdateBlockNodeType } from '../useUpdateBlockNodeType';
import { BaseBlockView } from '../../../plugins/nodes/_common/baseBlockView';
import LucideIcon from '../../LucideIcon/index.vue';

export default defineComponent({
    props: {
        nodeView: {
            type: Object as PropType<BaseBlockView | null>
        }
    },
    setup(props) {
        const { handleSelectType } = useUpdateBlockNodeType(
            toRef(props, 'nodeView') as Ref<BaseBlockView | null>,
        );

        return () => (
            <div class="w-[230px]">
                <div class="text-[#2b2f36] !border-none">
                    <div class="grid grid-cols-6 gap-y-3 p-3">
                        <Tooltip title="正文">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('textBlock')}
                            >
                                <LucideIcon icon={Type} width={20} color="#2b2f36"></LucideIcon>
                                </TextButton>
                        </Tooltip>

                        <Tooltip title="一级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 1 })}
                            >
                                <LucideIcon icon={Heading1} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="二级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 2 })}
                            >
                                <LucideIcon icon={Heading2} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="三级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 3 })}
                            >
                                <LucideIcon icon={Heading3} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="四级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 4 })}>
                                <LucideIcon icon={Heading4} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="五级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 5 })}>
                                <LucideIcon icon={Heading5} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="六级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={Heading6} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="有序列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListOrdered} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="无序列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={List} width={24} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="任务列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListTodo} width={22} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="折叠列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListCollapse} width={22} color="#2b2f36"></LucideIcon>
                            </TextButton>
                        </Tooltip>
                    </div>
                    <div class="doc-floatMenu-divier"></div>
                    <div class="m-2">
                        <div key="6" class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={MessageSquareText} width={20}></LucideIcon>
                                </span>
                                评论
                            </div>
                        </div>
                        <div key="6" class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Copy} width={20}></LucideIcon>
                                </span>
                                复制
                            </div>
                        </div>
                        <div key="6" class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Trash2} width={20}></LucideIcon>
                                </span>
                                删除
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
</script>

<style scoped>
.doc-floatMenu-divier {
    width: 100%;
    height: 1px;
    background: #dee0e3;
    margin: 4px 0;
}

.doc-floatingMenu-menuItem {
    cursor: pointer;
    margin: 4px 0;
}

.doc-floatingMenu-menuItem:hover {
    background: rgba(0, 0, 0, 0.06);
    
}
</style>