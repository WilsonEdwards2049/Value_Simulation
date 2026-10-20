# Value Simulation（价值观模拟器）

## 重要：遇到「工具调用参数缺失」报错先看这里

**现象**：部分模型（本仓库中确认 `gpt-6.1-sol` 会出现）在调用 Bash / Glob / Read 等工具时，生成的请求缺少必填参数（如 `command`、`pattern`、`file_path`），返回类似：

```
InputValidationError: The required parameter `command` is missing.
```

**关键点**：这类报错发生在工具调用阶段，此时**根本没有访问项目文件**，与项目是否损坏、路径是否正确无关。本仓库的文件、`npm run dev`、构建均正常（dev server 已验证返回 HTTP 200）。

**处理**：这是模型生成工具参数的问题。切换到 `claude-sonnet-4-6`（已验证工具调用正常）后重试即可。不要因为该报错就判断「项目打不开」，也不要因此删除或重建项目文件。

---

## 项目结构

- `frontend/` — Vite + React + TypeScript + Tailwind + Zustand
- `frontend/src/data/cases.json` — 案例数据
- `frontend/src/data/values.json` — 价值观数据
- `frontend/src/engine/` — 案例选择、比较、会话逻辑
- `价值观模拟器.html` — 单文件构建产物，可直接双击打开

## 本地运行

```bash
cd frontend
npm install
npm run dev          # 开发服务器
npm run build        # 常规构建
npm run build:single # 生成根目录下的「价值观模拟器.html」
```
