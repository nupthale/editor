import { h, render } from 'vue';

import {CodeJar} from 'codejar';
import { withLineNumbers } from "codejar-linenumbers";
import Prism from 'prismjs';

// 引入需要的语言包
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism.css';  // 主题样式

import Toolbar from '../Toolbar/index.vue';
import { EventEmit } from '../../../../../shared/event';

import 'codejar-linenumbers/es/codejar-linenumbers.css';
import './index.less';

export type CoderProps = {
    code: string;
    language: string;
}

export class Coder extends EventEmit {
    private editor: CodeJar  | null = null;

    private toolbarDOM: HTMLElement;
    private editorDOM: HTMLElement;
    private code: string = '';
    private language: string = '';

    constructor(private mountNode: HTMLElement | null) {
        super();

        this.toolbarDOM = document.createElement('div');
        this.toolbarDOM.classList.add('doc-component-codeToolbar');
        
        this.editorDOM = document.createElement('div');
        this.editor = CodeJar(this.editorDOM, withLineNumbers(this.highlight), { tab: '\t' });

        this.mountNode?.appendChild(this.toolbarDOM);
        this.mountNode?.appendChild(this.editorDOM);

        this.initEvt();
    }

    highlight = (editor) => {
        let code = editor.textContent;
        code = Prism.highlight(code, Prism.languages[this.language], this.language);
        editor.innerHTML = code;
    };

    setLanguage(language: string) {
        if (!this.editorDOM) return;
        
        // 移除旧的语言类
        this.editorDOM.className = '';
        // 添加新的语言类
        this.editorDOM.classList.add('language-' + language);
    }

    render(code, language) {
        if (!this.editorDOM || !this.editor) return;

        this.code = code;
        this.language = language;

        this.renderToolbar();

        this.setLanguage(language);
        this.editor.updateCode(code);
    }

    renderToolbar = () => {
        render(h(Toolbar, {
            language: this.language,
            onChangeLanguage: (language) => {
                this.render(this.code, language); // 重新渲染代码块，语言改变

                this.setLanguage(language);
                this.emit('changeLanguage', language);
            },
        }), this.toolbarDOM);
    }

    initEvt() {
        this.editor?.onUpdate((code) => {
            this.code = code;
            this.emit('changeCode', code);
        });
    }

    destory = () => {
        super.destroy();

        if (!this.mountNode) {
           return;
        }

        // 清理 vue 组件
        render(null, this.toolbarDOM);

        this.mountNode = null;
        this.editor = null;
        this.toolbarDOM.remove();
        this.editorDOM.remove();
    }
}