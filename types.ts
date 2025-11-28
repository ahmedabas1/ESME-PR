
export interface KPIMetric {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: any;
  color?: string;
  bg?: string;
}

export type Role = 'President' | 'VP' | 'Director' | 'Head' | 'Member';

export interface User {
  id: string;
  name: string;
  role: Role;
  teamId?: number; // 1: Industry, 2: Testing, 3: Catering
  parentId?: string; // Who is their direct manager
  avatar?: string;
  pin?: string; // Login Access Code
  isOnline?: boolean; // Live status
  lastAction?: string; // What are they doing right now?
  lastActiveTime?: number;
}

export interface TaskHistory {
  timestamp: number;
  note: string;
  by: string; // Name of user
}

export interface Task {
  id: string;
  title: string;
  description: string;
  assignedTo: string; // User ID
  createdBy: string; // User ID
  dueDate: string; // ISO Date
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  history?: TaskHistory[]; // Log of changes
}

export interface PerformanceData {
  userId: string;
  callsMade: number;
  meetingsSet: number;
  dealsClosed: number;
  revenue: number;
}

// Smart Sheet Types
export interface SheetColumn {
  key: string;
  label: string;
  type: 'text' | 'select' | 'number' | 'date' | 'phone';
  options?: string[]; // For select type
  width?: string;
}

export interface SheetRow {
  id: string;
  ownerId: string; // User who owns this data
  [key: string]: any;
}

export interface SmartSheet {
  id: string;
  title: string;
  icon?: any;
  columns: SheetColumn[];
  rows: SheetRow[];
}

export interface AIAlert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'critical';
  message: string;
  targetId?: string; // Row ID or User ID related to alert
  timestamp: number;
  read: boolean;
}

// Strategy Types
export interface StrategyTaskItem {
  id: string;
  time: string;
  title: string;
  desc: string;
}

export interface StrategyDay {
  day: number;
  title: string;
  focus: string;
  icon?: any;
  tasks: StrategyTaskItem[];
  kpis: string[];
}

// Added 'packages' and 'toolkit' to ViewState
export type ViewState = 'dashboard' | 'strategy' | 'teams' | 'ai-assistant' | 'calendar' | 'tasks' | 'packages' | 'toolkit' | 'operations-center';
