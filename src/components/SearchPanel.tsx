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
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">
          Поиск гостя
        </h1>
        <p className="text-muted-foreground">
          Введите номер телефона для получения информации из системы лояльности
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6">
        <form onSubmit={handleSubmit}>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Номер телефона
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
              </div>
              <Input
                ref={inputRef}
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={phone}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="h-10 pl-9 rounded-[10px] text-sm border-border/60 focus-visible:ring-primary/20"
              />
            </div>
            <Button
              type="submit"
              disabled={digitsCount < 11 || isLoading}
              className="h-10 px-5 rounded-[10px] gap-2 font-medium"
            >
              {isLoading ? (
                <Icon name="Loader2" size={14} className="animate-spin" />
              ) : (
                <Icon name="Search" size={14} />
              )}
              Найти
            </Button>
          </div>
        </form>

        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/40">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Shield" size={12} />
            <span>Безопасный поиск</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="Zap" size={12} />
            <span>Мгновенный результат</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPanel;
