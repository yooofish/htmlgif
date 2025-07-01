# 🎬 HTML转GIF工具 | HTML to GIF Converter

一个强大的Web应用，可以将HTML动画转换为GIF图片。使用TypeScript + Puppeteer构建，提供直观的Web界面让用户轻松制作动画效果。

## ✨ 功能特性 | Features

- 🎨 **HTML编辑器** - 支持语法高亮的代码编辑器
- 👁️ **实时预览** - 即时预览HTML动画效果
- ⚙️ **灵活设置** - 可调节GIF的尺寸、帧率、时长、质量等参数
- 🎬 **一键转换** - 简单点击即可生成GIF动画
- 📱 **响应式设计** - 支持桌面和移动设备
- 🚀 **高性能** - 使用Puppeteer进行高效截图和GIF编码

## 🛠️ 技术栈 | Tech Stack

- **后端 | Backend**: Node.js + Express + TypeScript
- **前端 | Frontend**: 原生TypeScript + Vite
- **核心库 | Core Libraries**: Puppeteer (浏览器自动化) + gif-encoder-2 (GIF编码)
- **样式 | Styling**: 现代化CSS + 响应式设计

## 📦 安装和运行 | Installation & Usage

### 环境要求 | Prerequisites

- Node.js 16+ 
- npm 或 yarn

### 安装依赖 | Install dependencies

```bash
npm install
```

### 开发模式 | Development

```bash
# 同时启动前端和后端开发服务器
npm run dev
```

- 前端: http://localhost:3001 | Frontend: http://localhost:3001
- 后端: http://localhost:3000 | Backend: http://localhost:3000

### 生产构建 | Production

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

## 🎯 使用方法 | How to Use

1. **编写HTML动画** - 在左侧编辑器中输入HTML代码，支持CSS动画
2. **预览效果** - 点击"预览"按钮查看动画效果
3. **调整设置** - 配置GIF的尺寸、帧率、时长等参数
4. **生成GIF** - 点击"转换为GIF"按钮，等待处理完成后自动下载

## 📝 示例代码 | Example Code

```html
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
        
        .title {
            font-size: 3rem;
            color: white;
            animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-30px); }
            60% { transform: translateY(-15px); }
        }
    </style>
</head>
<body>
    <h1 class="title">🎬 HTML转GIF</h1>
</body>
</html>
```

## 🔧 API接口 | API

### 预览HTML | Preview HTML
```
POST /api/html-to-gif/preview
Content-Type: application/json

{
  "html": "<html>...</html>",
  "width": 800,
  "height": 600
}
```

### 转换为GIF | Convert to GIF
```
POST /api/html-to-gif/convert
Content-Type: application/json

{
  "html": "<html>...</html>",
  "options": {
    "width": 800,
    "height": 600,
    "fps": 10,
    "duration": 3000,
    "quality": 10
  }
}
```

## 📁 项目结构 | Project Structure

```
html-to-gif/
├── src/
│   ├── client/           # 前端代码 | Frontend code
│   │   ├── index.html    # 主页面
│   │   ├── main.ts       # 前端逻辑
│   │   └── styles/       # CSS样式
│   ├── server/           # 后端代码 | Backend code
│   │   ├── app.ts        # Express应用
│   │   ├── routes/       # API路由
│   │   └── services/     # 业务逻辑
│   └── server.ts         # 服务器入口 | Server entry
├── dist/                 # 构建输出 | Build output
├── package.json          # 项目配置
├── tsconfig.json         # TypeScript配置
├── vite.config.ts        # Vite配置
└── README.md            # 项目文档
```

## 🚀 部署 | Deployment

### Docker部署 | Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### 环境变量 | Environment Variables

- `PORT` - 服务器端口 (默认: 3000) | Server port (default: 3000)
- `NODE_ENV` - 运行环境 (development/production) | Environment (development/production)

## 🤝 贡献 | Contributing

欢迎提交Issue和Pull Request！  
Contributions are welcome!

1. Fork 项目 | Fork the repo
2. 创建功能分支 | Create a feature branch
3. 提交更改 | Commit your changes
4. 推送到分支 | Push to the branch
5. 打开Pull Request | Open a Pull Request

## 📄 许可证 | License

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。  
MIT License - See [LICENSE](LICENSE) for details.

## 🙏 致谢 | Acknowledgements

- [Puppeteer](https://pptr.dev/) - 浏览器自动化 | Headless browser automation
- [gif-encoder-2](https://github.com/benjaminadk/gif-encoder-2) - GIF编码 | GIF encoding
- [Vite](https://vitejs.dev/) - 前端构建工具 | Frontend build tool

---

⭐ 如果这个项目对您有帮助，请给它一个星标！  
⭐ If you find this project useful, please give it a star! 