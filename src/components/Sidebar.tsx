import React, { useState } from "react";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "search", label: "Поиск", icon: "Search" },
  { id: "profile", label: "Профиль", icon: "User" },
  { id: "history", label: "История", icon: "Clock" },
  { id: "settings", label: "Настройки", icon: "Settings" },
  { id: "help", label: "Справка", icon: "HelpCircle" },
];

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen glass-strong z-50 flex flex-col transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
    >
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/[0.06]">
        <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
          <Icon name="Crown" size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm tracking-wide gradient-text whitespace-nowrap">
            PRIME HILL
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-md hover:bg-white/[0.06] transition-colors"
        >
          <Icon
            name={collapsed ? "ChevronRight" : "ChevronLeft"}
            size={16}
            className="text-muted-foreground"
          />
        </button>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? "bg-primary/20 text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04]"
              }`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full gradient-bg" />
              )}
              <Icon
                name={item.icon}
                size={20}
                className={isActive ? "text-[var(--gradient-start)]" : ""}
              />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-3 pb-4">
        <div
          className={`rounded-xl glass p-3 ${collapsed ? "text-center" : ""}`}
        >
          {collapsed ? (
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center mx-auto">
              <Icon name="Zap" size={14} className="text-white" />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={14} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">v1.0</p>
                <p className="text-[10px] text-muted-foreground">Loyalty CRM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;