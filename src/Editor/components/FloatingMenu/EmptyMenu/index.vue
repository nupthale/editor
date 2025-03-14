<script lang="tsx">
import { defineComponent, PropType, toRef, Ref } from 'vue';
import { TextQuote, Heading1, Heading2, Heading3, List, ListOrdered } from 'lucide';
import { Menu } from 'ant-design-vue';

import { useUpdateBlockNodeType } from '../useUpdateBlockNodeType';
import { BaseBlockView } from '../../../plugins/nodes/_common/baseBlockView';
import LucideIcon from '../../LucideIcon/index.vue';

const MenuItem = Menu.Item;

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
            <div class="w-[230px] p-2">
                <Menu class="text-[#2b2f36] !border-none">
                    <MenuItem key="2" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 1 })}>
                        <div class="flex items-center">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={Heading1} width={20}></LucideIcon>
                            </span>
                            一级标题
                        </div>
                    </MenuItem>
                    <MenuItem key="3" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 2 })}>
                        <div class="flex items-center">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={Heading2} width={20}></LucideIcon>
                            </span>
                            二级标题
                        </div>
                    </MenuItem>
                    <MenuItem key="4" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('heading', { level: 3 })}>
                        <div class="flex items-center">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={Heading3} width={20}></LucideIcon>
                            </span>
                            三级标题
                        </div>
                    </MenuItem>
                    <MenuItem key="5" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                        <div class="flex items-center">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={ListOrdered} width={20}></LucideIcon>
                            </span>
                            有序列表
                        </div>
                    </MenuItem>
                    <MenuItem key="6" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                        <div class="flex items-center">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={List} width={20}></LucideIcon>
                            </span>
                            无序列表
                        </div>
                    </MenuItem>
                    <MenuItem key="6" class="!w-full !p-1 !m-0 !h-auto !min-h-auto !leading-none !rounded-[4px]" onClick={() => handleSelectType('highlight', {})}>
                        <div class="flex items-center highlightBlock">
                            <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                <LucideIcon icon={TextQuote} width={20} color="#994bff"></LucideIcon>
                            </span>
                            高亮块
                        </div>
                    </MenuItem>
                </Menu>
            </div>
        );
    }
});
</script>

<style scoped>
.highlightBlock {
    background-image: linear-gradient(135deg, #994bff 10%, #36cde1 90%);
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 500;
}
</style>