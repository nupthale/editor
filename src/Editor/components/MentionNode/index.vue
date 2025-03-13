<script lang="tsx">
import { PropType, defineComponent } from 'vue';
import { User, UserProfile } from '@zsfe/zsui';

import { useUserBackground } from './useUserBackground';
import { MentionParam, MentionTypeEnum } from '../../interface';

export default defineComponent({
    props: {
        meta: {
            type: Object as PropType<MentionParam>,
            default: () => {},
        },
    },
    setup(props) {
        const {
            containerRef,
        } = useUserBackground();

        return () => {
            if (props.meta?.type === MentionTypeEnum.USER) {
                const { info: user } = props.meta || {};

                return (
                    <div class="inline-flex items-center userContainer">
                         <UserProfile username={user.username}>
                            {{
                                user: () => (
                                    <div class="inline-flex items-center userWrap" ref={containerRef}>
                                        <User size="small" username={user.username} showText={false} />
                                        <span class="ml-1 username">{user.username}</span>
                                    </div>
                                ),
                                profile: () => (
                                    <div class="p-[15px]">这是关于{user.username}的个人简介</div>
                                ),
                            }}
                        </UserProfile>
                    </div>
                );
            }

            return (
                <div class="inline-flex">暂未支持的类型</div>
            );
        };
    }
});
</script>

<style scoped>
.userContainer {
    color: #fff!important;
    line-height: calc(1em + 2px);
}

.userWrap {
    border-radius: calc(0.5em + 3px);
    padding: 1px calc(0.5em - 2px) 1px 1px;
    cursor: pointer;
}

.userContainer :deep(.zsui-user__avatar) {
    font-size: 1em!important;
    width: calc(1em + 4px)!important;
    height: calc(1em + 4px)!important;
}

.username {
    line-height: calc(1em + 4px);
}
</style>