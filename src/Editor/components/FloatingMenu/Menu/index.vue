<script lang="tsx">
import { defineComponent, PropType, toRef, Ref } from 'vue';
import { 
    Type, 
    Heading1, 
    Heading2, 
    Heading3, 
    Heading4,
    Heading5,
    Heading6,
    List,
    ListOrdered,
    ListTodo,
    ListCollapse,
    Trash2,
    Copy,
    MessageSquareText,
    Image, 
    Video,
    Code,
    InspectionPanel,
    Globe,
    Columns2,
    Columns3,
    Columns4,
    SquarePlus,
} from 'lucide';
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
            <div class="w-[230px] doc-floatMenusContainer">
                <div class="text-[#2B3036] !border-none">
                    <div class="grid grid-cols-6 gap-y-3 p-3">
                        <Tooltip title="正文">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('textBlock')}
                            >
                                <LucideIcon icon={Type} width={20} color="#2B3036"></LucideIcon>
                                </TextButton>
                        </Tooltip>

                        <Tooltip title="无序列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={List} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="有序列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListOrdered} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="任务列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListTodo} width={22} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="折叠列表">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={ListCollapse} width={22} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="代码块">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('code', { level: 6 })}>
                                <LucideIcon icon={Code} width={20} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="一级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 1 })}
                            >
                                <LucideIcon icon={Heading1} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="二级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 2 })}
                            >
                                <LucideIcon icon={Heading2} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="三级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 3 })}
                            >
                                <LucideIcon icon={Heading3} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="四级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 4 })}>
                                <LucideIcon icon={Heading4} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="五级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 5 })}>
                                <LucideIcon icon={Heading5} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>

                        <Tooltip title="六级标题">
                            <TextButton 
                                size="small" 
                                class="flex items-center justify-center !w-[26px] !h-[26px]" 
                                onClick={() => handleSelectType('header', { level: 6 })}>
                                <LucideIcon icon={Heading6} width={24} color="#2B3036"></LucideIcon>
                            </TextButton>
                        </Tooltip>
                    </div>
                    <div class="doc-floatMenu-divier"></div>
                    <div class="doc-floatMenu-title">常用</div>
                    <div class="m-2">
                        <div 
                            class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]"
                            onClick={() => handleSelectType('image', {})}
                        >
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Image} width={20} color="#FF7237"></LucideIcon>
                                </span>
                                图片
                            </div>
                        </div>
                        <div 
                            class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]"
                            onClick={() => handleSelectType('video', {})}
                        >
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Video} width={20} color="#25CB71"></LucideIcon>
                                </span>
                                视频
                            </div>
                        </div>
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={InspectionPanel} width={20} color="#00B6FF"></LucideIcon>
                                </span>
                                高亮块
                            </div>
                        </div>
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Globe} width={20} color="#874FFF"></LucideIcon>
                                </span>
                                内嵌网页
                            </div>
                        </div>
                    </div>

                    <div class="doc-floatMenu-divier"></div>
                    <div class="doc-floatMenu-title">分栏布局</div>
                    <div class="m-2">
                        <div 
                            class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]"
                            onClick={() => handleSelectType('image', {})}
                        >
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Columns2} width={20}></LucideIcon>
                                </span>
                                2栏布局
                            </div>
                        </div>
                        <div 
                            class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]"
                            onClick={() => handleSelectType('video', {})}
                        >
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Columns3} width={20}></LucideIcon>
                                </span>
                                3栏布局
                            </div>
                        </div>
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Columns4} width={20}></LucideIcon>
                                </span>
                                4栏布局
                            </div>
                        </div>
                    </div>

                    <div class="doc-floatMenu-divier"></div>
                    <div class="m-2">
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={MessageSquareText} width={20}></LucideIcon>
                                </span>
                                评论
                            </div>
                        </div>
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Copy} width={20}></LucideIcon>
                                </span>
                                复制
                            </div>
                        </div>
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={Trash2} width={20}></LucideIcon>
                                </span>
                                删除
                            </div>
                        </div>
                    </div>

                    <div class="doc-floatMenu-divier"></div>
                    <div class="m-2">
                        <div class="doc-floatingMenu-menuItem !w-full !p-1 !h-auto !min-h-auto !leading-none !rounded-[4px]">
                            <div class="flex items-center">
                                <span class="mr-4 inline-flex items-center justify-center w-[24px] h-[24px]">
                                    <LucideIcon icon={SquarePlus} width={20}></LucideIcon>
                                </span>
                                在下方添加
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

.doc-floatMenu-title {
    margin: 12px 14px 6px;
    font-size: 12px;
}

.doc-floatMenusContainer {
    max-height: 620px;
    overflow-y: overlay;
}
</style>