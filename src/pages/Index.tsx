import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "@/components/Sidebar";
import SearchPanel from "@/components/SearchPanel";
import GuestProfile from "@/components/GuestProfile";
import HistoryPanel from "@/components/HistoryPanel";
import SettingsPanel from "@/components/SettingsPanel";
import HelpPanel from "@/components/HelpPanel";

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

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [isLoading, setIsLoading] = useState(false);
  const [guest, setGuest] = useState<GuestData | null>(null);
  const [apiToken, setApiToken] = useState(() => localStorage.getItem("ph_api_token") || "");
  const { toast } = useToast();

  useEffect(() => {
    if (guest && activeTab === "search") {
      setActiveTab("profile");
    }
  }, [guest]);

  const searchGuest = async (phone: string) => {
    if (!apiToken) {
      toast({
        title: "Нет API-токена",
        description: "Перейдите в Настройки и введите токен PRIME HILL",
        variant: "destructive",
      });
      setActiveTab("settings");
      return;
    }

    setIsLoading(true);
    try {
      const formattedPhone = phone.startsWith("7") ? phone : "7" + phone;
      const url = `https://loyalty-api.p-h.app/api/v3/GetClient/${apiToken}?phone=${formattedPhone}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        toast({
          title: "Гость не найден",
          description: data.error || "Проверьте номер телефона и попробуйте снова",
          variant: "destructive",
        });
        setGuest(null);
        return;
      }

      const client = data.client || data;

      setGuest({
        name: client.name || client.firstName
          ? `${client.lastName || ""} ${client.firstName || ""} ${client.middleName || ""}`.trim()
          : "Без имени",
        phone: `+${formattedPhone}`,
        email: client.email || undefined,
        birthday: client.birthday || client.birthDate || undefined,
        cardNumber: client.cardNumber || client.card?.number || undefined,
        templateName: client.templateName || client.card?.templateName || client.loyaltyLevel || undefined,
        bonusBalance: client.bonusBalance ?? client.balance ?? client.card?.balance ?? 0,
        totalSpent: client.totalSum ?? client.totalSpent ?? 0,
        visits: client.totalVisits ?? client.visits ?? 0,
        registrationDate: client.registrationDate || client.createdAt || undefined,
        gender: client.gender || undefined,
        comment: client.comment || undefined,
      });

      toast({
        title: "Гость найден",
        description: `${client.name || client.firstName || "Гость"} успешно найден в системе`,
      });
    } catch (err) {
      toast({
        title: "Ошибка подключения",
        description: "Не удалось связаться с PRIME HILL API. Проверьте токен и попробуйте снова.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setGuest(null);
    setActiveTab("search");
  };

  const renderContent = () => {
    if (activeTab === "profile" && guest) {
      return <GuestProfile guest={guest} onBack={handleBack} />;
    }

    switch (activeTab) {
      case "search":
        return <SearchPanel onSearch={searchGuest} isLoading={isLoading} />;
      case "profile":
        return (
          <div className="animate-fade-in text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-float">
              <span className="text-3xl">👤</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Профиль не загружен</h2>
            <p className="text-muted-foreground text-sm">Сначала найдите гостя через поиск</p>
            <button
              onClick={() => setActiveTab("search")}
              className="mt-4 text-sm text-[var(--gradient-start)] hover:underline font-medium"
            >
              Перейти к поиску →
            </button>
          </div>
        );
      case "history":
        return <HistoryPanel />;
      case "settings":
        return <SettingsPanel apiToken={apiToken} onTokenChange={setApiToken} />;
      case "help":
        return <HelpPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--gradient-start)] opacity-[0.03] blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--gradient-end)] opacity-[0.03] blur-[120px]" />
      </div>

      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="ml-[72px] md:ml-[240px] min-h-screen relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;
