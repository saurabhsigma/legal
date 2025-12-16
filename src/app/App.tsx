import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { AddCaseScreen } from './components/AddCaseScreen';
import { CaseDetailScreen } from './components/CaseDetailScreen';
import { AddHearingScreen } from './components/AddHearingScreen';
import { UploadDocumentScreen } from './components/UploadDocumentScreen';
import { AddPersonScreen } from './components/AddPersonScreen';
import { AlertsScreen } from './components/AlertsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { BottomNav } from './components/BottomNav';

type Screen = 
  | 'login'
  | 'home' 
  | 'add-case' 
  | 'case-detail' 
  | 'add-hearing'
  | 'upload-document'
  | 'add-person'
  | 'alerts'
  | 'profile'
  | 'notifications';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const handleNavigate = (screen: string, caseId?: string) => {
    setCurrentScreen(screen as Screen);
    if (caseId) {
      setSelectedCaseId(caseId);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentScreen(tab as Screen);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleBackToCaseDetail = () => {
    setCurrentScreen('case-detail');
  };

  const handleSaveAndGoBack = () => {
    // In a real app, this would save data
    if (currentScreen === 'add-case') {
      handleBackToHome();
    } else if (['add-hearing', 'upload-document', 'add-person'].includes(currentScreen)) {
      handleBackToCaseDetail();
    }
  };

  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const showBottomNav = ['home', 'alerts', 'profile'].includes(currentScreen);

  return (
    <div className="size-full bg-background">
      <div className="max-w-screen-sm mx-auto h-screen flex flex-col">
        {currentScreen === 'home' && (
          <HomeScreen onNavigate={handleNavigate} />
        )}

        {currentScreen === 'add-case' && (
          <AddCaseScreen 
            onBack={handleBackToHome}
            onSave={handleSaveAndGoBack}
          />
        )}

        {currentScreen === 'case-detail' && selectedCaseId && (
          <CaseDetailScreen 
            caseId={selectedCaseId}
            onBack={handleBackToHome}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'add-hearing' && (
          <AddHearingScreen 
            onBack={handleBackToCaseDetail}
            onSave={handleSaveAndGoBack}
          />
        )}

        {currentScreen === 'upload-document' && (
          <UploadDocumentScreen 
            onBack={handleBackToCaseDetail}
            onSave={handleSaveAndGoBack}
          />
        )}

        {currentScreen === 'add-person' && (
          <AddPersonScreen 
            onBack={handleBackToCaseDetail}
            onSave={handleSaveAndGoBack}
          />
        )}

        {currentScreen === 'alerts' && (
          <AlertsScreen />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen 
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
        )}

        {currentScreen === 'notifications' && (
          <NotificationsScreen onBack={() => setCurrentScreen('profile')} />
        )}

        {showBottomNav && (
          <BottomNav 
            activeTab={activeTab}
            onTabChange={handleTabChange}
            onAddCase={() => handleNavigate('add-case')}
          />
        )}
      </div>
    </div>
  );
}
