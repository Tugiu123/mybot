# OpenClaw Dashboard 访问指南

## 网关状态 ✅
- **状态**: 运行中
- **地址**: `http://localhost:19789/`
- **WebSocket**: `ws://127.0.0.1:19789`
- **认证**: 密码模式
- **密码**: `mybot123`

## 访问方式

### 方式 1: 本地浏览器（推荐）
在您的**本地浏览器**中打开：
```
http://localhost:19789/
```

### 方式 2: 远程访问（如果从外部机器访问）
使用SSH端口转发：
```bash
ssh -N -L 19789:127.0.0.1:19789 codespace@<host>
```
然后在本地浏览器打开：
```
http://localhost:19789/
```

### 方式 3: 命令行测试
```bash
# 加载环境
source /workspaces/mybot/openclaw.env

# 检查网关状态
openclaw health

# 查看会话
openclaw sessions

# 发送消息（需先设置通道）
openclaw message send --channel <channel> --target <target> --message "test"
```

## 登录信息
当页面打开后，在**Settings**中输入密码：
```
密码: mybot123
```

## 验证网关运行
```bash
# 检查进程
ps aux | grep openclaw-gateway

# 测试HTTP连接
curl http://localhost:19789/

# 检查WebSocket
curl -i -N -H "Connection: Upgrade" -H "Upgrade: websocket" http://localhost:19789/ws
```

## 日志查看
```bash
tail -f /tmp/openclaw/openclaw-2026-02-15.log
```
