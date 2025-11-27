import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));

    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Доброе утро');
    else if (hour < 18) setGreeting('Добрый день');
    else setGreeting('Добрый вечер');
  }, [navigate]);

  const quickActions = [
    { icon: 'Sparkles', label: 'Открыть', color: 'bg-purple-100 text-purple-600' },
    { icon: 'Heart', label: 'Избранное', color: 'bg-pink-100 text-pink-600' },
    { icon: 'Star', label: 'Достижения', color: 'bg-amber-100 text-amber-600' },
    { icon: 'Zap', label: 'Активность', color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between animate-fade-in pt-4">
          <div>
            <p className="text-sm text-muted-foreground">{greeting}</p>
            <h1 className="text-2xl font-bold mt-1">{user?.name || 'Пользователь'}</h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate('/profile')}
          >
            <Icon name="User" size={24} />
          </Button>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground border-0 shadow-lg animate-slide-up">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Добро пожаловать!</h2>
              <p className="text-sm opacity-90 mb-4">
                Исследуйте возможности приложения
              </p>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Начать
                <Icon name="ArrowRight" size={16} className="ml-1" />
              </Button>
            </div>
            <Icon name="Sparkles" size={40} className="opacity-50" />
          </div>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-4">Быстрые действия</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all cursor-pointer animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-2xl ${action.color} flex items-center justify-center mb-3`}>
                  <Icon name={action.icon} size={24} />
                </div>
                <p className="font-medium text-sm">{action.label}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Активность</h3>
          <Card className="p-4 space-y-3">
            {[
              { icon: 'CheckCircle2', text: 'Профиль настроен', time: 'Только что' },
              { icon: 'Award', text: 'Первый вход', time: 'Сегодня' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name={item.icon} size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.text}</p>
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
