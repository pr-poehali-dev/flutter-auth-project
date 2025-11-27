import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface User {
  name: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { icon: 'User', label: 'Редактировать профиль', action: () => {} },
    { icon: 'Lock', label: 'Безопасность', action: () => {} },
    { icon: 'CreditCard', label: 'Платежи', action: () => {} },
    { icon: 'HelpCircle', label: 'Помощь', action: () => {} },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <div className="max-w-md mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between animate-fade-in pt-4">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate('/home')}
          >
            <Icon name="ArrowLeft" size={24} />
          </Button>
          <h1 className="text-xl font-bold">Профиль</h1>
          <div className="w-10" />
        </div>

        <Card className="p-6 text-center animate-slide-up">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
              {user ? getInitials(user.name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-bold mb-1">{user?.name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </Card>

        <Card className="divide-y">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Bell" size={20} className="text-primary" />
              </div>
              <span className="font-medium">Уведомления</span>
            </div>
            <Switch checked={notifications} onCheckedChange={setNotifications} />
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Moon" size={20} className="text-primary" />
              </div>
              <span className="font-medium">Темная тема</span>
            </div>
            <Switch checked={darkMode} onCheckedChange={setDarkMode} />
          </div>
        </Card>

        <Card className="divide-y">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full p-4 flex items-center gap-3 hover:bg-accent transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Icon name={item.icon} size={20} className="text-muted-foreground" />
              </div>
              <span className="font-medium flex-1">{item.label}</span>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
            </button>
          ))}
        </Card>

        <Button
          variant="destructive"
          className="w-full h-12 rounded-xl"
          onClick={handleLogout}
        >
          <Icon name="LogOut" size={20} className="mr-2" />
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default Profile;
