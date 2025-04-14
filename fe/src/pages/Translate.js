import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useTranslation } from 'react-i18next';
import {
  Mic, Volume2, RefreshCcw, Home, MapPin, Star, Languages, Settings, LogOut, Search, Bell
} from 'lucide-react';
import profile from '../img/profile.png'; 

export default function TranslatePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
//   const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSidebarClick = (icon) => {
    switch (icon) {
      case 'Home':
        navigate('/');
        break;
      case 'MapPin':
        navigate('/destination');
        break;
      case 'Star':
        navigate('/rating');
        break;
      case 'Languages':
        navigate('/translate');
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'LogOut':
        navigate('/login');
        break;
      default:
        console.log(`${icon} clicked`);
    }
  };

  return (
    <div className="flex h-screen font-['Lexend_Deca']">
      {/* Sidebar */}
      <div className='w-16 bg-teal-700 flex flex-col items-center justify-between py-6 text-black fixed h-full'>
        <div className='space-y-6 cursor-pointer'>
          <Home className='w-5 h-5' onClick={() => handleSidebarClick('Home')} />
          <MapPin className='w-5 h-5' onClick={() => handleSidebarClick('MapPin')} />
          <Star className='w-5 h-5' onClick={() => handleSidebarClick('Star')} />
          <Languages className='w-5 h-5' onClick={() => handleSidebarClick('Languages')} />
          <Settings className='w-5 h-5' onClick={() => handleSidebarClick('Settings')} />
        </div>
        <LogOut className='w-5 h-5 cursor-pointer' onClick={() => handleSidebarClick('LogOut')} />
      </div>

      {/* Topbar */}
      <div className='flex-1 ml-16'>
        <div className='flex justify-between items-center p-4 bg-white shadow'>
          <div className='text-xl font-semibold text-teal-700'>NusaExplore</div>
          <div className='flex items-center gap-3 w-full max-w-xl relative'>
            <Input type='text' placeholder={t('search')} className='w-full pr-10' />
            <div className='absolute right-4 top-3 cursor-pointer'>
              <Search className='w-5 h-5 text-gray-500' />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Bell className="w-5 h-5 text-gray-500" />
            <img src={profile} alt="User" className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-medium text-sm">John Doe</p>
              <p className="text-xs text-blue-600 cursor-pointer">User</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="border border-gray-500 text-gray-500 rounded px-4">User/Translate</div>
            <button className="border border-blue-500 text-blue-500 rounded px-4 py-1 bg-blue-100 hover:bg-blue-200">
              Translate
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Left Panel */}
            <div className="border p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-4 border-b pb-2">
                <div className="text-blue-600 font-semibold border-b-2 border-blue-600">Detect Language</div>
                <div className="text-blue-600 font-semibold">English</div>
                <select className="ml-auto border rounded p-1 text-sm">
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Indonesian</option>
                  <option>Japanese</option>
                </select>
              </div>
              <textarea
                placeholder="Input your text here"
                className="w-full h-40 border rounded p-2 focus:outline-blue-300"
              ></textarea>
              <button className="text-blue-500 hover:text-blue-600">
                <Mic />
              </button>
            </div>

            {/* Right Panel */}
            <div className="border p-4 rounded-lg space-y-4">
              <div className="flex items-center gap-4 border-b pb-2">
                <div className="text-blue-600 font-semibold border-b-2 border-blue-600">Detect Language</div>
                <div className="text-blue-600 font-semibold">English</div>
                <select className="ml-auto border rounded p-1 text-sm">
                  <option>Select Language</option>
                  <option>English</option>
                  <option>Indonesian</option>
                  <option>Japanese</option>
                </select>
              </div>
              <textarea
                readOnly
                placeholder="Result"
                className="w-full h-40 border rounded p-2 bg-gray-50"
              ></textarea>
              <button className="text-blue-500 hover:text-blue-600">
                <Volume2 />
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <button className="fixed top-64 left-1/2 transform -translate-x-1/2 bg-white border rounded-full p-2 shadow hover:bg-gray-50">
            <RefreshCcw />
          </button>
        </div>
      </div>
    </div>
  );
}
