import React, { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchPanelProps {
  onSearch: (phone: string) => void;
  isLoading: boolean;
}

const SearchPanel = ({ onSearch, isLoading }: SearchPanelProps) => {
  const [phone, setPhone] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) return "";
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
    if (digits.length > 4) formatted += ") " + digits.slice(4, 7);
    if (digits.length > 7) formatted += "-" + digits.slice(7, 9);
    if (digits.length > 9) formatted += "-" + digits.slice(9, 11);
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (raw.length <= 11) {
      setPhone(raw.length === 0 ? "" : formatPhone(raw));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length >= 10) {
      onSearch(digits);
    }
  };

  const handleFocus = () => {
    if (!phone) setPhone("+7");
  };

  const handleBlur = () => {
    if (phone === "+7") setPhone("");
  };

  const digitsCount = phone.replace(/\D/g, "").length;

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-6 animate-scale-in">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Система активна
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Поиск{" "}
          <span className="gradient-text">гостя</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-md mx-auto">
          Введите номер телефона для получения информации о госте
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="relative group">
          <div className="absolute -inset-0.5 gradient-bg rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm" />
          <div className="relative glass-strong rounded-2xl p-2 flex items-center gap-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
              <Icon name="Phone" size={20} className="text-[var(--gradient-start)]" />
            </div>
            <Input
              ref={inputRef}
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={phone}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="flex-1 h-12 bg-transparent border-0 text-lg font-medium placeholder:text-muted-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              type="submit"
              disabled={digitsCount < 11 || isLoading}
              className="h-12 px-6 rounded-xl gradient-bg border-0 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-30"
            >
              {isLoading ? (
                <Icon name="Loader2" size={20} className="animate-spin" />
              ) : (
                <Icon name="Search" size={20} />
              )}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={14} />
            <span>Безопасный поиск</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={14} />
            <span>Мгновенный результат</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchPanel;