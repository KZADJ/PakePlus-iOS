window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});// very important, if you don't know what it is, don't touch it
// 非常重要，不懂代码不要动，这里可以解决80%的问题，也可以生产1000+的bug
const hookClick = (e) => {
  const origin = e.target.closest('a')
  const isBaseTargetBlank = document.querySelector(
    'head base[target="_blank"]'
  )
  console.log('origin', origin, isBaseTargetBlank)
  if (
    (origin && origin.href && origin.target === '_blank') ||
    (origin && origin.href && isBaseTargetBlank)
  ) {
    e.preventDefault()
    console.log('handle origin', origin)
    location.href = origin.href
  } else {
    console.log('not handle origin', origin)
  }
}

window.open = function (url, target, features) {
  console.log('open', url, target, features)
  location.href = url
}

document.addEventListener('click', hookClick, { capture: true })

//等待加载完成后执行
window.onload = function () {
  /* ============================================================
   * 一、样式表
   * ============================================================ */
  const style = document.createElement('style');
  style.textContent = `
  /* ============================================================
   * ⚙️ 主按钮 —— 永远漂浮，可以拖，不遮挡桌面
   * ============================================================ */
  .acp-panel-root {
    position: fixed;
    top: 80px;
    right: 24px;
    z-index: 2147483000;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    pointer-events: none;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  }
  .acp-panel-root > * { pointer-events: auto; }

  .acp-main-btn {
    width: 52px;
    height: 52px;
    padding: 0;
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    line-height: 1;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(135deg, #667eea, #764ba2);
    box-shadow: 0 8px 24px rgba(102, 126, 234, 0.45), 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    user-select: none;
    -webkit-user-select: none;
    outline: none;
    flex: 0 0 auto;
    animation: acp-rainbow 10s linear infinite;
    position: relative;
    overflow: hidden;
  }
  .acp-main-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%);
    pointer-events: none;
  }
  .acp-main-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 12px 32px rgba(102, 126, 234, 0.55), 0 6px 16px rgba(0, 0, 0, 0.25);
  }
  .acp-main-btn:active { transform: scale(0.94); }

  @keyframes acp-rainbow {
    0%   { background: linear-gradient(135deg, #667eea, #764ba2); }
    20%  { background: linear-gradient(135deg, #f093fb, #f5576c); }
    40%  { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
    60%  { background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
    80%  { background: linear-gradient(135deg, #4facfe, #00f2fe); }
    100% { background: linear-gradient(135deg, #667eea, #764ba2); }
  }

  /* ============================================================
   * 工具按钮区 —— 一个一个冒出来
   * ============================================================ */
  .acp-tools {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    max-height: calc(100vh - 140px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 2px;
    scrollbar-width: thin;
    pointer-events: none;
  }
  .acp-tools::-webkit-scrollbar { width: 3px; }
  .acp-tools::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 3px;
  }

  /* 收起状态：所有工具按钮隐藏 */
  .acp-tools .acp-tool-btn {
    opacity: 0;
    transform: scale(0.4) translateY(-8px);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  /* 展开状态：工具按钮逐个弹出 */
  .acp-tools.acp-open .acp-tool-btn {
    opacity: 1;
    transform: scale(1) translateY(0);
    pointer-events: auto;
  }

  /* 一个一个冒出来：每个按钮不同的延迟 */
  .acp-tools.acp-open .acp-tool-btn:nth-child(1) { transition-delay: 0ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(2) { transition-delay: 45ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(3) { transition-delay: 90ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(4) { transition-delay: 135ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(5) { transition-delay: 180ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(6) { transition-delay: 225ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(7) { transition-delay: 270ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(8) { transition-delay: 315ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(9) { transition-delay: 360ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(10) { transition-delay: 405ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(11) { transition-delay: 450ms; }
  .acp-tools.acp-open .acp-tool-btn:nth-child(12) { transition-delay: 495ms; }

  /* 收起时反向延迟，最后一个先收 */
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(1)  { transition-delay: 495ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(2)  { transition-delay: 450ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(3)  { transition-delay: 405ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(4)  { transition-delay: 360ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(5)  { transition-delay: 315ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(6)  { transition-delay: 270ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(7)  { transition-delay: 225ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(8)  { transition-delay: 180ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(9)  { transition-delay: 135ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(10) { transition-delay: 90ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(11) { transition-delay: 45ms; }
  .acp-tools:not(.acp-open) .acp-tool-btn:nth-child(12) { transition-delay: 0ms; }

  .acp-tool-btn {
    flex: 0 0 auto;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 1px solid rgba(255, 255, 255, 0.35);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 1;
    cursor: pointer;
    color: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.18);
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    user-select: none;
    -webkit-user-select: none;
    outline: none;
  }
  .acp-tool-btn:hover {
    transform: scale(1.1) translateZ(0);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.28);
  }
  .acp-tool-btn:active { transform: scale(0.9); }

  /* 各按钮配色 */
  .acp-t-back       { background: linear-gradient(135deg, #ff6b6b, #ee5a52); }
  .acp-t-forward    { background: linear-gradient(135deg, #4facfe, #00f2fe); }
  .acp-t-record     { background: linear-gradient(135deg, #f093fb, #f5576c); }
  .acp-t-shot       { background: linear-gradient(135deg, #4ecdc4, #44a08d); }
  .acp-t-jump       { background: linear-gradient(135deg, #ffc107, #ff9800); }
  .acp-t-files      { background: linear-gradient(135deg, #4caf50, #2e7d32); }
  .acp-t-linkdl     { background: linear-gradient(135deg, #9c27b0, #7b1fa2); }
  .acp-t-color      { background: linear-gradient(135deg, #a8edea, #fed6e3); color: #2c3e50; }
  .acp-t-star       { background: linear-gradient(135deg, #d299c2, #fef9d7); color: #2c3e50; }
  .acp-t-stop       { background: linear-gradient(135deg, #f44336, #d32f2f); }
  .acp-t-delaystop  { background: linear-gradient(135deg, #ff9800, #f57c00); }
  .acp-t-hide       { background: rgba(120, 120, 140, 0.9); }

  /* ============================================================
   * 状态提示
   * ============================================================ */
  .acp-status {
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%) translateY(-30px);
    background: rgba(20, 22, 30, 0.9);
    color: #fff;
    padding: 10px 22px;
    border-radius: 999px;
    font-size: 13px;
    z-index: 2147483300;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
  }
  .acp-status.acp-show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  /* ============================================================
   * 各功能面板 —— 同一时间只显示一个
   * ============================================================ */
  .acp-panel {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.94);
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.3);
    padding: 24px;
    min-width: 340px;
    max-width: 92vw;
    max-height: 86vh;
    overflow-y: auto;
    z-index: 2147483100;
    display: none;
    flex-direction: column;
    gap: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    color: #2c3e50;
    font-size: 14px;
    line-height: 1.5;
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .acp-panel.acp-show {
    display: flex;
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  .acp-panel::-webkit-scrollbar { width: 6px; }
  .acp-panel::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 6px;
  }

  .acp-panel-title {
    margin: 0;
    text-align: center;
    font-size: 17px;
    font-weight: 700;
    color: #2c3e50;
  }

  .acp-field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .acp-label {
    font-weight: 600;
    font-size: 13px;
    color: #46505f;
  }
  .acp-input {
    padding: 11px 14px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 13.5px;
    font-family: inherit;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .acp-input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.15);
  }

  .acp-actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 4px;
  }
  .acp-btn {
    flex: 1;
    min-width: 90px;
    padding: 11px 16px;
    border: none;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    color: #fff;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: filter 0.15s, transform 0.15s;
    font-family: inherit;
  }
  .acp-btn:hover { filter: brightness(1.08); }
  .acp-btn:active { transform: scale(0.97); }
  .acp-btn.ghost {
    background: #f0f1f5;
    color: #555;
  }
  .acp-btn.ghost:hover { background: #e6e8ef; }
  .acp-btn.danger {
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  }

  /* 选项组 */
  .acp-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .acp-opt {
    padding: 8px 14px;
    border: 1px solid #e3e6ef;
    border-radius: 999px;
    background: #f5f6fa;
    color: #4b5563;
    font-size: 12.5px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    outline: none;
  }
  .acp-opt:hover {
    border-color: #667eea;
    color: #667eea;
  }
  .acp-opt.acp-active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: transparent;
    color: #fff;
  }

  /* 皮肤网格 */
  .acp-skin-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(58px, 1fr));
    gap: 8px;
    max-height: 260px;
    overflow-y: auto;
    padding: 2px;
  }
  .acp-skin-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 8px 4px;
    border: 2px solid #eceef4;
    border-radius: 12px;
    background: #fafbfd;
    cursor: pointer;
    transition: all 0.15s;
    font-family: inherit;
    outline: none;
    color: #4b5563;
  }
  .acp-skin-card:hover {
    border-color: #667eea;
    transform: translateY(-2px);
  }
  .acp-skin-card.acp-active {
    border-color: transparent;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: #fff;
  }
  .acp-skin-emoji {
    font-size: 24px;
    line-height: 1;
    pointer-events: none;
  }
  .acp-skin-name {
    font-size: 10px;
    font-weight: 600;
    opacity: 0.85;
    pointer-events: none;
  }

  /* 颜色网格 */
  .acp-color-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
  }
  .acp-color-dot {
    width: 100%;
    aspect-ratio: 1 / 1;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
    transition: transform 0.15s;
    padding: 0;
    outline: none;
  }
  .acp-color-dot:hover { transform: scale(1.1); }
  .acp-color-dot:active { transform: scale(0.9); }

  /* 工具图标行 */
  .acp-icon-row {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    border-bottom: 1px solid #f2f4f8;
  }
  .acp-icon-row:last-child { border-bottom: none; }
  .acp-icon-label {
    flex: 0 0 auto;
    min-width: 54px;
    font-size: 12px;
    font-weight: 600;
    color: #46505f;
  }
  .acp-icon-opts {
    flex: 1 1 auto;
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }
  .acp-icon-opt {
    width: 30px;
    height: 30px;
    border: 1px solid #e3e6ef;
    border-radius: 8px;
    background: #f5f6fa;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    transition: all 0.15s;
    font-family: inherit;
    outline: none;
    padding: 0;
    color: #333;
  }
  .acp-icon-opt:hover {
    border-color: #667eea;
    background: #fff;
    transform: translateY(-1px);
  }
  .acp-icon-opt.acp-active {
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-color: transparent;
    color: #fff;
  }

  /* 标签页 */
  .acp-tabs {
    display: flex;
    gap: 4px;
    border-bottom: 1px solid #eceef4;
    overflow-x: auto;
    padding-bottom: 2px;
  }
  .acp-tab {
    flex: 0 0 auto;
    padding: 8px 14px;
    border: none;
    background: transparent;
    color: #6b7280;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    border-radius: 8px 8px 0 0;
    white-space: nowrap;
    font-family: inherit;
    outline: none;
    transition: color 0.15s, background 0.15s;
  }
  .acp-tab:hover { background: #f5f6fa; }
  .acp-tab.acp-active {
    color: #667eea;
    border-bottom: 2px solid #667eea;
  }

  /* 文件列表 */
  .acp-file-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 10px;
    padding: 10px 0;
    max-height: 400px;
    overflow-y: auto;
  }
  .acp-file-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border: 1px solid #eceef4;
    border-radius: 10px;
    background: #fafbfd;
  }
  .acp-file-icon {
    flex: 0 0 auto;
    width: 36px;
    height: 36px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #fff;
  }
  .acp-file-info { flex: 1 1 auto; min-width: 0; }
  .acp-file-name {
    font-size: 13px;
    font-weight: 600;
    color: #2c3e50;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .acp-file-url {
    font-size: 11px;
    color: #8a94a6;
    margin-top: 2px;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .acp-file-dl {
    flex: 0 0 auto;
    padding: 6px 12px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    font-family: inherit;
    outline: none;
  }
  .acp-file-dl:hover { filter: brightness(1.08); }
  .acp-empty {
    padding: 26px 12px;
    text-align: center;
    color: #9aa3b2;
    font-size: 13px;
  }

  /* 下载管理器 */
  .acp-dm {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: min(90vw, 340px);
    max-height: 42vh;
    background: #fff;
    border-radius: 14px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
    z-index: 2147483200;
    overflow: hidden;
    display: none;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
    color: #2c3e50;
    font-size: 13px;
  }
  .acp-dm.acp-show { display: flex; }
  .acp-dm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid #eceef4;
  }
  .acp-dm-title { font-weight: 700; font-size: 13.5px; }
  .acp-dm-close {
    border: none;
    background: transparent;
    font-size: 20px;
    line-height: 1;
    color: #888;
    cursor: pointer;
    padding: 0 4px;
    outline: none;
  }
  .acp-dm-list {
    padding: 8px 12px 12px;
    overflow-y: auto;
    flex: 1 1 auto;
  }
  .acp-dm-task {
    padding: 8px 0;
    border-bottom: 1px solid #f2f4f8;
  }
  .acp-dm-task:last-child { border-bottom: none; }
  .acp-dm-row {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 6px;
  }
  .acp-dm-name {
    font-size: 12.5px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .acp-dm-status {
    font-size: 11.5px;
    color: #8a94a6;
    flex: 0 0 auto;
  }
  .acp-dm-bar {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #f0f1f5;
    overflow: hidden;
  }
  .acp-dm-fill {
    height: 100%;
    width: 0;
    border-radius: 3px;
    background: linear-gradient(135deg, #4ecdc4, #44a08d);
    transition: width 0.25s ease;
  }

  /* 遮罩 */
  .acp-mask {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.18);
    z-index: 2147483050;
    display: none;
  }
  .acp-mask.acp-show { display: block; }

  /* 移动端 */
  @media (max-width: 768px) {
    .acp-panel-root {
      top: 70px;
      right: 14px;
    }
    .acp-main-btn { width: 46px; height: 46px; font-size: 22px; }
    .acp-tool-btn { width: 40px; height: 40px; font-size: 16px; }
    .acp-panel {
      min-width: 92vw;
      padding: 18px;
    }
    .acp-file-list { grid-template-columns: 1fr; }
    .acp-dm { right: 10px; bottom: 10px; width: 92vw; }
  }
  `;

  /* ============================================================
   * 二、创建 DOM
   * ============================================================ */
  // 遮罩
  const mask = document.createElement('div');
  mask.className = 'acp-mask';

  // 根容器
  const root = document.createElement('div');
  root.className = 'acp-panel-root';

  // ⚙️ 主按钮
  const mainBtn = document.createElement('button');
  mainBtn.type = 'button';
  mainBtn.className = 'acp-main-btn';
  mainBtn.textContent = '⚙️';
  mainBtn.title = '控制面板（点击展开工具）';

  // 工具条
  const tools = document.createElement('div');
  tools.className = 'acp-tools';

  // 工具按钮
  const tBack      = makeToolBtn('acp-t-back',      '←',  '返回上一页');
  const tForward   = makeToolBtn('acp-t-forward',   '→',  '前进');
  const tRecord    = makeToolBtn('acp-t-record',    '⏺',  '录屏');
  const tShot      = makeToolBtn('acp-t-shot',      '📷', '截图');
  const tJump      = makeToolBtn('acp-t-jump',      '🌐', '链接跳转');
  const tFiles     = makeToolBtn('acp-t-files',     '📂', '页面文件下载');
  const tLinkDl    = makeToolBtn('acp-t-linkdl',    '⬇️', '链接下载');
  const tColor     = makeToolBtn('acp-t-color',     '🎨', '外观设置');
  const tStar      = makeToolBtn('acp-t-star',      '⭐', '收藏');
  const tStop      = makeToolBtn('acp-t-stop',      '⏹',  '立即停止录制');
  const tDelayStop = makeToolBtn('acp-t-delaystop', '⏱',  '5 秒后停止');
  const tHide      = makeToolBtn('acp-t-hide',      '✕',  '收起工具');

  // 隐藏停止按钮（默认不显示，录屏时才显示）
  tStop.style.display = 'none';
  tDelayStop.style.display = 'none';

  function makeToolBtn(cls, icon, title) {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'acp-tool-btn ' + cls;
    b.textContent = icon;
    b.title = title;
    return b;
  }

  // 按顺序加入
  tools.appendChild(tBack);
  tools.appendChild(tForward);
  tools.appendChild(tRecord);
  tools.appendChild(tShot);
  tools.appendChild(tJump);
  tools.appendChild(tFiles);
  tools.appendChild(tLinkDl);
  tools.appendChild(tColor);
  tools.appendChild(tStar);
  tools.appendChild(tStop);
  tools.appendChild(tDelayStop);
  tools.appendChild(tHide);

  root.appendChild(mainBtn);
  root.appendChild(tools);

  // 各面板
  const panelRecord = makePanel(`
    <h3 class="acp-panel-title">录屏设置</h3>
    <div class="acp-field">
      <div class="acp-label">录屏时长</div>
      <div class="acp-options" id="acp-time-opts">
        <button class="acp-opt" data-time="5">5 秒</button>
        <button class="acp-opt" data-time="10">10 秒</button>
        <button class="acp-opt" data-time="60">1 分钟</button>
        <button class="acp-opt" data-time="300">5 分钟</button>
        <button class="acp-opt" data-time="600">10 分钟</button>
        <button class="acp-opt" data-time="1800">30 分钟</button>
        <button class="acp-opt acp-active" data-time="0">不限时</button>
      </div>
    </div>
    <div class="acp-field">
      <div class="acp-label">音频录制</div>
      <div class="acp-options" id="acp-audio-opts">
        <button class="acp-opt acp-active" data-audio="none">无声</button>
        <button class="acp-opt" data-audio="microphone">麦克风</button>
        <button class="acp-opt" data-audio="system">系统声音</button>
        <button class="acp-opt" data-audio="both">两者都录</button>
      </div>
    </div>
    <div class="acp-actions">
      <button class="acp-btn" id="acp-record-start">开始录屏</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const panelJump = makePanel(`
    <h3 class="acp-panel-title">链接跳转</h3>
    <div class="acp-field">
      <label class="acp-label">目标网址</label>
      <input type="url" class="acp-input" id="acp-jump-url" placeholder="https://example.com" value="https://">
    </div>
    <div class="acp-field">
      <label class="acp-label">快捷入口</label>
      <div class="acp-options" id="acp-jump-quick">
        <button class="acp-opt" data-url="https://www.baidu.com">百度</button>
        <button class="acp-opt" data-url="https://www.bing.com">必应</button>
        <button class="acp-opt" data-url="https://www.google.com">Google</button>
        <button class="acp-opt" data-url="https://github.com">GitHub</button>
      </div>
    </div>
    <div class="acp-actions">
      <button class="acp-btn" id="acp-jump-go">立即跳转</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const panelLinkDl = makePanel(`
    <h3 class="acp-panel-title">链接下载</h3>
    <div class="acp-field">
      <label class="acp-label">下载链接</label>
      <input type="url" class="acp-input" id="acp-dl-url" placeholder="https://example.com/file.zip">
    </div>
    <div class="acp-field">
      <label class="acp-label">文件名（可选）</label>
      <input type="text" class="acp-input" id="acp-dl-name" placeholder="留空则自动识别">
    </div>
    <div class="acp-actions">
      <button class="acp-btn" id="acp-dl-go">开始下载</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const panelFiles = makePanel(`
    <h3 class="acp-panel-title">页面文件下载</h3>
    <div class="acp-tabs" id="acp-file-tabs">
      <button class="acp-tab acp-active" data-tab="all">全部</button>
      <button class="acp-tab" data-tab="video">视频</button>
      <button class="acp-tab" data-tab="audio">音频</button>
      <button class="acp-tab" data-tab="image">图片</button>
      <button class="acp-tab" data-tab="document">文档</button>
      <button class="acp-tab" data-tab="archive">压缩包</button>
      <button class="acp-tab" data-tab="software">软件</button>
    </div>
    <div class="acp-file-list" id="acp-file-list"></div>
    <div class="acp-actions">
      <button class="acp-btn" id="acp-rescan">重新扫描</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const panelColor = makePanel(`
    <h3 class="acp-panel-title">外观设置</h3>

    <div class="acp-field">
      <div class="acp-label">主按钮 3D 角色皮肤</div>
      <div class="acp-skin-grid" id="acp-skin-grid"></div>
    </div>

    <div class="acp-field">
      <div class="acp-label">工具按钮图标（点击更换）</div>
      <div id="acp-icon-grid"></div>
    </div>

    <div class="acp-field">
      <div class="acp-label">按钮颜色</div>
      <div class="acp-color-grid" id="acp-color-grid">
        <button class="acp-color-dot" data-color="rgba(102,126,234,0.9)" style="background:linear-gradient(135deg,#667eea,#764ba2)"></button>
        <button class="acp-color-dot" data-color="rgba(240,147,251,0.9)" style="background:linear-gradient(135deg,#f093fb,#f5576c)"></button>
        <button class="acp-color-dot" data-color="rgba(78,205,196,0.9)"  style="background:linear-gradient(135deg,#4ecdc4,#44a08d)"></button>
        <button class="acp-color-dot" data-color="rgba(255,107,107,0.9)" style="background:linear-gradient(135deg,#ff6b6b,#ee5a52)"></button>
        <button class="acp-color-dot" data-color="rgba(79,172,254,0.9)"  style="background:linear-gradient(135deg,#4facfe,#00f2fe)"></button>
        <button class="acp-color-dot" data-color="rgba(168,237,234,0.95)" style="background:linear-gradient(135deg,#a8edea,#fed6e3)"></button>
        <button class="acp-color-dot" data-color="rgba(210,153,194,0.95)" style="background:linear-gradient(135deg,#d299c2,#fef9d7)"></button>
        <button class="acp-color-dot" data-color="rgba(253,116,108,0.9)" style="background:linear-gradient(135deg,#fd746c,#ff9068)"></button>
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:8px;">
        <input type="color" id="acp-color-input" value="#667eea" style="width:52px;height:40px;border:1px solid #e3e6ef;border-radius:10px;cursor:pointer;background:#fff;padding:2px;">
        <span style="font-size:12px;color:#6b7280;">自定义颜色</span>
      </div>
    </div>

    <div class="acp-field">
      <div class="acp-label">按钮大小</div>
      <div class="acp-options" id="acp-size-opts">
        <button class="acp-opt" data-size="small">小</button>
        <button class="acp-opt acp-active" data-size="medium">中</button>
        <button class="acp-opt" data-size="large">大</button>
      </div>
    </div>

    <div class="acp-actions">
      <button class="acp-btn ghost" id="acp-color-reset">恢复默认配色</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const panelStar = makePanel(`
    <h3 class="acp-panel-title">我的收藏</h3>
    <div id="acp-collection-list"></div>
    <div class="acp-actions">
      <button class="acp-btn danger" id="acp-clear-star">清空收藏</button>
      <button class="acp-btn ghost" data-close>关闭</button>
    </div>
  `);

  const dm = document.createElement('div');
  dm.className = 'acp-dm';
  dm.innerHTML = `
    <div class="acp-dm-header">
      <span class="acp-dm-title">下载管理器</span>
      <button type="button" class="acp-dm-close" id="acp-dm-close">×</button>
    </div>
    <div class="acp-dm-list" id="acp-dm-list"></div>
  `;

  const status = document.createElement('div');
  status.className = 'acp-status';

  function makePanel(inner) {
    const p = document.createElement('div');
    p.className = 'acp-panel';
    p.innerHTML = inner;
    return p;
  }

  // 加到页面
  document.head.appendChild(style);
  document.body.appendChild(mask);
  document.body.appendChild(root);
  document.body.appendChild(panelRecord);
  document.body.appendChild(panelJump);
  document.body.appendChild(panelLinkDl);
  document.body.appendChild(panelFiles);
  document.body.appendChild(panelColor);
  document.body.appendChild(panelStar);
  document.body.appendChild(dm);
  document.body.appendChild(status);

  /* ============================================================
   * 三、状态与工具函数
   * ============================================================ */
  const ALL_PANELS = [panelRecord, panelJump, panelLinkDl, panelFiles, panelColor, panelStar];

  let currentSkin = 'gear';
  let currentSize = 'medium';
  let selectedAudio = 'none';
  let openPanelEl = null;

  let isRecording = false;
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordingTimer = null;
  let audioStream = null;
  let videoStream = null;

  let collections = [];
  let downloadTasks = [];

  try {
    collections = JSON.parse(localStorage.getItem('acp_collections') || '[]');
    if (!Array.isArray(collections)) collections = [];
  } catch (e) { collections = []; }
  try {
    downloadTasks = JSON.parse(localStorage.getItem('acp_tasks') || '[]');
    if (!Array.isArray(downloadTasks)) downloadTasks = [];
  } catch (e) { downloadTasks = []; }

  function toast(msg, ms) {
    status.textContent = msg;
    status.classList.add('acp-show');
    if (status._timer) clearTimeout(status._timer);
    status._timer = setTimeout(() => {
      status.classList.remove('acp-show');
    }, ms || 2000);
  }

  /* ============================================================
   * 四、⚙️ 主按钮：展开 / 收起（一个一个冒出来）
   * ============================================================ */
  mainBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = tools.classList.contains('acp-open');
    if (isOpen) {
      tools.classList.remove('acp-open');
      toast('收起工具');
    } else {
      tools.classList.add('acp-open');
      toast('展开工具');
    }
  });

  // 收起按钮（在工具条最下方）
  tHide.addEventListener('click', function (e) {
    e.stopPropagation();
    tools.classList.remove('acp-open');
    toast('收起工具');
  });

  /* ============================================================
   * 五、面板互斥显示
   * ============================================================ */
  function closeAllPanels() {
    ALL_PANELS.forEach(p => p.classList.remove('acp-show'));
    mask.classList.remove('acp-show');
    openPanelEl = null;
  }

  function openPanel(p) {
    if (openPanelEl === p) {
      closeAllPanels();
      return;
    }
    closeAllPanels();
    p.classList.add('acp-show');
    mask.classList.add('acp-show');
    openPanelEl = p;
  }

  // 点遮罩关闭
  mask.addEventListener('click', closeAllPanels);

  // 各面板里的 [data-close] 按钮
  document.querySelectorAll('.acp-panel [data-close]').forEach(btn => {
    btn.addEventListener('click', closeAllPanels);
  });

  /* ============================================================
   * 六、工具按钮点击
   * ============================================================ */

  // ★★★ 返回按钮 —— 完全照搬原 jxh.js 逻辑 ★★★
  tBack.addEventListener('click', function () {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      if (document.referrer) {
        window.location.href = document.referrer;
      } else {
        window.location.href = '/';
      }
    }
  });

  // ★★★ 前进按钮 —— 完全照搬原 jxh.js 逻辑 ★★★
  tForward.addEventListener('click', function () {
    if (window.history.length > 0) {
      window.history.forward();
    } else {
      alert('没有可前进的页面');
    }
  });

  // 录屏
  tRecord.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    openPanel(panelRecord);
  });

  // 截图
  tShot.addEventListener('click', function () {
    takeScreenshot();
  });

  // 链接跳转
  tJump.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    openPanel(panelJump);
  });

  // 文件下载
  tFiles.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    scanFiles();
    openPanel(panelFiles);
  });

  // 链接下载
  tLinkDl.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    openPanel(panelLinkDl);
  });

  // 外观设置
  tColor.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    openPanel(panelColor);
  });

  // 收藏
  tStar.addEventListener('click', function () {
    tools.classList.remove('acp-open');
    renderCollections();
    openPanel(panelStar);
  });

  // 立即停止
  tStop.addEventListener('click', function () {
    stopRecording();
    toast('录屏已立即停止');
  });

  // 延时停止
  tDelayStop.addEventListener('click', function () {
    toast('5 秒后停止录制');
    setTimeout(() => {
      stopRecording();
      toast('录屏已停止');
    }, 5000);
  });

  /* ============================================================
   * 七、拖拽（只有主按钮能拖）
   * ============================================================ */
  let drag = { active: false, moved: false, sx: 0, sy: 0, left: 0, top: 0 };

  mainBtn.addEventListener('mousedown', onDown);
  mainBtn.addEventListener('touchstart', onDown, { passive: true });

  function onDown(e) {
    if (e.type === 'mousedown' && e.button !== 0) return;
    const pt = e.touches ? e.touches[0] : e;
    const rect = root.getBoundingClientRect();
    drag.active = true;
    drag.moved = false;
    drag.sx = pt.clientX;
    drag.sy = pt.clientY;
    drag.left = rect.left;
    drag.top = rect.top;

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }

  function onMove(e) {
    if (!drag.active) return;
    const pt = e.touches ? e.touches[0] : e;
    const dx = pt.clientX - drag.sx;
    const dy = pt.clientY - drag.sy;
    if (!drag.moved) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      drag.moved = true;
    }
    const maxX = window.innerWidth - 60;
    const maxY = window.innerHeight - 60;
    const x = Math.max(0, Math.min(drag.left + dx, maxX));
    const y = Math.max(0, Math.min(drag.top + dy, maxY));
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.right = 'auto';
    if (e.cancelable) e.preventDefault();
  }

  function onUp() {
    drag.active = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    document.removeEventListener('touchmove', onMove);
    document.removeEventListener('touchend', onUp);
  }

  /* ============================================================
   * 八、各功能实现
   * ============================================================ */

  /* ---------- 8.1 录屏 ---------- */
  panelRecord.querySelectorAll('#acp-time-opts .acp-opt').forEach(opt => {
    opt.addEventListener('click', function () {
      panelRecord.querySelectorAll('#acp-time-opts .acp-opt').forEach(o => o.classList.remove('acp-active'));
      this.classList.add('acp-active');
    });
  });
  panelRecord.querySelectorAll('#acp-audio-opts .acp-opt').forEach(opt => {
    opt.addEventListener('click', function () {
      panelRecord.querySelectorAll('#acp-audio-opts .acp-opt').forEach(o => o.classList.remove('acp-active'));
      this.classList.add('acp-active');
      selectedAudio = this.getAttribute('data-audio');
    });
  });
  panelRecord.querySelector('#acp-record-start').addEventListener('click', function () {
    const sel = panelRecord.querySelector('#acp-time-opts .acp-opt.acp-active');
    const time = sel ? parseInt(sel.getAttribute('data-time'), 10) : 0;
    startRecording(time);
  });

  async function startRecording(duration) {
    if (isRecording) { toast('正在录屏中'); return; }
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      toast('当前环境不支持录屏'); return;
    }
    if (typeof MediaRecorder === 'undefined') { toast('浏览器不支持录制'); return; }

    try {
      videoStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: selectedAudio === 'system' || selectedAudio === 'both'
      });

      const streams = [videoStream];

      if (selectedAudio === 'microphone' || selectedAudio === 'both') {
        try {
          audioStream = await navigator.mediaDevices.getUserMedia({
            audio: { echoCancellation: true, noiseSuppression: true }
          });
          streams.push(audioStream);
        } catch (e) { toast('麦克风获取失败'); }
      }

      const combined = new MediaStream();
      streams.forEach(s => s.getTracks().forEach(t => combined.addTrack(t)));

      let mimeType = 'video/webm;codecs=vp9,opus';
      if (!MediaRecorder.isTypeSupported(mimeType)) mimeType = 'video/webm';

      mediaRecorder = new MediaRecorder(combined, {
        mimeType: mimeType,
        videoBitsPerSecond: 5000000
      });
      recordedChunks = [];

      mediaRecorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) recordedChunks.push(e.data);
      };

      mediaRecorder.onstop = function () {
        try {
          const blob = new Blob(recordedChunks, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          const fileName = 'recording-' + Date.now() + '.webm';

          const a = document.createElement('a');
          a.download = fileName;
          a.href = url;
          a.click();

          addCollection('recording', url, '录屏 ' + new Date().toLocaleString(), fileName);
          toast('录屏已保存');
        } catch (e) { toast('保存录屏失败'); }
        finally {
          resetRecording();
        }
      };

      mediaRecorder.onerror = function () { toast('录制出错'); resetRecording(); };

      const vTrack = videoStream.getVideoTracks()[0];
      if (vTrack) {
        vTrack.addEventListener('ended', function () {
          if (isRecording) stopRecording();
        });
      }

      mediaRecorder.start(1000);
      isRecording = true;
      tStop.style.display = '';
      tDelayStop.style.display = '';
      toast('录屏已开始');
      closeAllPanels();

      if (duration > 0) {
        recordingTimer = setTimeout(() => {
          stopRecording();
          toast('定时录屏完成');
        }, duration * 1000);
      }
    } catch (err) {
      console.error('录屏失败:', err);
      toast('录屏失败，请允许屏幕共享');
      resetRecording();
    }
  }

  function stopRecording() {
    if (!mediaRecorder || !isRecording) return;
    try { if (mediaRecorder.state !== 'inactive') mediaRecorder.stop(); } catch (e) {}
    isRecording = false;
    tStop.style.display = 'none';
    tDelayStop.style.display = 'none';
    if (recordingTimer) { clearTimeout(recordingTimer); recordingTimer = null; }
  }

  function resetRecording() {
    isRecording = false;
    mediaRecorder = null;
    recordedChunks = [];
    tStop.style.display = 'none';
    tDelayStop.style.display = 'none';
    if (recordingTimer) { clearTimeout(recordingTimer); recordingTimer = null; }
    if (audioStream) { audioStream.getTracks().forEach(t => t.stop()); audioStream = null; }
    if (videoStream) { videoStream.getTracks().forEach(t => t.stop()); videoStream = null; }
  }

  /* ---------- 8.2 截图 ---------- */
  function takeScreenshot() {
    if (typeof html2canvas === 'undefined') {
      toast('截图库尚未加载');
      return;
    }
    toast('正在生成截图…');
    html2canvas(document.body, {
      useCORS: true,
      allowTaint: true,
      scale: 1,
      logging: false,
      ignoreElements: el => {
        if (!el || !el.className) return false;
        const c = el.className;
        return typeof c === 'string' && (
          c.indexOf('acp-panel-root') > -1 ||
          c.indexOf('acp-panel') > -1 ||
          c.indexOf('acp-dm') > -1 ||
          c.indexOf('acp-status') > -1 ||
          c.indexOf('acp-mask') > -1
        );
      }
    }).then(canvas => {
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      const fileName = 'screenshot-' + Date.now() + '.jpg';
      const a = document.createElement('a');
      a.download = fileName;
      a.href = dataUrl;
      a.click();
      addCollection('screenshot', dataUrl, '截图 ' + new Date().toLocaleString(), fileName);
      toast('截图已保存');
    }).catch(err => {
      console.error('截图失败:', err);
      toast('截图失败');
    });
  }

  /* ---------- 8.3 链接跳转 ---------- */
  panelJump.querySelector('#acp-jump-go').addEventListener('click', function () {
    const input = panelJump.querySelector('#acp-jump-url');
    let url = (input.value || '').trim();
    if (!url) { toast('请输入网址'); return; }
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    try { new URL(url); } catch (e) { toast('网址格式不正确'); return; }
    toast('正在跳转…');
    setTimeout(() => { window.location.href = url; }, 500);
  });
  panelJump.querySelectorAll('#acp-jump-quick .acp-opt').forEach(b => {
    b.addEventListener('click', function () {
      const u = this.getAttribute('data-url');
      const input = panelJump.querySelector('#acp-jump-url');
      if (input && u) input.value = u;
    });
  });

  /* ---------- 8.4 链接下载 ---------- */
  panelLinkDl.querySelector('#acp-dl-go').addEventListener('click', function () {
    const urlInput = panelLinkDl.querySelector('#acp-dl-url');
    const nameInput = panelLinkDl.querySelector('#acp-dl-name');
    let url = (urlInput.value || '').trim();
    if (!url) { toast('请输入下载链接'); return; }
    if (!/^https?:\/\//i.test(url) && url.indexOf('blob:') !== 0) url = 'https://' + url;
    let name = (nameInput.value || '').trim();
    if (!name) {
      try {
        const path = new URL(url).pathname;
        name = path.split('/').pop() || 'download';
      } catch (e) { name = 'download'; }
    }
    doDownload(url, name);
    closeAllPanels();
  });

  /* ---------- 8.5 文件扫描 ---------- */
  let scanResults = [];
  let currentTab = 'all';

  panelFiles.querySelectorAll('#acp-file-tabs .acp-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      panelFiles.querySelectorAll('#acp-file-tabs .acp-tab').forEach(t => t.classList.remove('acp-active'));
      this.classList.add('acp-active');
      currentTab = this.getAttribute('data-tab') || 'all';
      renderFiles();
    });
  });

  panelFiles.querySelector('#acp-rescan').addEventListener('click', function () {
    scanFiles();
    toast('已重新扫描');
  });

  function scanFiles() {
    const found = [];
    const seen = {};

    function push(url, name, cat) {
      if (!url || typeof url !== 'string') return;
      if (url.indexOf('data:') === 0) return;
      if (seen[url]) return;
      seen[url] = true;
      found.push({ url, name: name || fileNameFromUrl(url), category: cat, ...getCatMeta(cat) });
    }

    document.querySelectorAll('a[href]').forEach(a => {
      const href = a.href || '';
      if (!href) return;
      if (/^(javascript|mailto|tel):/i.test(href)) return;
      if (href.charAt(0) === '#') return;
      const ext = getExt(href);
      if (!ext) return;
      const cat = getExtCat(ext);
      if (!cat) return;
      const txt = (a.textContent || '').replace(/\s+/g, ' ').trim();
      push(href, txt || a.getAttribute('download') || fileNameFromUrl(href), cat);
    });

    document.querySelectorAll('video, audio').forEach(m => {
      const src = m.currentSrc || m.src;
      if (!src) return;
      const tag = (m.tagName || '').toLowerCase();
      push(src, fileNameFromUrl(src) || (tag === 'audio' ? '音频文件' : '视频文件'), tag === 'audio' ? 'audio' : 'video');
    });

    document.querySelectorAll('img').forEach(img => {
      const src = img.currentSrc || img.src;
      if (!src) return;
      if (src.indexOf('data:') === 0) return;
      push(src, img.alt || fileNameFromUrl(src) || '图片', 'image');
    });

    scanResults = found;
    renderFiles();
  }

  function renderFiles() {
    const list = panelFiles.querySelector('#acp-file-list');
    if (!list) return;
    const data = currentTab === 'all' ? scanResults : scanResults.filter(f => f.category === currentTab);
    if (!data.length) {
      list.innerHTML = '<div class="acp-empty">未找到可下载文件</div>';
      return;
    }
    list.innerHTML = '';
    data.forEach(f => {
      const el = document.createElement('div');
      el.className = 'acp-file-item';
      el.innerHTML = `
        <div class="acp-file-icon" style="background:${f.color}">${f.icon}</div>
        <div class="acp-file-info">
          <div class="acp-file-name">${f.name}</div>
          <div class="acp-file-url">${f.url}</div>
        </div>
        <button class="acp-file-dl">下载</button>
      `;
      el.querySelector('.acp-file-dl').addEventListener('click', () => {
        doDownload(f.url, f.name);
      });
      list.appendChild(el);
    });
  }

  function getExt(url) {
    try {
      const clean = String(url).split('#')[0].split('?')[0];
      const name = clean.substring(clean.lastIndexOf('/') + 1);
      const dot = name.lastIndexOf('.');
      return dot > -1 ? name.substring(dot).toLowerCase() : '';
    } catch (e) { return ''; }
  }

  function getExtCat(ext) {
    if (['.mp4','.avi','.mov','.wmv','.flv','.webm','.mkv','.m4v','.mpg','.mpeg'].indexOf(ext) > -1) return 'video';
    if (['.mp3','.wav','.ogg','.flac','.aac','.m4a','.wma'].indexOf(ext) > -1) return 'audio';
    if (['.jpg','.jpeg','.png','.gif','.bmp','.webp','.svg','.ico'].indexOf(ext) > -1) return 'image';
    if (['.pdf','.doc','.docx','.xls','.xlsx','.ppt','.pptx','.txt','.rtf','.csv'].indexOf(ext) > -1) return 'document';
    if (['.zip','.rar','.7z','.tar','.gz','.bz2'].indexOf(ext) > -1) return 'archive';
    if (['.exe','.msi','.dmg','.pkg','.deb','.rpm','.apk'].indexOf(ext) > -1) return 'software';
    return null;
  }

  function getCatMeta(cat) {
    const m = {
      video:    { icon: '🎥', color: '#ff6b6b' },
      audio:    { icon: '🎵', color: '#4ecdc4' },
      image:    { icon: '🖼️', color: '#5fc9c0' },
      document: { icon: '📄', color: '#b06ab3' },
      archive:  { icon: '📦', color: '#fd746c' },
      software: { icon: '💻', color: '#667eea' },
      other:    { icon: '📎', color: '#95a5a6' }
    };
    return m[cat] || m.other;
  }

  function fileNameFromUrl(url) {
    try {
      const clean = String(url).split('#')[0].split('?')[0];
      return decodeURIComponent(clean.substring(clean.lastIndexOf('/') + 1)) || 'download';
    } catch (e) { return 'download'; }
  }

  /* ---------- 8.6 下载 ---------- */
  function doDownload(url, name) {
    const a = document.createElement('a');
    a.href = url;
    a.download = name || 'download';
    a.target = '_blank';
    a.rel = 'noopener';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { try { document.body.removeChild(a); } catch (e) {} }, 100);

    const id = Date.now();
    downloadTasks.push({ id, name: name || 'download', url, progress: 0, status: 'downloading' });
    if (downloadTasks.length > 40) downloadTasks.shift();
    try { localStorage.setItem('acp_tasks', JSON.stringify(downloadTasks)); } catch (e) {}
    renderTasks();
    dm.classList.add('acp-show');

    // 模拟进度
    let p = 0;
    const timer = setInterval(() => {
      p += Math.random() * 12;
      const idx = downloadTasks.findIndex(t => t.id === id);
      if (idx === -1) { clearInterval(timer); return; }
      if (p >= 100) {
        p = 100;
        clearInterval(timer);
        downloadTasks[idx].status = 'completed';
        downloadTasks[idx].progress = 100;
      } else {
        downloadTasks[idx].progress = Math.round(p);
      }
      try { localStorage.setItem('acp_tasks', JSON.stringify(downloadTasks)); } catch (e) {}
      renderTasks();
    }, 220);

    toast('下载已开始：' + (name || 'download'));
  }

  function renderTasks() {
    const list = dm.querySelector('#acp-dm-list');
    if (!list) return;
    if (!downloadTasks.length) {
      list.innerHTML = '<div class="acp-empty">暂无下载任务</div>';
      return;
    }
    list.innerHTML = '';
    downloadTasks.forEach(t => {
      const el = document.createElement('div');
      el.className = 'acp-dm-task';
      let st = '';
      if (t.status === 'downloading') st = '下载中 ' + (t.progress || 0) + '%';
      else if (t.status === 'completed') st = '已完成';
      el.innerHTML = `
        <div class="acp-dm-row">
          <div class="acp-dm-name">${t.name}</div>
          <div class="acp-dm-status">${st}</div>
        </div>
        <div class="acp-dm-bar">
          <div class="acp-dm-fill" style="width:${t.status === 'completed' ? 100 : (t.progress || 0)}%"></div>
        </div>
      `;
      list.appendChild(el);
    });
  }

  dm.querySelector('#acp-dm-close').addEventListener('click', () => {
    dm.classList.remove('acp-show');
  });

  /* ---------- 8.7 外观 ---------- */

  // 3D 角色
  const SKINS = [
    { id: 'gear',    emoji: '⚙️', name: '齿轮',   anim: 'acp-spin' },
    { id: 'fish',    emoji: '🐟', name: '小鱼',   anim: 'acp-float' },
    { id: 'tropical',emoji: '🐠', name: '热带鱼', anim: 'acp-swim' },
    { id: 'bear',    emoji: '🐻', name: '小熊',   anim: 'acp-bounce' },
    { id: 'cat',     emoji: '🐱', name: '小猫',   anim: 'acp-wiggle' },
    { id: 'rabbit',  emoji: '🐰', name: '小兔',   anim: 'acp-hop' },
    { id: 'panda',   emoji: '🐼', name: '熊猫',   anim: 'acp-roll' },
    { id: 'penguin', emoji: '🐧', name: '企鹅',   anim: 'acp-waddle' },
    { id: 'fox',     emoji: '🦊', name: '小狐',   anim: 'acp-float' },
    { id: 'frog',    emoji: '🐸', name: '青蛙',   anim: 'acp-hop' },
    { id: 'monkey',  emoji: '🐵', name: '猴子',   anim: 'acp-wiggle' },
    { id: 'unicorn', emoji: '🦄', name: '独角兽', anim: 'acp-magic' },
    { id: 'dolphin', emoji: '🐬', name: '海豚',   anim: 'acp-swim' },
    { id: 'whale',   emoji: '🐳', name: '鲸鱼',   anim: 'acp-float' },
    { id: 'smile',   emoji: '😊', name: '笑脸',   anim: 'acp-pulse' },
    { id: 'kiss',    emoji: '😘', name: '飞吻',   anim: 'acp-heartbeat' },
    { id: 'cool',    emoji: '😎', name: '酷盖',   anim: 'acp-pulse' },
    { id: 'flower',  emoji: '🌸', name: '花朵',   anim: 'acp-sway' },
    { id: 'star',    emoji: '⭐', name: '星星',   anim: 'acp-twinkle' },
    { id: 'heart',   emoji: '💖', name: '爱心',   anim: 'acp-heartbeat' },
    { id: 'rainbow', emoji: '🌈', name: '彩虹',   anim: 'acp-sway' },
    { id: 'rocket',  emoji: '🚀', name: '火箭',   anim: 'acp-launch' },
    { id: 'fire',    emoji: '🔥', name: '火焰',   anim: 'acp-twinkle' },
    { id: 'crown',   emoji: '👑', name: '皇冠',   anim: 'acp-pulse' }
  ];

  // 把皮肤动画的关键帧注入到 style 里（避免皮肤表情不动）
  const skinStyle = document.createElement('style');
  skinStyle.textContent = `
  @keyframes acp-spin      { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes acp-float     { 0%,100% { transform: translateY(0) rotate(-3deg); } 50% { transform: translateY(-5px) rotate(3deg); } }
  @keyframes acp-swim      { 0%,100% { transform: translateX(0) rotate(0deg); } 25% { transform: translateX(-4px) rotate(-12deg); } 75% { transform: translateX(4px) rotate(12deg); } }
  @keyframes acp-bounce    { 0%,100% { transform: translateY(0) scale(1); } 40% { transform: translateY(-8px) scale(1.08); } 60% { transform: translateY(-6px) scale(1.05); } }
  @keyframes acp-wiggle    { 0%,100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } }
  @keyframes acp-hop       { 0%,100% { transform: translateY(0) rotate(0deg); } 30% { transform: translateY(-10px) rotate(15deg); } 60% { transform: translateY(0) rotate(-15deg); } }
  @keyframes acp-roll      { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes acp-waddle    { 0%,100% { transform: rotate(-10deg) translateX(-2px); } 50% { transform: rotate(10deg) translateX(2px); } }
  @keyframes acp-pulse     { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }
  @keyframes acp-sway      { 0%,100% { transform: rotate(-6deg); } 50% { transform: rotate(6deg); } }
  @keyframes acp-twinkle   { 0%,100% { transform: scale(1) rotate(0deg); } 50% { transform: scale(1.15) rotate(180deg); } }
  @keyframes acp-heartbeat { 0%,100% { transform: scale(1); } 14% { transform: scale(1.18); } 28% { transform: scale(1); } 42% { transform: scale(1.18); } 70% { transform: scale(1); } }
  @keyframes acp-magic     { 0% { transform: rotateY(0deg) scale(1); } 50% { transform: rotateY(180deg) scale(1.12); } 100% { transform: rotateY(360deg) scale(1); } }
  @keyframes acp-launch    { 0%,100% { transform: translateY(0) rotate(-20deg); } 50% { transform: translateY(-8px) rotate(-20deg) scale(1.06); } }
  `;
  document.head.appendChild(skinStyle);

  function buildSkinGrid() {
    const grid = panelColor.querySelector('#acp-skin-grid');
    if (!grid) return;
    grid.innerHTML = '';

    SKINS.forEach(skin => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'acp-skin-card';
      card.setAttribute('data-skin', skin.id);

      const emoji = document.createElement('span');
      emoji.className = 'acp-skin-emoji';
      emoji.textContent = skin.emoji;

      const name = document.createElement('span');
      name.className = 'acp-skin-name';
      name.textContent = skin.name;

      card.appendChild(emoji);
      card.appendChild(name);

      card.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        applySkin(skin.id);
        toast('已切换到：' + skin.name);
      });

      grid.appendChild(card);
    });
  }

  function applySkin(skinId) {
    const skin = SKINS.find(s => s.id === skinId) || SKINS[0];
    currentSkin = skin.id;

    // 主按钮：换 emoji，换动画
    mainBtn.textContent = skin.emoji;
    mainBtn.title = '控制面板 · ' + skin.name;

    mainBtn.style.setProperty('animation', 'none');
    void mainBtn.offsetWidth;
    mainBtn.style.setProperty('animation', skin.anim + ' 3s ease-in-out infinite', 'important');

    try { localStorage.setItem('acp_skin', skin.id); } catch (e) {}

    // 高亮
    panelColor.querySelectorAll('.acp-skin-card').forEach(card => {
      card.classList.toggle('acp-active', card.getAttribute('data-skin') === skin.id);
    });
  }

  function loadSkin() {
    let saved = 'gear';
    try { saved = localStorage.getItem('acp_skin') || 'gear'; } catch (e) {}
    applySkin(saved);
  }

  // 工具图标更换
  const TOOL_ICONS_OPTIONS = {
    back:       ['←', '◀', '⬅️', '🔙', '↩️', '⏪'],
    forward:    ['→', '▶', '➡️', '🔜', '↪️', '⏩'],
    record:     ['⏺', '⏺️', '🎬', '📹', '🎥', '🔴'],
    screenshot: ['📷', '📸', '🖼️', '💻', '🖥️', '✨'],
    jump:       ['🌐', '🔗', '🧭', '🗺️', '🚀', '🔍'],
    files:      ['📂', '📁', '🗂️', '📦', '💾', '📋'],
    linkdl:     ['⬇️', '📥', '💾', '📩', '🎁', '📤'],
    color:      ['🎨', '🌈', '🎭', '🖌️', '✨', '💄'],
    star:       ['⭐', '🌟', '💫', '❤️', '📌', '🔖']
  };

  const TOOL_LABELS = {
    back: '返回', forward: '前进', record: '录屏',
    screenshot: '截图', jump: '跳转', files: '文件',
    linkdl: '链接下载', color: '外观', star: '收藏'
  };

  const TOOL_BUTTONS = {
    back: tBack, forward: tForward, record: tRecord,
    screenshot: tShot, jump: tJump, files: tFiles,
    linkdl: tLinkDl, color: tColor, star: tStar
  };

  let toolIcons = {
    back: '←', forward: '→', record: '⏺',
    screenshot: '📷', jump: '🌐', files: '📂',
    linkdl: '⬇️', color: '🎨', star: '⭐'
  };

  function buildIconGrid() {
    const grid = panelColor.querySelector('#acp-icon-grid');
    if (!grid) return;
    grid.innerHTML = '';

    Object.keys(TOOL_ICONS_OPTIONS).forEach(toolKey => {
      const row = document.createElement('div');
      row.className = 'acp-icon-row';

      const label = document.createElement('span');
      label.className = 'acp-icon-label';
      label.textContent = TOOL_LABELS[toolKey] || toolKey;

      const opts = document.createElement('div');
      opts.className = 'acp-icon-opts';

      TOOL_ICONS_OPTIONS[toolKey].forEach(icon => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'acp-icon-opt';
        btn.setAttribute('data-tool', toolKey);
        btn.setAttribute('data-icon', icon);
        btn.textContent = icon;

        if (toolIcons[toolKey] === icon) btn.classList.add('acp-active');

        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          applyToolIcon(toolKey, icon);
          toast(TOOL_LABELS[toolKey] + ' 图标已更换');
        });

        opts.appendChild(btn);
      });

      row.appendChild(label);
      row.appendChild(opts);
      grid.appendChild(row);
    });
  }

  function applyToolIcon(toolKey, icon) {
    if (!TOOL_BUTTONS[toolKey]) return;
    TOOL_BUTTONS[toolKey].textContent = icon;
    toolIcons[toolKey] = icon;

    try { localStorage.setItem('acp_tool_icons', JSON.stringify(toolIcons)); } catch (e) {}

    panelColor.querySelectorAll('.acp-icon-opt[data-tool="' + toolKey + '"]').forEach(o => {
      o.classList.toggle('acp-active', o.getAttribute('data-icon') === icon);
    });
  }

  function loadToolIcons() {
    let saved = null;
    try {
      const raw = localStorage.getItem('acp_tool_icons');
      if (raw) saved = JSON.parse(raw);
    } catch (e) {}

    if (saved && typeof saved === 'object') {
      Object.keys(saved).forEach(k => {
        if (toolIcons[k] !== undefined && saved[k]) toolIcons[k] = saved[k];
      });
    }

    Object.keys(toolIcons).forEach(k => {
      if (TOOL_BUTTONS[k]) TOOL_BUTTONS[k].textContent = toolIcons[k];
    });
    panelColor.querySelectorAll('.acp-icon-opt').forEach(o => {
      const k = o.getAttribute('data-tool');
      o.classList.toggle('acp-active', o.getAttribute('data-icon') === toolIcons[k]);
    });
  }

  // 颜色
  function applyCustomColor(color) {
    mainBtn.style.background = color;

    [tBack, tForward, tRecord, tShot, tJump, tFiles, tLinkDl].forEach(b => {
      b.style.background = color;
    });

    try { localStorage.setItem('acp_color', color); } catch (e) {}
  }

  function loadColor() {
    let saved = null;
    try { saved = localStorage.getItem('acp_color'); } catch (e) {}
    if (saved) applyCustomColor(saved);
  }

  panelColor.querySelectorAll('.acp-color-dot').forEach(dot => {
    dot.addEventListener('click', function () {
      const c = this.getAttribute('data-color');
      if (c) {
        applyCustomColor(c);
        toast('颜色已更新');
      }
    });
  });

  const colorInput = panelColor.querySelector('#acp-color-input');
  colorInput.addEventListener('input', function () {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.value);
    if (m) {
      const color = 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',0.9)';
      applyCustomColor(color);
    }
  });

  panelColor.querySelector('#acp-color-reset').addEventListener('click', function () {
    mainBtn.style.background = '';
    [tBack, tForward, tRecord, tShot, tJump, tFiles, tLinkDl].forEach(b => {
      b.style.background = '';
    });
    try { localStorage.removeItem('acp_color'); } catch (e) {}
    toast('已恢复默认配色');
  });

  // 尺寸
  function applySize(size) {
    currentSize = size;
    const small = size === 'small';
    const large = size === 'large';

    const mw = small ? '44px' : (large ? '60px' : '');
    const mh = small ? '44px' : (large ? '60px' : '');
    const mf = small ? '22px' : (large ? '30px' : '');
    if (mw) { mainBtn.style.width = mw; mainBtn.style.height = mh; mainBtn.style.fontSize = mf; }
    else { mainBtn.style.width = ''; mainBtn.style.height = ''; mainBtn.style.fontSize = ''; }

    const tw = small ? '36px' : (large ? '52px' : '');
    const th = small ? '36px' : (large ? '52px' : '');
    const tf = small ? '15px' : (large ? '22px' : '');
    [tBack, tForward, tRecord, tShot, tJump, tFiles, tLinkDl, tColor, tStar, tStop, tDelayStop, tHide].forEach(b => {
      if (tw) { b.style.width = tw; b.style.height = th; b.style.fontSize = tf; }
      else { b.style.width = ''; b.style.height = ''; b.style.fontSize = ''; }
    });

    try { localStorage.setItem('acp_size', size); } catch (e) {}

    panelColor.querySelectorAll('#acp-size-opts .acp-opt').forEach(o => {
      o.classList.toggle('acp-active', o.getAttribute('data-size') === size);
    });
  }

  panelColor.querySelectorAll('#acp-size-opts .acp-opt').forEach(opt => {
    opt.addEventListener('click', function () {
      panelColor.querySelectorAll('#acp-size-opts .acp-opt').forEach(o => o.classList.remove('acp-active'));
      this.classList.add('acp-active');
      applySize(this.getAttribute('data-size'));
      toast('按钮大小已更新');
    });
  });

  function loadSize() {
    let saved = 'medium';
    try { saved = localStorage.getItem('acp_size') || 'medium'; } catch (e) {}
    applySize(saved);
  }

  /* ---------- 8.8 收藏 ---------- */
  function addCollection(type, url, title, fileName) {
    collections.unshift({
      id: Date.now() + Math.random().toString(36).slice(2, 6),
      type, url, title, fileName,
      date: new Date().toISOString()
    });
    if (collections.length > 60) collections.length = 60;
    try {
      localStorage.setItem('acp_collections', JSON.stringify(collections));
    } catch (e) {
      collections = collections.slice(0, 5);
      try { localStorage.setItem('acp_collections', JSON.stringify(collections)); } catch (e2) {}
    }
  }

  function renderCollections() {
    const list = panelStar.querySelector('#acp-collection-list');
    if (!list) return;
    if (!collections.length) {
      list.innerHTML = '<div class="acp-empty">暂无收藏内容</div>';
      return;
    }
    list.innerHTML = '';
    collections.forEach(item => {
      const el = document.createElement('div');
      el.className = 'acp-file-item';
      el.innerHTML = `
        <div class="acp-file-icon" style="background:linear-gradient(135deg,#667eea,#764ba2)">
          ${item.type === 'screenshot' ? '📷' : '🎬'}
        </div>
        <div class="acp-file-info">
          <div class="acp-file-name">${item.title}</div>
          <div class="acp-file-url">${new Date(item.date).toLocaleString()}</div>
        </div>
        <button class="acp-file-dl">保存</button>
      `;
      el.querySelector('.acp-file-dl').addEventListener('click', () => {
        const a = document.createElement('a');
        a.download = item.fileName || 'download';
        a.href = item.url;
        a.click();
        toast('已开始保存');
      });
      list.appendChild(el);
    });
  }

  panelStar.querySelector('#acp-clear-star').addEventListener('click', function () {
    if (!collections.length) { toast('收藏已经是空的'); return; }
    if (!confirm('确定要清空全部收藏吗？')) return;
    collections = [];
    try { localStorage.removeItem('acp_collections'); } catch (e) {}
    renderCollections();
    toast('收藏已清空');
  });

  /* ============================================================
   * 九、初始化
   * ============================================================ */
  buildSkinGrid();
  buildIconGrid();
  loadSkin();
  loadToolIcons();
  loadColor();
  loadSize();
  renderTasks();

  console.log('控制面板已加载 —— 点击 ⚙️ 展开工具');
}

// 添加必要的库
const script1 = document.createElement('script');
script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
document.head.appendChild(script1);