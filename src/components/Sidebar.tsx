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
      className={`fixed left-0 top-0 h-screen bg-white border-r border-border/60 z-50 flex flex-col transition-all duration-200 ${
        collapsed ? "w-[64px]" : "w-[220px]"
      }`}
    >
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border/60">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
          <Icon name="Crown" size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-semibold text-sm text-foreground tracking-tight">
            PRIME HILL
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1.5 rounded-md hover:bg-muted transition-colors"
        >
          <Icon
            name={collapsed ? "ChevronRight" : "ChevronLeft"}
            size={14}
            className="text-muted-foreground"
          />
        </button>
      </div>

      <nav className="flex-1 py-3 px-2 space-y-0.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-[10px] transition-all duration-200 ${
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon name={item.icon} size={18} />
              {!collapsed && (
                <span className="text-sm">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="px-2 pb-3">
        <div className={`rounded-[10px] bg-muted/50 p-3 ${collapsed ? "text-center" : ""}`}>
          {collapsed ? (
            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Icon name="Zap" size={12} className="text-primary" />
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name="Zap" size={12} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-foreground">Loyalty CRM</p>
                <p className="text-[11px] text-muted-foreground">v1.0</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
