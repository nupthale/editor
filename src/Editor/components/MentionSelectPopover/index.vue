<script lang="tsx">
import { defineComponent } from 'vue';
import { User } from '@zsfe/zsui';

import Popover from '../Popover/index.vue';

import { schema } from '../../plugins/schema/index';
import { contextStore } from '../../context';
import { MentionTypeEnum, PopoverTypeEnum } from '../../interface';
import { hidePopover$ } from '../../event';

export default defineComponent({
    setup(_props) {

        const users = [
            { username: '张三', userId: '1', department: '统计分析部' },
            { username: '李四', userId: '2', department: '法务部' },
            { username: '王五', userId: '2', department: '商务部' },
        ];

        const handleSelect = (user) => {
            const editorView = contextStore.getState().editorView;

            if (!editorView) return;

            const { state, dispatch } = editorView;
            const { selection, tr } = state;
        
            // 将当前selection位置替换为MentionNode
            const { from, to } = selection;
            const mentionNode = schema.nodes.mention.create({
                type: MentionTypeEnum.USER,
                info: user,
            });

            tr.replaceWith(Math.max(from - 1, 0), to, mentionNode);
            dispatch(tr);

            hidePopover$.next();
        }

        return () => (
            <Popover type={PopoverTypeEnum.MENTION}>
                {{
                    default: () => (
                        <div class="container">
                            {
                                users.map(user => (
                                    <div class="user" onClick={() => handleSelect(user)}>
                                        <User size="large" username={user.username} showText={false} />
                                        <div class="pl-2">
                                            <div>{user.username}</div>
                                            <div class="lightText text-xs">{user.department}</div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }}
            </Popover>
        );
    }
});
</script>

<style scoped>
.container {
    padding: 8px 0;
    width: 320px;
}

.user {
    display: flex;
    align-items: center;
    height: 48px;
    font-size: 14px;

    padding: 0 8px;
    margin: 0 8px 2px;
    border-radius: 4px;
    background-color: #fff;
    transition: background-color .4s cubic-bezier(.27,1.27,.48,.56);
}

.user:hover {
    background-color: #1f232914;
}
</style>