<script lang="tsx">
import { defineComponent } from 'vue';
import { UserProfile, User } from '@zsfe/zsui';

export default defineComponent({
    setup() {
        return () => (
            <div>
                <UserProfile username="Jason Clarkson">
                    {{
                        user: () => (
                            <div class="inline-flex items-center">
                                <User size="small" username="Jason Clarkson" showText={false} />
                                <span class="ml-1 text-sm text-[#646a73]">Jason Clarkson</span>
                            </div>
                        ),
                        profile: () => (
                            <div class="p-[15px]">这是关于Jason Clarkson的个人简介</div>
                        ),
                    }}
                </UserProfile>
            </div>
        );
    }
});
</script>