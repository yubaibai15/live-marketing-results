# 直播营销策划成果

这是 GitHub 网页上传专用部署目录，文件数量已控制在 GitHub 单次上传上限以内。

## 腾讯云 CloudBase

使用 Dockerfile 构建；外部访问端口设 `80`，容器端口设 `8000`。

## DeepSeek V4 Flash 对话

在 CloudBase 的“环境变量设置”中添加以下三项。密钥仅填写在腾讯云，不要上传到 GitHub：

```text
LLM_API_KEY=你的 DeepSeek API Key
LLM_BASE_URL=https://api.deepseek.com
LLM_MODEL=deepseek-v4-flash
```

输入“发布平台”“直播脚本策划 xmind”等已有资料时，页面会自动打开对应内容；其他普通问题会发送给 DeepSeek V4 Flash 回答。

部署完成后访问根路径 `/`。输入“发布平台”“直播脚本策划 xmind”“全年营销日历”或知识库关键词会自动打开对应结果页。
