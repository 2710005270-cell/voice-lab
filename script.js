// ========== DeepSeek API 配置 ==========
// 请在这里输入您的 DeepSeek API Key
// 如果没有，请访问 https://platform.deepseek.com 注册获取
let 用户API密钥 = '';

// 设置 API Key 的函数
function 设置API密钥() {
    const key = document.getElementById('apiKeyInput')?.value;
    if (key && key.trim()) {
        用户API密钥 = key.trim();
        localStorage.setItem('deepseek_api_key', 用户API密钥);
        显示提示('✅ API Key 已保存！现在可以使用语音分析了。');
        return true;
    } else {
        显示提示('❌ 请输入有效的 API Key');
        return false;
    }
}

// 从本地存储加载保存的 API Key
function 加载API密钥() {
    const savedKey = localStorage.getItem('deepseek_api_key');
    if (savedKey) {
        用户API密钥 = savedKey;
        const inputEl = document.getElementById('apiKeyInput');
        if (inputEl) inputEl.value = savedKey;
        return true;
    }
    return false;
}

// ========== 调用 DeepSeek API ==========
async function 调用DeepSeek分析(文字) {
    if (!文字.trim()) {
        return '请输入或录音一些文字再分析吧！';
    }
    
    if (!用户API密钥) {
        return '⚠️ 请先在上方输入您的 DeepSeek API Key！\n\n获取地址：https://platform.deepseek.com';
    }
    
    // 显示加载状态
    const 结果区域 = document.getElementById('分析结果');
    if (结果区域) {
        结果区域.innerHTML = '<p>🤔 AI 正在分析中，请稍候...</p>';
    }
    
    try {
        const 响应 = await fetch('https://api.deepseek.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${用户API密钥}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [
                    { 
                        role: 'system', 
                        content: '你是专业的语音分析助手，请分析用户语音转写的文本，给出情感倾向、关键词提取、主题分类等分析结果。回答要简洁清晰。' 
                    },
                    { 
                        role: 'user', 
                        content: `请分析以下文字，给出：
1. 情感倾向（正面/负面/中性）
2. 关键词（3-5个）
3. 主题分类
4. 简短总结

文字内容：${文字}` 
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });
        
        const 数据 = await 响应.json();
        
        if (数据.choices && 数据.choices[0]) {
            return 数据.choices[0].message.content;
        } else if (数据.error) {
            return `API 错误：${数据.error.message}`;
        } else {
            return '分析失败，请重试';
        }
    } catch (错误) {
        console.error('API 调用失败:', 错误);
        return `网络错误：${错误.message}`;
    }
}

// ========== 浏览器语音识别（录音转文字） ==========
let 语音识别器 = null;
let 是否录音中 = false;

function 初始化语音识别() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        alert('您的浏览器不支持语音识别，请使用 Chrome 或 Edge 浏览器');
        return false;
    }
    
    const 识别类 = window.SpeechRecognition || window.webkitSpeechRecognition;
    语音识别器 = new 识别类();
    
    语音识别器.continuous = true;
    语音识别器.interimResults = true;
    语音识别器.lang = 'zh-CN';
    
    语音识别器.onresult = async (事件) => {
        let 识别文字 = '';
        for (let i = 事件.resultIndex; i < 事件.results.length; i++) {
            识别文字 += 事件.results[i][0].transcript;
        }
        const 文本框 = document.getElementById('语音文字');
        if (文本框) 文本框.value = 识别文字;
        
        if (识别文字.trim()) {
            const 分析结果 = await 调用DeepSeek分析(识别文字);
            显示分析结果(分析结果);
        }
    };
    
    语音识别器.onerror = (事件) => {
        console.error('识别错误:', 事件.error);
        是否录音中 = false;
        更新录音按钮(false);
        if (事件.error === 'not-allowed') {
            alert('请允许麦克风权限以便使用录音功能');
        }
    };
    
    语音识别器.onend = () => {
        是否录音中 = false;
        更新录音按钮(false);
    };
    
    return true;
}

function 切换录音() {
    if (!语音识别器) {
        if (!初始化语音识别()) return;
    }
    
    if (是否录音中) {
        语音识别器.stop();
    } else {
        语音识别器.start();
        是否录音中 = true;
        更新录音按钮(true);
    }
}

function 更新录音按钮(录音中) {
    const 按钮 = document.getElementById('录音按钮');
    if (按钮) {
        按钮.textContent = 录音中 ? '🔴 录音中... 点击停止' : '🎙️ 开始录音';
        按钮.style.backgroundColor = 录音中 ? '#ff4444' : '#4CAF50';
    }
}

async function 手动分析() {
    const 文本框 = document.getElementById('语音文字');
    const 文字 = 文本框?.value || '';
    if (!文字.trim()) {
        显示分析结果('请先输入或录音一些文字！');
        return;
    }
    const 分析结果 = await 调用DeepSeek分析(文字);
    显示分析结果(分析结果);
}

