# OpenClaw 配置指南

## 当前网关配置

### 独立网关（推荐用于开发）
- **地址**: `ws://127.0.0.1:19789`
- **认证方式**: 密码
- **密码**: `mybot123`
- **启动命令**:
```bash
openclaw gateway --port 19789 --auth password --password "mybot123" --allow-unconfigured
```

### Dashboard 访问
打开浏览器访问:
```
http://127.0.0.1:19789/
```

在 Control UI 设置区域输入密码: `mybot123`

## 发送消息

### 方法1: 使用环境变量（推荐）
```bash
export OPENCLAW_GATEWAY=ws://127.0.0.1:19789
export OPENCLAW_GATEWAY_PASSWORD=mybot123
openclaw message send --channel telegram --target @mychannel --message "测试"
```

### 方法2: 使用本地Agent模式
```bash
openclaw agent --local --message "测试消息"
```

## 故障排除

如果出现 "token missing" 错误:
1. 确保在访问 Dashboard 时已输入密码
2. check 网关是否在运行: `ps aux | grep openclaw`
3. 查看日志: `tail -f /tmp/openclaw/openclaw-2026-02-15.log`

## 两个网关说明

- **您本地网关（18789）**: 您自己配置的，独立运行
- **我创建的网关（19789）**: 用于开发测试，与您的本地网关隔离
