'use client';

import { useState, useEffect } from 'react';
import { 
  Bot, 
  Activity, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Play,
  Pause,
  RefreshCw,
  Plus,
  Zap,
  Brain,
  Cpu,
  Layers
} from 'lucide-react';

// Types
interface NanobotTask {
  id: string;
  name: string;
  status: 'running' | 'idle' | 'error' | 'completed';
  type: 'scheduler' | 'monitor' | 'analysis' | 'trading' | 'custom';
  lastRun: string;
  nextRun?: string;
  progress?: number;
  logs: string[];
}

interface NanobotStats {
  totalTasks: number;
  runningTasks: number;
  completedToday: number;
  errors: number;
  uptime: string;
}

// Mock data
const mockTasks: NanobotTask[] = [
  {
    id: '1',
    name: 'A股每日分析',
    status: 'running',
    type: 'analysis',
    lastRun: new Date().toISOString(),
    nextRun: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
    progress: 65,
    logs: ['正在获取股票数据...', '调用 MiniMax AI 分析中...', '生成报告完成']
  },
  {
    id: '2',
    name: 'EvoMap 定时修复',
    status: 'running',
    type: 'scheduler',
    lastRun: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    nextRun: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    progress: 100,
    logs: ['检查代码错误', '未发现错误', '等待下次运行']
  },
  {
    id: '3',
    name: '错误监控',
    status: 'running',
    type: 'monitor',
    lastRun: new Date().toISOString(),
    logs: ['监控中: 正常', '最近检查: 30秒前']
  },
  {
    id: '4',
    name: 'Polymarket 交易',
    status: 'idle',
    type: 'trading',
    lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    logs: ['等待信号中', '当前资金: $10,000']
  },
  {
    id: '5',
    name: 'QMD 索引更新',
    status: 'completed',
    type: 'custom',
    lastRun: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    logs: ['索引已更新', '文档数: 15']
  }
];

// Components
function StatusBadge({ status }: { status: NanobotTask['status'] }) {
  const config = {
    running: { bg: 'bg-green-500/10', text: 'text-green-600', icon: Play, label: '运行中' },
    idle: { bg: 'bg-gray-500/10', text: 'text-gray-600', icon: Pause, label: '空闲' },
    error: { bg: 'bg-red-500/10', text: 'text-red-600', icon: XCircle, label: '错误' },
    completed: { bg: 'bg-blue-500/10', text: 'text-blue-600', icon: CheckCircle, label: '已完成' }
  };
  
  const { bg, text, icon: Icon, label } = config[status];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
      <Icon className="w-3.5 h-3.5" />
      {label}
    </span>
  );
}

function TypeIcon({ type }: { type: NanobotTask['type'] }) {
  const config = {
    scheduler: Clock,
    monitor: Activity,
    analysis: Brain,
    trading: Zap,
    custom: Cpu
  };
  const Icon = config[type] || Bot;
  return <Icon className="w-5 h-5 text-gray-500" />;
}

function TaskCard({ task, onToggle }: { task: NanobotTask; onToggle: (id: string) => void }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-lg">
            <TypeIcon type={task.type} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{task.name}</h3>
            <p className="text-xs text-gray-500">
              上次运行: {new Date(task.lastRun).toLocaleString('zh-CN')}
            </p>
          </div>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      {task.progress !== undefined && (
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>进度</span>
            <span>{task.progress}%</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="bg-gray-50 rounded-lg p-3 mb-4 max-h-24 overflow-y-auto">
        {task.logs.map((log, i) => (
          <p key={i} className="text-xs text-gray-600 font-mono truncate">{log}</p>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <button 
          onClick={() => onToggle(task.id)}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {task.status === 'running' ? '暂停' : '启动'}
        </button>
        <span className="text-xs text-gray-500">
          {task.nextRun && `下次: ${new Date(task.nextRun).toLocaleTimeString('zh-CN')}`}
        </span>
      </div>
    </div>
  );
}

function StatsCard({ icon: Icon, label, value, subtext, color }: { 
  icon: React.ElementType; 
  label: string; 
  value: string | number; 
  subtext?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2.5 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
    </div>
  );
}

export default function Home() {
  const [tasks, setTasks] = useState<NanobotTask[]>(mockTasks);
  const [stats, setStats] = useState<NanobotStats>({
    totalTasks: 5,
    runningTasks: 3,
    completedToday: 12,
    errors: 0,
    uptime: '2小时 34分钟'
  });
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleToggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'running' ? 'idle' : 'running' }
        : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Nanobot Monitor</h1>
                <p className="text-xs text-gray-500">任务调度中心</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleRefresh}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                <Plus className="w-4 h-4" />
                新建任务
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard 
            icon={Bot} 
            label="总任务数" 
            value={stats.totalTasks}
            subtext="活跃: 3"
            color="bg-blue-500"
          />
          <StatsCard 
            icon={Activity} 
            label="运行中" 
            value={stats.runningTasks}
            color="bg-green-500"
          />
          <StatsCard 
            icon={CheckCircle} 
            label="今日完成" 
            value={stats.completedToday}
            color="bg-purple-500"
          />
          <StatsCard 
            icon={AlertCircle} 
            label="错误数" 
            value={stats.errors}
            subtext="系统正常"
            color="bg-orange-500"
          />
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Layers className="w-5 h-5" />
              任务列表
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              运行时间: {stats.uptime}
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks.map(task => (
              <TaskCard 
                key={task.id} 
                task={task} 
                onToggle={handleToggleTask}
              />
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1">快速操作</h3>
              <p className="text-blue-100 text-sm">一键执行常用操作</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
                运行全部
              </button>
              <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm font-medium">
                查看日志
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
