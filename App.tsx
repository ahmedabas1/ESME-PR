
import React, { useState } from 'react';
import { LayoutDashboard, CalendarDays, Users2, ScrollText, DollarSign, Menu, X, Bot, CalendarClock, User, Activity } from 'lucide-react';
import Dashboard from './components/Dashboard';
import Strategy from './components/Strategy';
import Teams from './components/Teams';
import Toolkit from './components/Toolkit';
import Packages from './components/Packages';
import Login from './components/Login';
import AIAssistant from './components/AIAssistant';
import SmartCalendar from './components/SmartCalendar';
import OperationsCenter from './components/OperationsCenter';
import { ViewState } from './types';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!currentUser) {
    return <Login />;
  }

  const menuItems = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: LayoutDashboard },
    { id: 'operations-center', label: 'غرفة العمليات', icon: Activity, hidden: currentUser.role === 'Member' }, // Hidden for members
    { id: 'strategy', label: 'الخطة (3 أيام)', icon: CalendarDays },
    { id: 'calendar', label: 'المهام والتقويم', icon: CalendarClock },
    { id: 'ai-assistant', label: 'المساعد الذكي', icon: Bot, highlight: true },
    { id: 'teams', label: 'الفرق والشركات', icon: Users2 },
    { id: 'packages', label: 'باقات الرعاية', icon: DollarSign },
    { id: 'toolkit', label: 'أدوات التواصل', icon: ScrollText },
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'operations-center': return <OperationsCenter />;
      case 'strategy': return <Strategy />;
      case 'teams': return <Teams />;
      case 'packages': return <Packages />;
      case 'toolkit': return <Toolkit />;
      case 'ai-assistant': return <AIAssistant />;
      case 'calendar': return <SmartCalendar />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex" dir="rtl">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col fixed h-full z-20 shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            ESME PR 2026
          </h1>
          <p className="text-xs text-slate-400 mt-2">خطة العمل الاستراتيجية</p>
          <div className="mt-4 flex items-center gap-3 bg-slate-800 p-2 rounded-lg">
             <div className="bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                {currentUser.name.charAt(0)}
             </div>
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-400">{currentUser.role}</p>
             </div>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.filter(item => !item.hidden).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewState)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : item.highlight 
                    ? 'text-indigo-300 hover:bg-indigo-900/50 hover:text-white border border-indigo-500/30'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.highlight ? 'text-indigo-400' : ''}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 right-0 w-full bg-slate-900 z-30 p-4 flex justify-between items-center text-white shadow-md">
        <h1 className="font-bold">ESME PR 2026</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-slate-900 z-20 pt-20 px-4 space-y-2 animate-fade-in overflow-y-auto pb-10">
           {menuItems.filter(item => !item.hidden).map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id as ViewState);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeView === item.id
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:mr-64 p-4 lg:p-8 pt-20 lg:pt-8 overflow-y-auto h-screen">
        {renderContent()}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
