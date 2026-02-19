import React from "react";
import Icon from "@/components/ui/icon";

const faqs = [
  {
    icon: "Search",
    title: "Как найти гостя?",
    text: "Введите номер телефона гостя в формате +7 (XXX) XXX-XX-XX на вкладке «Поиск» и нажмите кнопку поиска.",
  },
  {
    icon: "Key",
    title: "Где взять API-токен?",
    text: "Токен можно получить в личном кабинете PRIME HILL в разделе «Интеграции» → «API». Скопируйте openAPI токен.",
  },
  {
    icon: "Shield",
    title: "Безопасность данных",
    text: "API-токен хранится только в вашем браузере. Все запросы выполняются через защищённый HTTPS-протокол.",
  },
  {
    icon: "Users",
    title: "Информация о госте",
    text: "После поиска вы увидите профиль гостя: имя, бонусный баланс, скидку, депозит и контактные данные.",
  },
];

const HelpPanel = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground mb-1">Справка</h1>
        <p className="text-muted-foreground">
          Ответы на частые вопросы по работе с системой
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-white rounded-xl border border-border/60 shadow-sm p-5 card-hover animate-fade-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/5 flex items-center justify-center flex-shrink-0">
                <Icon name={faq.icon} size={16} className="text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">{faq.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-5 mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Документация API:{" "}
          <a
            href="https://api.prime-hill.com/loyaltyApi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            loyaltyAPI
          </a>
          {" · "}
          <a
            href="https://api.prime-hill.com/openApi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            openAPI
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpPanel;
