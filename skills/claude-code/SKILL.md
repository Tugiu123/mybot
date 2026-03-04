---
name: claude-code
description: Claude Code AI 编程助手集成。用于调用 Claude Code 执行代码开发、修复 bug、自动化任务、Git 操作等。
---

# Claude Code Skill

## 概述

Claude Code 是一个 AI 编程助手，可以帮助你：
- 编写和修改代码
- 修复 bug
- 自动化开发任务
- 执行 Git 操作
- 运行测试

## 使用场景

当需要以下操作时使用此 skill：

1. **代码开发**
   - 实现新功能
   - 重构代码
   - 编写测试

2. **Bug 修复**
   - 分析错误信息
   - 追踪问题
   - 修复 bug

3. **Git 操作**
   - 创建提交
   - 创建分支
   - 解决冲突

4. **自动化任务**
   - 批量修改文件
   - 运行 lint/format
   - 更新依赖

## 使用方法

### 基本命令

```bash
# 在当前目录启动 Claude Code
claude

# 执行特定任务
claude "你的任务描述"

# 管道式输入
cat file.txt | claude -p "分析这个文件"

# 使用项目根目录
claude --print "任务" > output.txt
```

### 常用任务示例

```bash
# 编写测试
claude "write tests for the auth module"

# 修复 bug
claude "fix the login issue: Error: Cannot read property 'token' of undefined"

# 代码审查
claude "review these files for security issues"

# 创建提交
claude "commit my changes with a descriptive message"

# 运行并修复测试
claude "run tests and fix any failures"
```

## CLI 参考

| 命令 | 说明 |
|------|------|
| `claude` | 启动交互式会话 |
| `claude -p "task"` | 执行单次任务 |
| `claude --print "task"` | 执行并输出结果 |
| `claude -m model` | 指定模型 |
| `claude --dangerously-skip-permissions` | 跳过权限检查 |

## MCP 集成

Claude Code 支持 Model Context Protocol (MCP)，可以连接：
- Google Drive (文档)
- Jira (任务管理)
- Slack (消息)
- GitHub (代码)
- 自定义工具

## 项目配置

在项目根目录创建 `CLAUDE.md` 文件来设置：
- 代码规范
- 架构决策
- 首选库
- 审查清单

## 注意事项

1. Claude Code 需要认证
2. 部分功能需要付费订阅
3. 敏感操作需要确认
