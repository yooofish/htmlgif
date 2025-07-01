// 示例HTML动画
const EXAMPLE_HTML = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            margin: 0;
            padding: 20px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .container {
            text-align: center;
            color: white;
        }
        
        .title {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
            animation: bounce 2s infinite;
        }
        
        .subtitle {
            font-size: 1.5rem;
            opacity: 0.9;
            animation: fadeIn 3s ease-in;
        }
        
        .circle {
            width: 100px;
            height: 100px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            margin: 20px auto;
            animation: rotate 4s linear infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-30px);
            }
            60% {
                transform: translateY(-15px);
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 0.9; transform: translateY(0); }
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">🎬 HTML转GIF</h1>
        <p class="subtitle">轻松制作动画效果</p>
        <div class="circle"></div>
    </div>
</body>
</html>
`;

// 应用主类
class HtmlToGifApp {
    // DOM元素
    private tabBtns!: NodeListOf<HTMLButtonElement>;
    private uploadArea!: HTMLDivElement;
    private urlArea!: HTMLDivElement;
    private uploadZone!: HTMLDivElement;
    private fileInput!: HTMLInputElement;
    private fileInfo!: HTMLDivElement;
    private fileName!: HTMLSpanElement;
    private removeFile!: HTMLButtonElement;
    private urlInput!: HTMLInputElement;
    private loadUrlBtn!: HTMLButtonElement;
    private urlInfo!: HTMLDivElement;
    private urlText!: HTMLSpanElement;
    private removeUrl!: HTMLButtonElement;
    private previewBtn!: HTMLButtonElement;
    private convertBtn!: HTMLButtonElement;
    private previewFrame!: HTMLDivElement;
    private progress!: HTMLDivElement;
    
    // 设置输入元素
    private widthInput!: HTMLInputElement;
    private heightInput!: HTMLInputElement;
    private offsetXInput!: HTMLInputElement;
    private offsetYInput!: HTMLInputElement;
    private widthValue!: HTMLSpanElement;
    private heightValue!: HTMLSpanElement;
    private offsetXValue!: HTMLSpanElement;
    private offsetYValue!: HTMLSpanElement;
    private fpsInput!: HTMLInputElement;
    private durationInput!: HTMLInputElement;
    private qualityInput!: HTMLInputElement;
    private widthInputBox!: HTMLInputElement;
    private heightInputBox!: HTMLInputElement;
    private offsetXInputBox!: HTMLInputElement;
    private offsetYInputBox!: HTMLInputElement;

    // 状态
    private currentFile: File | null = null;
    private currentUrl: string | null = null;
    private currentHtml: string | null = null;

    constructor() {
        this.initializeElements();
        this.bindEvents();
    }

    private initializeElements(): void {
        // 标签页
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.uploadArea = document.getElementById('uploadArea') as HTMLDivElement;
        this.urlArea = document.getElementById('urlArea') as HTMLDivElement;
        
        // 文件上传
        this.uploadZone = document.getElementById('uploadZone') as HTMLDivElement;
        this.fileInput = document.getElementById('fileInput') as HTMLInputElement;
        this.fileInfo = document.getElementById('fileInfo') as HTMLDivElement;
        this.fileName = document.getElementById('fileName') as HTMLSpanElement;
        this.removeFile = document.getElementById('removeFile') as HTMLButtonElement;
        
        // URL输入
        this.urlInput = document.getElementById('urlInput') as HTMLInputElement;
        this.loadUrlBtn = document.getElementById('loadUrlBtn') as HTMLButtonElement;
        this.urlInfo = document.getElementById('urlInfo') as HTMLDivElement;
        this.urlText = document.getElementById('urlText') as HTMLSpanElement;
        this.removeUrl = document.getElementById('removeUrl') as HTMLButtonElement;
        
        // 预览和转换
        this.previewBtn = document.getElementById('previewBtn') as HTMLButtonElement;
        this.convertBtn = document.getElementById('convertBtn') as HTMLButtonElement;
        this.previewFrame = document.getElementById('previewFrame') as HTMLDivElement;
        this.progress = document.getElementById('progress') as HTMLDivElement;
        
        // 设置
        this.widthInput = document.getElementById('width') as HTMLInputElement;
        this.heightInput = document.getElementById('height') as HTMLInputElement;
        this.offsetXInput = document.getElementById('offsetX') as HTMLInputElement;
        this.offsetYInput = document.getElementById('offsetY') as HTMLInputElement;
        this.widthValue = document.getElementById('widthValue') as HTMLSpanElement;
        this.heightValue = document.getElementById('heightValue') as HTMLSpanElement;
        this.offsetXValue = document.getElementById('offsetXValue') as HTMLSpanElement;
        this.offsetYValue = document.getElementById('offsetYValue') as HTMLSpanElement;
        this.fpsInput = document.getElementById('fps') as HTMLInputElement;
        this.durationInput = document.getElementById('duration') as HTMLInputElement;
        this.qualityInput = document.getElementById('quality') as HTMLInputElement;
        this.widthInputBox = document.getElementById('widthInputBox') as HTMLInputElement;
        this.heightInputBox = document.getElementById('heightInputBox') as HTMLInputElement;
        this.offsetXInputBox = document.getElementById('offsetXInputBox') as HTMLInputElement;
        this.offsetYInputBox = document.getElementById('offsetYInputBox') as HTMLInputElement;
    }

    private bindEvents(): void {
        // 标签页切换
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => this.switchTab(btn.dataset.method!));
        });

        // 文件上传
        this.uploadZone.addEventListener('click', () => this.fileInput.click());
        this.uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.removeFile.addEventListener('click', () => this.removeCurrentFile());

        // URL输入
        this.loadUrlBtn.addEventListener('click', () => this.loadUrl());
        this.urlInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.loadUrl();
        });
        this.removeUrl.addEventListener('click', () => this.removeCurrentUrl());

        // 预览和转换
        this.previewBtn.addEventListener('click', () => this.preview());
        this.convertBtn.addEventListener('click', () => this.convert());

        // 宽高参数变化时自动刷新预览
        this.widthInput.addEventListener('input', () => this.handleSizeChange('width'));
        this.heightInput.addEventListener('input', () => this.handleSizeChange('height'));
        this.offsetXInput.addEventListener('input', () => this.handleOffsetChange('offsetX'));
        this.offsetYInput.addEventListener('input', () => this.handleOffsetChange('offsetY'));
        this.widthInputBox.addEventListener('input', () => this.handleSizeChange('widthBox'));
        this.heightInputBox.addEventListener('input', () => this.handleSizeChange('heightBox'));
        this.offsetXInputBox.addEventListener('input', () => this.handleOffsetChange('offsetXBox'));
        this.offsetYInputBox.addEventListener('input', () => this.handleOffsetChange('offsetYBox'));
    }

    private switchTab(method: string): void {
        // 更新标签页状态
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.method === method);
        });

        // 更新显示区域
        this.uploadArea.classList.toggle('active', method === 'upload');
        this.urlArea.classList.toggle('active', method === 'url');

        // 清除当前选择
        this.clearCurrentSelection();
    }

    private handleDragOver(e: DragEvent): void {
        e.preventDefault();
        this.uploadZone.classList.add('dragover');
    }

    private handleDragLeave(e: DragEvent): void {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
    }

    private handleDrop(e: DragEvent): void {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
        
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            this.processFile(files[0]);
        }
    }

    private handleFileSelect(e: Event): void {
        const target = e.target as HTMLInputElement;
        if (target.files && target.files.length > 0) {
            this.processFile(target.files[0]);
        }
    }

    private async processFile(file: File): Promise<void> {
        if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
            this.showError('请选择HTML文件');
            return;
        }
        try {
            const html = await this.readFileAsText(file);
            this.currentFile = file;
            this.currentHtml = html;
            this.currentUrl = null;
            this.fileName.textContent = file.name;
            this.fileInfo.classList.remove('hidden');
            this.updateButtonStates();
            this.showSuccess('HTML文件加载成功！');
            this.preview(); // 自动预览
        } catch (error) {
            console.error('文件读取失败:', error);
            this.showError('文件读取失败，请重试');
        }
    }

    private readFileAsText(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = reject;
            reader.readAsText(file);
        });
    }

    private removeCurrentFile(): void {
        this.currentFile = null;
        this.currentHtml = null;
        this.fileInfo.classList.add('hidden');
        this.fileInput.value = '';
        this.updateButtonStates();
    }

    private async loadUrl(): Promise<void> {
        const url = this.urlInput.value.trim();
        if (!url) {
            this.showError('请输入URL地址');
            return;
        }
        if (!this.isValidUrl(url)) {
            this.showError('请输入有效的URL地址');
            return;
        }
        try {
            this.loadUrlBtn.disabled = true;
            this.loadUrlBtn.textContent = '加载中...';
            const response = await fetch('/api/html-to-gif/fetch-url', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            if (!response.ok) {
                throw new Error('URL加载失败');
            }
            const { html } = await response.json();
            this.currentUrl = url;
            this.currentHtml = html;
            this.currentFile = null;
            this.urlText.textContent = url;
            this.urlInfo.classList.remove('hidden');
            this.updateButtonStates();
            this.showSuccess('URL加载成功！');
            this.preview(); // 自动预览
        } catch (error) {
            console.error('URL加载失败:', error);
            this.showError('URL加载失败，请检查地址是否正确');
        } finally {
            this.loadUrlBtn.disabled = false;
            this.loadUrlBtn.textContent = '加载';
        }
    }

    private isValidUrl(string: string): boolean {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    private removeCurrentUrl(): void {
        this.currentUrl = null;
        this.currentHtml = null;
        this.urlInfo.classList.add('hidden');
        this.urlInput.value = '';
        this.updateButtonStates();
    }

    private clearCurrentSelection(): void {
        this.removeCurrentFile();
        this.removeCurrentUrl();
    }

    private updateButtonStates(): void {
        const hasContent = this.currentHtml !== null;
        this.previewBtn.disabled = !hasContent;
        this.convertBtn.disabled = !hasContent;
    }

    private handleSizeChange(source?: string): void {
        let width = parseInt(this.widthInput.value);
        let height = parseInt(this.heightInput.value);
        if (source === 'widthBox') {
            width = parseInt(this.widthInputBox.value);
            this.widthInput.value = width + '';
        } else {
            this.widthInputBox.value = width + '';
        }
        if (source === 'heightBox') {
            height = parseInt(this.heightInputBox.value);
            this.heightInput.value = height + '';
        } else {
            this.heightInputBox.value = height + '';
        }
        // 动态调整offsetX/offsetY滑块和输入框范围
        this.offsetXInput.min = (-width).toString();
        this.offsetXInput.max = width.toString();
        this.offsetXInputBox.min = (-width).toString();
        this.offsetXInputBox.max = width.toString();
        this.offsetYInput.min = (-height).toString();
        this.offsetYInput.max = height.toString();
        this.offsetYInputBox.min = (-height).toString();
        this.offsetYInputBox.max = height.toString();
        // 如果当前值超出新范围，重置为0
        if (parseInt(this.offsetXInput.value) < -width || parseInt(this.offsetXInput.value) > width) {
            this.offsetXInput.value = '0';
            this.offsetXInputBox.value = '0';
        }
        if (parseInt(this.offsetYInput.value) < -height || parseInt(this.offsetYInput.value) > height) {
            this.offsetYInput.value = '0';
            this.offsetYInputBox.value = '0';
        }
        this.preview();
    }

    private handleOffsetChange(source?: string): void {
        let offsetX = parseInt(this.offsetXInput.value);
        let offsetY = parseInt(this.offsetYInput.value);
        if (source === 'offsetXBox') {
            offsetX = parseInt(this.offsetXInputBox.value);
            this.offsetXInput.value = offsetX + '';
        } else {
            this.offsetXInputBox.value = offsetX + '';
        }
        if (source === 'offsetYBox') {
            offsetY = parseInt(this.offsetYInputBox.value);
            this.offsetYInput.value = offsetY + '';
        } else {
            this.offsetYInputBox.value = offsetY + '';
        }
        this.preview();
    }

    private preview(): void {
        if (!this.currentHtml) {
            this.showError('请先选择HTML文件或输入URL');
            return;
        }
        const width = parseInt(this.widthInput.value);
        const height = parseInt(this.heightInput.value);
        const offsetX = parseInt(this.offsetXInput.value);
        const offsetY = parseInt(this.offsetYInput.value);
        this.previewFrame.style.width = width + 'px';
        this.previewFrame.style.height = height + 'px';
        this.previewFrame.innerHTML = `
          <iframe id="previewIframe" style="width:100%;height:100%;border:none;overflow:hidden;"></iframe>
        `;
        const iframe = document.getElementById('previewIframe') as HTMLIFrameElement;
        // 注入body样式和transform
        let htmlWithStyle = this.currentHtml;
        const transform = `transform: translate(${offsetX}px, ${offsetY}px);`;
        const bodyStyle = `width:100vw;height:100vh;overflow:hidden;margin:0;padding:0;display:block;${transform}`;
        if (/<body[^>]*>/i.test(htmlWithStyle)) {
            htmlWithStyle = htmlWithStyle.replace(
                /<body([^>]*)>/i,
                `<body$1 style=\"${bodyStyle}\">`
            );
        } else {
            htmlWithStyle = `<body style=\"${bodyStyle}\">` + htmlWithStyle + `</body>`;
        }
        iframe.srcdoc = htmlWithStyle;
    }

    private async convert(): Promise<void> {
        if (!this.currentHtml) {
            this.showError('请先选择HTML文件或输入URL');
            return;
        }
        try {
            this.convertBtn.disabled = true;
            this.progress.classList.remove('hidden');
            this.convertBtn.textContent = '转换中...';
            const options = {
                width: parseInt(this.widthInput.value),
                height: parseInt(this.heightInput.value),
                fps: parseInt(this.fpsInput.value),
                duration: parseInt(this.durationInput.value),
                quality: parseInt(this.qualityInput.value),
                offsetX: parseInt(this.offsetXInput.value),
                offsetY: parseInt(this.offsetYInput.value)
            };
            const response = await fetch('/api/html-to-gif/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ html: this.currentHtml, options })
            });
            if (!response.ok) {
                throw new Error('转换失败');
            }
            const blob = await response.blob();
            this.downloadGif(blob);
        } catch (error) {
            console.error('转换失败:', error);
            this.showError('转换失败，请检查设置和HTML内容');
        } finally {
            this.convertBtn.disabled = false;
            this.progress.classList.add('hidden');
            this.convertBtn.textContent = '🎬 转换为GIF';
        }
    }

    private downloadGif(blob: Blob): void {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `animation-${Date.now()}.gif`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showSuccess('GIF生成成功！');
    }

    private showError(message: string): void {
        this.showNotification(message, 'error');
    }

    private showSuccess(message: string): void {
        this.showNotification(message, 'success');
    }

    private showNotification(message: string, type: 'success' | 'error'): void {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '500',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            background: type === 'success' ? '#28a745' : '#dc3545'
        });

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// 启动应用
document.addEventListener('DOMContentLoaded', () => {
    // 随机冷色系主题色生成
    function randomCoolTheme() {
        // 色相180~260（蓝、青、紫），饱和度20~40%，亮度85~95%
        const h = Math.floor(Math.random() * 80) + 180;
        const s = Math.floor(Math.random() * 20) + 20;
        const l = Math.floor(Math.random() * 10) + 88;
        // 主色
        const bg = `hsl(${h},${s}%,${l}%)`;
        const card = `hsl(${h},${s}%,${l+4}%)`;
        const btn = `hsl(${h},${s+10}%,${l-15}%)`;
        const btnHover = `hsl(${h},${s+10}%,${l-20}%)`;
        const border = `hsl(${h},${s-5}%,${l-10}%)`;
        const label = `hsl(${h},${s+5}%,${l-25}%)`;
        document.documentElement.style.setProperty('--theme-bg', bg);
        document.documentElement.style.setProperty('--theme-card', card);
        document.documentElement.style.setProperty('--theme-btn', btn);
        document.documentElement.style.setProperty('--theme-btn-hover', btnHover);
        document.documentElement.style.setProperty('--theme-border', border);
        document.documentElement.style.setProperty('--theme-label', label);
        document.documentElement.style.setProperty('--theme-input-bg', card);
        document.documentElement.style.setProperty('--theme-input-border', border);
        document.documentElement.style.setProperty('--theme-progress', `linear-gradient(90deg, ${bg}, ${btn})`);
    }
    randomCoolTheme();
    new HtmlToGifApp();
}); 