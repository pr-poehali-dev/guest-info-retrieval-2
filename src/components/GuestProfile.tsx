import React from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GuestData {
  clientId?: number;
  name: string;
  phone: string;
  email?: string;
  birthday?: string;
  cardNumber?: string;
  cardBarcode?: string;
  templateName?: string;
  bonusBalance?: number;
  maxPercentBonusWriteOff?: number;
  discountPercent?: number;
  depositBalance?: number;
  totalSpent?: number;
  gender?: string;
  comment?: string;
  tags?: string[];
}

interface GuestProfileProps {
  guest: GuestData;
  onBack: () => void;
}

const StatCard = ({
  icon,
  label,
  value,
  suffix,
}: {
  icon: string;
  label: string;
  value: string;
  suffix?: string;
}) => (
  <div className="bg-white rounded-xl border border-border/60 shadow-sm p-4 card-hover">
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
        <Icon name={icon} size={16} className="text-primary" />
      </div>
      <span className="text-xs text-muted-foreground font-medium">{label}</span>
    </div>
    <p className="text-xl font-semibold text-foreground">
      {value}
      {suffix && <span className="text-sm font-normal text-muted-foreground ml-1">{suffix}</span>}
    </p>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/40 last:border-0">
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
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 mb-6 group"
      >
        <Icon
          name="ArrowLeft"
          size={14}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        Назад к поиску
      </button>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 mb-4 animate-scale-in">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon name="User" size={24} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{guest.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">{guest.phone}</p>
              {guest.clientId && (
                <p className="text-xs text-muted-foreground mt-0.5">ID: {guest.clientId}</p>
              )}
            </div>
          </div>
          {guest.templateName && (
            <Badge className="rounded-full bg-primary/10 text-primary border-0 px-3 py-1 text-xs font-medium">
              {guest.templateName}
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <StatCard
            icon="Coins"
            label="Бонусы"
            value={(guest.bonusBalance ?? 0).toLocaleString("ru-RU")}
          />
          <StatCard
            icon="Percent"
            label="Скидка"
            value={`${guest.discountPercent ?? 0}%`}
          />
          <StatCard
            icon="Wallet"
            label="Депозит"
            value={(guest.depositBalance ?? 0).toLocaleString("ru-RU")}
            suffix="₽"
          />
          <StatCard
            icon="ArrowDownCircle"
            label="Макс. списание"
            value={`${guest.maxPercentBonusWriteOff ?? 0}%`}
          />
          <StatCard
            icon="Receipt"
            label="Сумма покупок"
            value={(guest.totalSpent ?? 0).toLocaleString("ru-RU")}
            suffix="₽"
          />
          <StatCard
            icon="CreditCard"
            label="Карта"
            value={guest.cardNumber ?? "—"}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border/60 shadow-sm p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
        <h3 className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
          <Icon name="Info" size={16} className="text-primary" />
          Информация о госте
        </h3>
        <InfoRow label="Email" value={guest.email} />
        <InfoRow label="Дата рождения" value={guest.birthday} />
        <InfoRow label="Пол" value={guest.gender} />
        <InfoRow label="Штрих-код карты" value={guest.cardBarcode} />
        <InfoRow label="Комментарий" value={guest.comment} />
        {guest.tags && guest.tags.length > 0 && (
          <div className="flex items-center justify-between py-3">
            <span className="text-sm text-muted-foreground">Теги</span>
            <div className="flex gap-1.5 flex-wrap justify-end">
              {guest.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={onBack}
          className="h-10 rounded-[10px] gap-2 text-sm border-border/60"
        >
          <Icon name="Search" size={14} />
          Новый поиск
        </Button>
      </div>
    </div>
  );
};

export default GuestProfile;
