<script lang="tsx">
import { defineComponent, ref } from 'vue';
import { User } from '@zsfe/zsui';
import { ThumbsUp } from 'lucide';
import confetti from 'canvas-confetti';

import LucideIcon from '../LucideIcon/index.vue';

export default defineComponent({
    setup() {
        const buttonRef = ref<HTMLElement | null>(null);

        const handleClick = () => {
            if (!buttonRef.value) return;
 
            const rect = buttonRef.value.getBoundingClientRect();
            
            confetti({
                particleCount: 100,
                spread: 70,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight,
                },
            });
        }

        return () => (
            <div class="likeSection">
                <div class="flex justify-center">
                    <div class="likeButton" ref={buttonRef} onClick={handleClick}>
                        <LucideIcon icon={ThumbsUp} color="#336FFF" width={22} />
                    </div>
                </div>
                <div class="mt-6 mb-2 flex items-center justify-center">
                    <div class="line"></div>
                    <div class="desc">真诚点赞，手留余香</div>
                    <div class="line"></div>
                </div>
                <div class="flex items-center justify-center">
                    <User showText={false} username="陈瑞" />
                </div>
            </div>
        );
    }
});
</script>

<style scoped>
.likeSection {
    padding: 24px 0 30px;
    margin: 0 auto 100px;
}

.likeButton {
    display: flex;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    border: 1px solid #336FFF;
    cursor: pointer;
}

.likeButton:hover {
    background: #EFF4FF;
}

.likeButton:active {
    background: #c2d4ff;
}

.desc {
    color: #8f959e;
    margin: 0 7px;
    font-size: 14px;
    line-height: 20px;
}

.line {
    width: 44px;
    height: 1px;
    min-height: 1px;
}

.line:first-child {
    background: linear-gradient(to left, #dee0e3, #fff);
}

.line:last-child {
    background: linear-gradient(to right, #dee0e3, #fff);
}
</style>