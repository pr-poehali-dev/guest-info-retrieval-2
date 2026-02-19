import Icon from "@/components/ui/icon";

const HistoryPanel = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">
        <span className="gradient-text">История</span> операций
      </h2>
      <p className="text-muted-foreground mb-8">
        Здесь будет отображаться история покупок и начислений бонусов
      </p>

      <div className="glass-strong rounded-2xl p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
          <Icon name="Clock" size={28} className="text-[var(--gradient-start)]" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Найдите гостя</h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Выполните поиск по номеру телефона, чтобы увидеть историю транзакций гостя
        </p>
      </div>
    </div>
  );
};

export default HistoryPanel;
