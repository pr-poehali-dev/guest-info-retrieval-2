import { useState } from "react";
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
      <h2 className="text-2xl font-bold mb-2">
        <span className="gradient-text">Настройки</span>
      </h2>
      <p className="text-muted-foreground mb-8">
        Настройте подключение к PRIME HILL API
      </p>

      <div className="glass-strong rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon name="Key" size={20} className="text-[var(--gradient-start)]" />
          </div>
          <div>
            <h3 className="font-semibold">API Токен</h3>
            <p className="text-xs text-muted-foreground">Токен для loyaltyAPI PRIME HILL</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Input
              type={showToken ? "text" : "password"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="xxxx-xxxx-xxxx-xxxx"
              className="h-12 bg-white/[0.04] border-white/[0.08] pr-12 text-sm font-mono"
            />
            <button
              type="button"
              onClick={() => setShowToken(!showToken)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name={showToken ? "EyeOff" : "Eye"} size={18} />
            </button>
          </div>

          <Button
            onClick={handleSave}
            disabled={!token.trim()}
            className="w-full h-12 gradient-bg text-white border-0 font-semibold hover:opacity-90 transition-opacity"
          >
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить токен
          </Button>
        </div>
      </div>

      <div className="glass rounded-2xl p-6">
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          <Icon name="BookOpen" size={16} className="text-[var(--gradient-start)]" />
          Как получить токен
        </h3>
        <ol className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-[var(--gradient-start)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
            Войдите в личный кабинет PRIME HILL
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-[var(--gradient-start)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
            Перейдите в раздел «Интеграции» → «API»
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-[var(--gradient-start)] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
            Скопируйте loyaltyAPI токен и вставьте выше
          </li>
        </ol>
      </div>
    </div>
  );
};

export default SettingsPanel;
