import React, { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface SettingsPanelProps {
  apiToken: string;
  onTokenChange: (token: string) => void;
}

const SettingsPanel = ({ apiToken, onTokenChange }: SettingsPanelProps) => {
  const [token, setToken] = useState(apiToken);
  const [showToken, setShowToken] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onTokenChange(token);
    localStorage.setItem("ph_api_token", token);
    toast({
      title: "Токен сохранён",
      description: "API-токен успешно обновлён",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Настройки</h1>
        <p className="text-muted-foreground">
          Настройте подключение к PRIME HILL API
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 mb-4">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center">
            <Icon name="Key" size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">API Токен</h3>
            <p className="text-xs text-muted-foreground">openAPI токен PRIME HILL</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              className="h-10 pr-10 rounded-[10px] text-sm font-mono border-border/60"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showToken ? "EyeOff" : "Eye"} size={14} />
            </button>
          </div>

          <Button
            onClick={handleSave}
            disabled={!token.trim()}
            className="h-10 rounded-[10px] gap-2 font-medium"
          >
            <Icon name="Save" size={14} />
            Сохранить
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="BookOpen" size={14} className="text-primary" />
          Как получить токен
        </h3>
        <ol className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">1</span>
            Войдите в личный кабинет PRIME HILL
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">2</span>
            Перейдите в раздел «Интеграции» → «API»
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">3</span>
            Скопируйте openAPI токен и вставьте выше
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SettingsPanel;
