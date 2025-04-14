
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useTranslation } from 'react-i18next';
import {
  Home,
  MapPin,
  Star,
  Languages,
  Settings,
  LogOut,
  Bell,
  Search,
} from 'lucide-react';




const HistoryReviewPage = () => {
  const reviews = [
    {
      id: 1,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: "/img/air-terjun.jpg",
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
    {
      id: 2,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: "/img/air-terjun.jpg",
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
    {
      id: 3,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: "/img/air-terjun.jpg",
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
  ];

  const removedReview = {
    image: "/img/pantai-kapuk.jpg",
    title: "Pantai Kapuk",
    date: "31/01/2022",
    reason: "[Pesan pemberitahuan alasan penghapusan]",
  };

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShowLanguageModal(false);
  };
  
console.log('Current lang:', i18n.language);

  // Backend API
  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('roles'));
  console.log('role:', roles);

const logoutHandler = async () => {
    try {
      await axios.post(
        'http://localhost:8000/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('token');
      localStorage.removeItem('roles');
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

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
        setShowLanguageModal(true);
        break;
      case 'Settings':
        navigate('/settings');
        break;
      case 'LogOut':
        logoutHandler();
        break;
      default:
        console.log(`${icon} clicked`);
    }
  };

  const handleSee = (id) => alert(`Lihat detail review ID: ${id}`);
  const handleEdit = (id) => alert(`Edit review ID: ${id}`);
  const handleDelete = (id) => {
    if (window.confirm("Yakin mau hapus review ini?")) {
      alert(`Review ID: ${id} berhasil dihapus`);
    }
  };

  return (
    <>
      <div className='flex h-screen'>
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
  
        {/* Main */}
        <div className='flex-1 bg-gray-100 overflow-auto ml-16'>
          {/* Topbar */}
          <div className='flex justify-between items-center p-4 bg-white shadow'>
            <div className='text-xl font-semibold text-teal-700'>NusaExplore</div>
            <div className='flex items-center gap-3 w-full max-w-xl relative'>
              <Input type='text' placeholder={t('search')} className='w-full pr-10' />
              <div className='absolute right-4 top-3 cursor-pointer'>
                <Search className='w-5 h-5 text-gray-500' />
              </div>
            </div>
            <div className='flex items-center gap-3'>
              <Bell className='w-5 h-5 text-gray-500' />
              <img src={profile} alt='User' className='w-8 h-8 rounded-full' />
              <div>
                <p className='font-medium text-sm'>{user.name || 'User'}</p>
                <p className='text-xs text-blue-600 cursor-pointer'>
                  {roles || 'user'}
                </p>
              </div>
            </div>
          </div>
  
          {/* Content */}
          <div className="flex p-8 bg-gray-50 min-h-screen">
            {/* Kiri: List Review */}
            <div className="flex-1 pr-6">
              <h1 className="text-3xl font-bold mb-2">Destinations You’ve Reviewed</h1>
              <p className="text-gray-500 mb-6">See what you’ve shared recently!</p>
  
              {reviews.map((review) => (
                <div key={review.id} className="flex bg-white rounded-xl shadow p-4 mb-4">
                  <img src={review.image} alt={review.title} className="w-48 h-32 object-cover rounded-lg" />
                  <div className="flex-1 ml-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{review.title}</h3>
                      <span className="text-gray-500 text-sm">{review.date}</span>
                    </div>
                    <div className="flex items-center text-yellow-500 text-sm mt-1">
                      ★★★★★ <span className="ml-2 text-gray-600">{review.rating}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{review.description}</p>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleSee(review.id)} className="bg-green-100 text-green-600 p-2 rounded" title="See">👁️</button>
                      <button onClick={() => handleEdit(review.id)} className="bg-blue-100 text-blue-600 p-2 rounded" title="Edit">✏️</button>
                      <button onClick={() => handleDelete(review.id)} className="bg-red-100 text-red-600 p-2 rounded" title="Delete">🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
  
              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <div className="flex gap-2">
                  <button className="w-8 h-8 bg-blue-500 text-white rounded">1</button>
                  <button className="w-8 h-8 border rounded">2</button>
                  <button className="w-8 h-8 border rounded">3</button>
                  <button className="w-8 h-8 border rounded">4</button>
                </div>
              </div>
            </div>
  
            {/* Kanan: About Your Reviews */}
            <div className="w-80 bg-blue-50 rounded-xl p-4">
              <h2 className="text-lg font-semibold mb-4">About Your Reviews</h2>
              <div className="bg-white rounded-lg shadow p-3">
                <p className="text-sm font-semibold text-red-600 mb-2">Your review has been removed by an administrator.</p>
                <div className="flex items-center mb-2">
                  <img src={removedReview.image} alt={removedReview.title} className="w-16 h-12 object-cover rounded mr-3" />
                  <div>
                    <h4 className="text-sm font-semibold">{removedReview.title}</h4>
                    <span className="text-xs text-gray-500">{removedReview.date}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600">{removedReview.reason}</p>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </>
  );
  
};

export default HistoryReviewPage;
