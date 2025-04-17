import { html, render } from 'lit-html';
import { createApp, App } from 'vue';
import { ImagePreview } from '@zsfe/zsui';
import { message } from 'ant-design-vue';

import { EventEmit } from '../../../../../shared/event';
import { download } from '../../../../../shared/file';

import './index.less';

export type ImageProps = {
    src: string;
}

export class Image extends EventEmit {
    private props: ImageProps | null = null;

    private previewApp: App<Element> | null = null;

    constructor(private mountNode: HTMLElement | null) {
        super();
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

    upload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const hide = message.loading('上传中...');

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'haleUploadPreset'); // 从 Cloudinary 控制台获取
        formData.append('cloud_name', 'dybz0bvui');       // 从 Cloudinary 控制台获取

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/dybz0bvui/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        const data = await response.json();
        
        if (data.secure_url) {
            this.emit('change', data.secure_url);

            setTimeout(() => {
                hide();
            }, 500);
        } else {
            message.error('上传失败');
        }
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
                    <div class="doc-component-imageToolbarItem overflow-hidden" aria-label="重新上传" data-microtip-position="top" role="tooltip">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-up-icon lucide-image-up"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
                        <input type="file" class="absolute w-[800px] h-[800px] !cursor-pointer" @change=${this.upload} />
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
        super.destroy();

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