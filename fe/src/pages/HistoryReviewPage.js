import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/ui/input';
import { useTranslation } from 'react-i18next';
import profile from "../img/profile.png";
import review1 from "../img/destinasi1.png";
import review2 from "../img/destinasi2.png";
import review3 from "../img/destinasi3.png";
import review4 from "../img/destinasi4.png";
import {
  Home,MapPin,Star,Languages,Settings,LogOut,Bell,Search,
  Eye,Pencil,Trash2,
} from 'lucide-react';

// Komponen Modal
const ReviewDetailModal = ({ review, onClose }) => {
  if (!review) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <img src={profile} alt="User" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">John Doe</p>
              <div className="flex text-yellow-500">
                {'★★★★★'}
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-700 mb-4">{review.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[...Array(4)].map((_, index) => (
            <img key={index} src={review.image} alt="Preview" className="w-full h-24 object-cover rounded" />
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300 w-full"        >
          Back
        </button>
      </div>
    </div>
  );
};

// Modal Edit
const EditReviewModal = ({ review, onClose, onSave }) => {
  const [description, setDescription] = useState(review.description);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Review</h2>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-32 p-2 border rounded mb-4"
        />
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(description)}
            className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Hapus
const DeleteReviewModal = ({ review, onClose, onDelete }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg text-center">
      <h2 className="text-xl font-semibold mb-4">Delete Review</h2>
      <p className="mb-4">Are you sure you want to delete <strong>{review.title}</strong>?</p>
      <div className="flex gap-2 justify-center">
        <button
          onClick={onClose}
          className="bg-blue-200 text-blue-800 px-4 py-2 rounded hover:bg-blue-300"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);


const HistoryReviewPage = () => {
  const reviews = [
    {
      id: 1,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: review1,
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
    {
      id: 2,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: review2,
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
    {
      id: 3,
      title: "Air Terjun Lorem Ipsum",
      rating: 4.5,
      date: "2/02/2022",
      image: review3,
      description:
        "Lorem ipsum dolor sit amet. Qui autem molestias sed velit error aut commodi quia...",
    },
  ];

  const removedReview = {
    image: review4,
    title: "Pantai Kapuk",
    date: "31/01/2022",
    reason: "[Pesan pemberitahuan alasan penghapusan]",
  };

  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editReview, setEditReview] = useState(null);
  const [deleteReview, setDeleteReview] = useState(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lang', lng);
    setShowLanguageModal(false);
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

  const handleSee = (id) => {
    const review = reviews.find(r => r.id === id);
    setSelectedReview(review);
  };

  const handleEdit = (id) => {
    const review = reviews.find(r => r.id === id);
    setEditReview(review);
  };
  
  const handleDelete = (id) => {
    const review = reviews.find(r => r.id === id);
    setDeleteReview(review);
  };

  const handleSaveEdit = (newDescription) => {
    alert(`Review ID: ${editReview.id} updated!\nNew Description: ${newDescription}`);
    setEditReview(null);
  };
  
  const handleConfirmDelete = () => {
    alert(`Review ID: ${deleteReview.id} berhasil dihapus`);
    setDeleteReview(null);
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
                      <button onClick={() => handleSee(review.id)} className="bg-green-100 text-green-600 p-2 rounded" title="See"><Eye size={18} /></button>
                      <button onClick={() => handleEdit(review.id)} className="bg-blue-100 text-blue-600 p-2 rounded" title="Edit"><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(review.id)} className="bg-red-100 text-red-600 p-2 rounded" title="Delete"><Trash2 size={18} /></button>
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
              <h2 className="text-lg font-semibold mb-4 text-blue-800">About Your Reviews</h2>
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

      {/* Modal */}
      
      {selectedReview && (
        <ReviewDetailModal
          review={selectedReview}
          onClose={() => setSelectedReview(null)}
        />
      )}

      {editReview && (
        <EditReviewModal
          review={editReview}
          onClose={() => setEditReview(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deleteReview && (
        <DeleteReviewModal
          review={deleteReview}
          onClose={() => setDeleteReview(null)}
          onDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default HistoryReviewPage;
