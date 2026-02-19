import React from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GuestData {
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  cardNumber?: string;
  templateName?: string;
  bonusBalance?: number;
  totalSpent?: number;
  visits?: number;
  registrationDate?: string;
  gender?: string;
  comment?: string;
}

interface GuestProfileProps {
  guest: GuestData;
  onBack: () => void;
}

const StatCard = ({
  icon,
  label,
  value,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  delay: string;
}) => (
  <div
    className="glass rounded-xl p-4 hover-lift animate-fade-in"
    style={{ animationDelay: delay }}
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon name={icon} size={18} className="text-[var(--gradient-start)]" />
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
    <p className="text-xl font-bold text-foreground">{value}</p>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground">{value}</span>
    </div>
  );
};

const GuestProfile = ({ guest, onBack }: GuestProfileProps) => {
  return (
    <div className="animate-fade-in">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6 group"
      >
        <Icon
          name="ArrowLeft"
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Назад к поиску
      </button>

      <div className="glass-strong rounded-2xl p-6 mb-6 animate-scale-in">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center animate-float">
              <Icon name="User" size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{guest.name}</h2>
              <p className="text-muted-foreground text-sm mt-0.5">{guest.phone}</p>
            </div>
          </div>
          {guest.templateName && (
            <Badge className="gradient-bg text-white border-0 px-3 py-1 font-semibold">
              {guest.templateName}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard
            icon="Coins"
            label="Бонусы"
            value={guest.bonusBalance?.toLocaleString("ru-RU") ?? "0"}
            delay="0.1s"
          />
          <StatCard
            icon="Wallet"
            label="Потрачено"
            value={`${(guest.totalSpent ?? 0).toLocaleString("ru-RU")} ₽`}
            delay="0.2s"
          />
          <StatCard
            icon="CalendarCheck"
            label="Визиты"
            value={String(guest.visits ?? 0)}
            delay="0.3s"
          />
          <StatCard
            icon="CreditCard"
            label="Карта"
            value={guest.cardNumber ?? "—"}
            delay="0.4s"
          />
        </div>
      </div>

      <div className="glass rounded-2xl p-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Icon name="Info" size={18} className="text-[var(--gradient-start)]" />
          Информация о госте
        </h3>
        <InfoRow label="Email" value={guest.email} />
        <InfoRow label="Дата рождения" value={guest.birthday} />
        <InfoRow label="Пол" value={guest.gender === "male" ? "Мужской" : guest.gender === "female" ? "Женский" : guest.gender} />
        <InfoRow label="Дата регистрации" value={guest.registrationDate} />
        <InfoRow label="Комментарий" value={guest.comment} />
      </div>

      <div className="flex gap-3 mt-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 h-12 glass border-white/[0.08] text-foreground hover:bg-white/[0.06]"
        >
          <Icon name="Search" size={16} className="mr-2" />
          Новый поиск
        </Button>
      </div>
    </div>
  );
};

export default GuestProfile;