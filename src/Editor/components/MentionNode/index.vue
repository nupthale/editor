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
                    <div class="inline-flex items-center userContainer" ref={containerRef}>
                         <UserProfile username={user.username}>
                            {{
                                user: () => (
                                    <div class="inline-flex items-center">
                                        <User size="small" username={user.username} showText={false} />
                                        <span class="ml-1 text-[16px]">{user.username}</span>
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
    background: #1456f0;
    color: #fff!important;
    border-radius: calc(0.5em + 3px);
    cursor: pointer;
    padding: 1px calc(0.5em - 2px) 1px 1px;
    line-height: 20px!important;
}
</style>