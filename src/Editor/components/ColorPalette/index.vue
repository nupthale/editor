<script lang="tsx">
import { defineComponent } from 'vue';
import { Type } from 'lucide';

import LucideIcon from '../LucideIcon/index.vue';

const textColors = [
    'rgb(31, 35, 41)',
    'rgb(143, 149, 158)',
    'rgb(216, 57, 49)',
    'rgb(222, 120, 2)',
    'rgb(220, 155, 4)',
    'rgb(46, 161, 33)',
    'rgb(36, 91, 219)',
    'rgb(100, 37, 208)',
];

const bgColors = [
    'rgb(242, 243, 245)',
    'rgb(251, 191, 188)',
    'rgba(254, 212, 164, 0.8)',
    'rgba(255, 246, 122, 0.8)',
    'rgba(183, 237, 177, 0.8)',
    'rgba(186, 206, 253, 0.7)',
    'rgba(205, 178, 250, 0.7)',
    'rgba(222, 224, 227, 0.8)',
    'rgb(187, 191, 196)',
    'rgb(247, 105, 100)',
    'rgb(255, 165, 61)',
    'rgb(255, 233, 40)',
    'rgb(98, 210, 86)',
    'rgba(78, 131, 253, 0.55)',
    'rgba(147, 90, 246, 0.55)',
];

export default defineComponent({
    setup(_props, { emit }) {

        return () => (
            <div class="container">
                <div class="title">字体颜色</div>
                <ul class="grid grid-cols-8">
                    {
                        textColors.map(textColor => (
                            <li key={textColor} class="textColor" style={{ color: textColor }} onClick={() => emit('color', textColor)}>
                                <LucideIcon icon={Type} width={12}></LucideIcon>
                            </li>
                        ))
                    }
                </ul>
                <div class="title">背景颜色</div>
                <ul class="grid grid-cols-8">
                    <li class="bgColor">
                        <div class="bgColor0"></div>
                    </li>
                    {
                        bgColors.map(bgColor => (
                            <li key={bgColor} class="bgColor" style={{ background: bgColor }} onClick={() => emit('background', bgColor)}></li>
                        ))
                    }
                </ul>
            </div>
        );
    }
});
</script>

<style scoped>
.container {
    width: 230px;
    padding: 4px 10px 12px;
    border: 1px solid #dee0e3;
    border-radius: 6px;
    box-shadow: 0 6px 24px #1f23291a;
}

.title {
    color: #1f2329;
    margin: 9px 0 7px 2px;
    font-size: 12px;
}

.textColor, .bgColor {
    position: relative;
    
    margin-bottom: 4px;
    border-radius: 4px;
    border: 2px solid #fff;
    height: 26px;
    cursor: pointer;
}

.textColor {
    display: flex;
    align-items: center;
    justify-content: center;
}

.textColor:before {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: 1px solid #d0d3d6;
}

.textColor:hover, .bgColor:hover {
    border-color: #c2d4ff;
}

.textColor.active, .bgColor.active {
    border-color: #336df4;
}

.textColor:hover:before, .textColor.active:before,
.bgColor:hover .bgColor0:before, .bgColor.active .bgColor0:before {
    display: none;
}

.bgColor0 {
    position: relative;
}

.bgColor0:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    border: 1px solid #d0d3d6;
    transform: scale(.5);
    transform-origin: 0 0;
    width: 42px;
    height: 42px;
    border-radius: 4px;
}

.bgColor0:after {
    position: absolute;
    top: 2px;
    left: 22px;
    content: '';
    background: #8f959e;
    width: 1px;
    height: 56px;
    transform: scale(0.5) rotate(45deg);
    transform-origin: -1px -2px;
}
</style>