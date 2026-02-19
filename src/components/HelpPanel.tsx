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
    text: "Токен можно получить в личном кабинете PRIME HILL в разделе «Интеграции» → «API». Скопируйте loyaltyAPI токен.",
  },
  {
    icon: "Shield",
    title: "Безопасность данных",
    text: "API-токен хранится только в вашем браузере. Все запросы к PRIME HILL выполняются через защищённый HTTPS-протокол.",
  },
  {
    icon: "Users",
    title: "Информация о госте",
    text: "После поиска вы увидите профиль гостя: имя, бонусный баланс, уровень карты, количество визитов и историю.",
  },
];

const HelpPanel = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-2">
        <span className="gradient-text">Справка</span>
      </h2>
      <p className="text-muted-foreground mb-8">
        Ответы на частые вопросы по работе с системой
      </p>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass-strong rounded-2xl p-5 hover-lift animate-fade-in"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={faq.icon} size={20} className="text-[var(--gradient-start)]" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">{faq.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6 mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Документация API:{" "}
          <a
            href="https://api.prime-hill.com/loyaltyApi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gradient-start)] hover:underline font-medium"
          >
            loyaltyAPI
          </a>
          {" · "}
          <a
            href="https://api.prime-hill.com/openApi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--gradient-start)] hover:underline font-medium"
          >
            openAPI
          </a>
        </p>
      </div>
    </div>
  );
};

export default HelpPanel;