function 显示分析结果(内容) {
    const 结果区域 = document.getElementById('分析结果');
    if (结果区域) {
        结果区域.innerHTML = `
            <h4>📊 DeepSeek 分析结果：</h4>
            <div style="white-space: pre-wrap; line-height: 1.6;">${内容}</div>
        `;
    }
}

function 显示提示(消息) {
    const 结果区域 = document.getElementById('分析结果');
    if (结果区域) {
        结果区域.innerHTML = `<p style="color: #666;">${消息}</p>`;
    }
    setTimeout(() => {
        if (结果区域 && 结果区域.innerHTML.includes(消息)) {
            结果区域.innerHTML = '<p style="color: #888;">等待分析...</p>';
        }
    }, 3000);
}

function 分析音频文件(文件) {
    const 结果区域 = document.getElementById('分析结果');
    if (结果区域) {
        结果区域.innerHTML = `
            <h4>📁 音频文件信息：</h4>
            <p><strong>文件名：</strong> ${文件.name}</p>
            <p><strong>文件大小：</strong> ${(文件.size / 1024).toFixed(2)} KB</p>
            <p><strong>文件类型：</strong> ${文件.type || '未知'}</p>
            <hr>
            <p>🎤 请点击「开始录音」或手动输入听到的内容，AI 会进行分析。</p>
        `;
    }
    
    const 音频地址 = URL.createObjectURL(文件);
    const 播放器 = new Audio(音频地址);
    if (confirm('是否播放此音频？播放后请将听到的内容填入文本框。')) {
        播放器.play();
    }
}

// ========== 页面加载 ==========
document.addEventListener('DOMContentLoaded', () => {
    let 容器 = document.querySelector('.input-area');
    if (!容器) {
        容器 = document.querySelector('main') || document.body;
    }
    
    const 已有UI = document.getElementById('语音分析界面');
    if (!已有UI) {
        const 界面HTML = `
            <div id="语音分析界面" style="margin: 20px 0; padding: 20px; background: #f8f9fa; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h3 style="margin-top: 0;">🎤 语音分析助手</h3>
                
                <div style="margin: 15px 0; padding: 15px; background: #e3f2fd; border-radius: 8px;">
                    <label style="font-weight: bold;">🔑 DeepSeek API Key：</label>
                    <input type="password" id="apiKeyInput" placeholder="请输入您的 DeepSeek API Key" style="width: 70%; padding: 10px; margin: 10px 0; border-radius: 6px; border: 1px solid #ccc;">
                    <button id="保存密钥按钮" style="padding: 10px 20px; background: #2196F3; color: white; border: none; border-radius: 6px; cursor: pointer;">保存</button>
                    <p style="font-size: 12px; color: #666; margin-top: 8px;">没有 API Key？ <a href="https://platform.deepseek.com" target="_blank">点击这里免费注册获取</a>（新用户有赠送额度）</p>
                </div>
                
                <div style="margin: 15px 0; display: flex; gap: 10px; flex-wrap: wrap;">
                    <button id="录音按钮" style="padding: 12px 24px; font-size: 16px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer;">🎙️ 开始录音</button>
                    <button id="分析按钮" style="padding: 12px 24px; font-size: 16px; background: #2196F3; color: white; border: none; border-radius: 8px; cursor: pointer;">🔍 分析文字</button>
                    <button id="上传按钮" style="padding: 12px 24px; font-size: 16px; background: #FF9800; color: white; border: none; border-radius: 8px; cursor: pointer;">📂 上传音频</button>
                    <input type="file" id="音频文件上传" accept="audio/*" style="display: none;">
                </div>
                
                <textarea id="语音文字" rows="3" placeholder="点击「开始录音」并说话，识别结果会显示在这里...也可以直接输入文字点击「分析文字」" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #ddd; font-size: 14px; box-sizing: border-box;"></textarea>
                
                <div id="分析结果" style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; border: 1px solid #e0e0e0; min-height: 150px;">
                    <p style="color: #888;">等待分析...</p>
                </div>
                
                <p style="font-size: 12px; color: #999; margin-top: 15px; text-align: center;">💡 提示：录音功能在 Chrome 或 Edge 浏览器中效果最佳 | API Key 仅保存在您的浏览器中</p>
            </div>
        `;
        容器.insertAdjacentHTML('beforeend', 界面HTML);
    }
    
    // 绑定事件
    const 录音按钮 = document.getElementById('录音按钮');
    const 分析按钮 = document.getElementById('分析按钮');
    const 上传按钮 = document.getElementById('上传按钮');
    const 文件上传 = document.getElementById('音频文件上传');
    const 保存密钥按钮 = document.getElementById('保存密钥按钮');
    
    if (录音按钮) 录音按钮.onclick = 切换录音;
    if (分析按钮) 分析按钮.onclick = 手动分析;
    if (上传按钮) 上传按钮.onclick = () => 文件上传?.click();
    if (文件上传) 文件上传.onchange = (事件) => {
        if (事件.target.files.length > 0) {
            分析音频文件(事件.target.files[0]);
        }
    };
    if (保存密钥按钮) 保存密钥按钮.onclick = 设置API密钥;
    
    // 加载保存的 API Key
    加载API密钥();
    初始化语音识别();
});