import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaMountain, FaTrash, FaCamera } from 'react-icons/fa';
import {
  Home,
  MapPin,
  Star,
  Languages,
  Settings,
  LogOut,
  Search,
  Bell,
} from 'lucide-react';
import { Input } from '../components/ui/input';
import profile from '../img/profile.png';
import { useTranslation } from 'react-i18next';
import '../i18n';
import axios from 'axios';

function SettingsPage() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShowLanguageModal(false);
  };

  const [user, setUser] = useState({});
  const token = localStorage.getItem('token');
  const roles = JSON.parse(localStorage.getItem('roles'));
  console.log('role:', roles);

  const [activeMenu, setActiveMenu] = useState('Profile');
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setNameInput(response.data.name);
        setEmailInput(response.data.email);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    if (!token) {
      navigate('/login');
    } else {
      fetchUser();
    }
  }, [navigate, token]);

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

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(false);
    alert('Akun berhasil dihapus.');
  };

  const handleSaveProfile = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      alert('Format email tidak valid.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:8000/api/profile',
        {
          name: nameInput,
          email: emailInput,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Profil berhasil disimpan.');
      setEditing(false);
      setUser(response.data.user);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        alert(error.response.data.message || 'Validasi gagal.');
      } else {
        alert('Gagal menyimpan profil.');
      }
      console.error(error);
    }
  };

  const handleSavePassword = async () => {
    setPasswordError('');

    if (newPassword.length < 8) {
      setPasswordError('Password baru minimal 8 karakter.');
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:8000/api/password',
        {
          old_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        alert('Password berhasil diubah.');
        // Reset form
        setCurrentPassword('');
        setNewPassword('');
        setEditing(false);
      } else {
        setPasswordError(response.data.message || 'Gagal mengubah password.');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 422) {
          if (error.response.data.errors) {
            const errors = error.response.data.errors;
            setPasswordError(
              errors.old_password?.[0] ||
                errors.new_password?.[0] ||
                'Validasi gagal'
            );
          } else {
            setPasswordError(
              error.response.data.message || 'Password saat ini salah.'
            );
          }
        } else {
          setPasswordError('Terjadi kesalahan pada server.');
        }
      } else {
        setPasswordError('Tidak dapat terhubung ke server.');
      }
    }
  };

  return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className='w-16 bg-teal-700 flex flex-col items-center justify-between py-6 text-black fixed h-full'>
        <div className='space-y-6 cursor-pointer'>
          <Home
            className='w-5 h-5'
            onClick={() => handleSidebarClick('Home')}
          />
          <MapPin
            className='w-5 h-5'
            onClick={() => handleSidebarClick('MapPin')}
          />
          <Star
            className='w-5 h-5'
            onClick={() => handleSidebarClick('Star')}
          />
          <Languages
            className='w-5 h-5'
            onClick={() => handleSidebarClick('Languages')}
          />
          <Settings
            className='w-5 h-5'
            onClick={() => handleSidebarClick('Settings')}
          />
        </div>
        <LogOut
          className='w-5 h-5 cursor-pointer'
          onClick={() => handleSidebarClick('LogOut')}
        />
      </div>

      {/* Main */}
      <div className='flex-1 bg-gray-100 overflow-auto ml-16'>
        {/* Topbar */}
        <div className='flex justify-between items-center p-4 bg-white shadow'>
          <div className='text-xl font-semibold text-blue-900'>NusaExplore</div>
          <div className='flex items-center gap-3 w-full max-w-xl relative'>
            <Input
              type='text'
              placeholder={t('search')}
              className='w-full pr-10'
            />
            <div className='absolute right-4 top-3 cursor-pointer'>
              <Search className='w-5 h-5 text-gray-500' />
            </div>
          </div>
          <div className='flex items-center gap-3'>
            <Bell className='w-5 h-5 text-gray-500' />
            <img src={profile} alt='User' className='w-8 h-8 rounded-full' />
            <div>
              <p className='font-medium text-sm lowercase'>
                {user.name || 'User'}
              </p>
              <p className='text-xs text-blue-600 cursor-pointer lowercase'>
                {roles || 'User'}
              </p>
            </div>
          </div>
        </div>

        <div className='flex h-full'>
          <div className='w-64 bg-[#D6F0F7] p-6 flex flex-col justify-between rounded-xl shadow-lg'>
            <div>
              <div className='flex items-center mb-10 text-xl font-bold text-blue-800'>
                <span className='text-2xl font-extrabold'>Menu</span>
              </div>
              <ul className='space-y-5'>
                {[
                  'Profile',
                  'Change password',
                  'Become a Destination Manager',
                  'Hapus Akun',
                ].map((item) => (
                  <li
                    key={item}
                    className={`px-4 py-2 cursor-pointer flex items-center space-x-2 text-[#0B3E58] hover:font-semibold hover:bg-blue-100 rounded-xl ${
                      activeMenu === item ? 'font-bold' : ''
                    }`}
                    onClick={() => setActiveMenu(item)}
                  >
                    <span>
                      {item === 'Profile' && <FaUser />}
                      {item === 'Change password' && <FaLock />}
                      {item === 'Become a Destination Manager' && (
                        <FaMountain />
                      )}
                      {item === 'Hapus Akun' && <FaTrash />}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='flex-1 p-10 overflow-y-auto'>
            {activeMenu === 'Profile' && (
              <div className='bg-white rounded-2xl shadow-lg p-8 space-y-6'>
                <div className='flex items-center space-x-6'>
                  <div className='relative'>
                    <img
                      src={profile}
                      className='w-28 h-28 rounded-xl object-cover'
                    />
                    <div className='absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer'>
                      <FaCamera className='text-gray-600' />
                    </div>
                  </div>
                  <div>
                    <h2 className='text-2xl font-bold'>
                      {user.name || 'User'}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      Destination manager of [nm_wisata]
                    </p>
                  </div>
                  <button
                    className='ml-auto bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border'
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>

                <div className='space-y-4 max-w-xl'>
                  <div>
                    <label className='block text-gray-700'>User name</label>
                    <input
                      type='text'
                      className='w-full px-4 py-2 rounded bg-gray-100'
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700'>Email</label>
                    <input
                      type='email'
                      className='w-full px-4 py-2 rounded bg-gray-100'
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  {editing && (
                    <div className='flex justify-end'>
                      <button
                        className='bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border'
                        onClick={handleSaveProfile}
                        type='submit'
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeMenu === 'Change password' && (
              <div className='bg-white rounded-2xl shadow-lg p-8 space-y-6'>
                <div className='flex items-center space-x-6'>
                  <div className='relative'>
                    <img
                      src={profile}
                      className='w-28 h-28 rounded-xl object-cover'
                    />
                    <div className='absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer'>
                      <FaCamera className='text-gray-600' />
                    </div>
                  </div>
                  <div>
                    <h2 className='text-2xl font-bold'>
                      {user.name || 'User'}
                    </h2>
                    <p className='text-sm text-gray-500'>
                      Destination manager of [nm_wisata]
                    </p>
                  </div>
                  <button
                    className='ml-auto bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border'
                    onClick={() => setEditing(true)}
                  >
                    Edit Password
                  </button>
                </div>

                <div className='space-y-4 max-w-xl'>
                  <div>
                    <label className='block text-gray-700'>
                      Current Password
                    </label>
                    <input
                      type='password'
                      className='w-full px-4 py-2 rounded bg-gray-100'
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className='block text-gray-700'>New Password</label>
                    <input
                      type='password'
                      className='w-full px-4 py-2 rounded bg-gray-100'
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  {passwordError && (
                    <p className='text-red-500 text-sm'>{passwordError}</p>
                  )}

                  {editing && (
                    <div className='flex justify-end'>
                      <button
                        className='bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border'
                        onClick={handleSavePassword}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeMenu === 'Become a Destination Manager' && (
              <div className='text-gray-700 text-lg'>
                <p>
                  Formulir atau informasi untuk menjadi manajer destinasi akan
                  ditampilkan di sini.
                </p>
              </div>
            )}

            {activeMenu === 'Hapus Akun' && (
              <div>
                <button
                  className='bg-red-500 hover:bg-red-700 text-white px-6 py-2 rounded'
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  Konfirmasi Hapus Akun
                </button>
              </div>
            )}

            {showDeleteConfirm && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                <div className='bg-white p-6 rounded-xl shadow-lg max-w-sm text-center space-y-4'>
                  <p className='text-lg font-semibold'>
                    Apakah kamu yakin ingin menghapus akun?
                  </p>
                  <div className='flex justify-center space-x-4'>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className='px-4 py-2 rounded bg-gray-300'
                    >
                      Batal
                    </button>
                    <button
                      onClick={handleDeleteAccount}
                      className='px-4 py-2 rounded bg-red-500 text-white'
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            )}

            {showLanguageModal && (
              <div className='fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50'>
                <div className='bg-white rounded-lg p-6 w-80'>
                  <h2 className='text-lg font-semibold mb-4'>
                    {t('choose_language')}
                  </h2>
                  <div className='space-y-2'>
                    <button
                      onClick={() => changeLanguage('id')}
                      className='w-full text-left p-2 hover:bg-teal-100 rounded'
                    >
                      {t('indonesian')}
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className='w-full text-left p-2 hover:bg-teal-100 rounded'
                    >
                      {t('english')}
                    </button>
                  </div>
                  <div className='text-right mt-4'>
                    <button
                      onClick={() => setShowLanguageModal(false)}
                      className='text-sm text-red-500 hover:underline'
                    >
                      {t('close')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;
