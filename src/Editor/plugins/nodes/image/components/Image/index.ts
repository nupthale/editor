import { html, render } from 'lit-html';
import { createApp, App } from 'vue';
import { ImagePreview } from '@zsfe/zsui';
import { message } from 'ant-design-vue';

import { download } from '../../../../../shared/file';

import './index.less';

export type ImageProps = {
    src: string;
}

export class Image {
    private props: ImageProps | null = null;

    private previewApp: App<Element> | null = null;

    constructor(private mountNode: HTMLElement | null) {
    }

    // 根据props.src 下载图片
    download = () => {
        if (!this.props?.src) {
            return;
        }

        download(this.props?.src, '图片');
    }
    
    preview = () => {
        if (this.previewApp) {
            this.previewApp?.unmount();
            this.previewApp = null;
        }

        const previewContainer = document.createElement('div');
        document.body.appendChild(previewContainer);

        this.previewApp = createApp(ImagePreview, {
            src: this.props?.src,
            onClose: () => {
                this.previewApp?.unmount();
                this.previewApp = null;

                // 移除容器元素
                previewContainer.remove();
            }
        });

        this.previewApp.mount(previewContainer);
    }

    template() {
        const props = this.props;

        if (!props) {
            return html``;
        }

        return html`
            <div class="doc-component-image w-full h-full">
                <img src="${props.src}" width="100%" height="100%" />

                <div class="doc-component-imageToolbar absolute">
                    <div class="doc-component-imageToolbarItem" aria-label="下载" data-microtip-position="top" role="tooltip" @click=${this.download}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download-icon lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </div>
                    <div class="doc-component-imageToolbarItem" aria-label="全屏预览" data-microtip-position="top" role="tooltip" @click=${this.preview}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-eye-icon lucide-eye"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                </div>
            </div>
        `;
    }

    render(props) {
        if (!this.mountNode) return;

        this.props = props;
        render(this.template(), this.mountNode);
    }

    destory = () => {
        // 确保预览组件被完全销毁
        if (this.previewApp) {
            this.previewApp.unmount();
            this.previewApp = null;
        }

        if (!this.mountNode) {
           return;
        }
       
        // 清空渲染内容
        render(null, this.mountNode);

        this.mountNode = null;
    }
}