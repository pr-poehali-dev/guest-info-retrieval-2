import React from "react";
import Icon from "@/components/ui/icon";

const HistoryPanel = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">История</h1>
        <p className="text-muted-foreground">
          История покупок и начислений бонусов
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-12 text-center">
        <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
          <Icon name="Clock" size={24} className="text-primary" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1">Найдите гостя</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Выполните поиск по номеру телефона, чтобы увидеть историю транзакций
        </p>
      </div>
    </div>
  );
};

export default HistoryPanel;
