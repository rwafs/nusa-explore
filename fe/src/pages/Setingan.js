import { useState } from "react";
import { Home, MapPin, Star, Languages, Settings, LogOut, Bell, Search, Frown, CheckCircle, Hourglass, FileClock } from "lucide-react";
import { FaUser, FaLock, FaMountain, FaTrash, FaCamera } from "react-icons/fa";
import profile from "../img/profile.png"; 
import { Input } from "../components/ui/input";

export default function SettingsPage() {
  const [activeMenu, setActiveMenu] = useState("Profile");
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showStatusPage, setShowStatusPage] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
    setEditing(false);
  };

  const handleDelete = () => {
    // logika hapus akun di sini
    console.log("Akun berhasil dihapus.");
    setShowPopup(false);
  };

  return (
    <div className="flex h-screen font-['Lexend_Deca']">
      {/* Sidebar */}
      <div className="w-16 bg-teal-700 flex flex-col items-center justify-between py-6 text-black fixed h-full">
        <div className="space-y-6 cursor-pointer">
          <Home className="w-5 h-5" onClick={() => handleSidebarClick("Home")} />
          <MapPin className="w-5 h-5" onClick={() => handleSidebarClick("MapPin")} />
          <Star className="w-5 h-5" onClick={() => handleSidebarClick("Star")} />
          <Languages className="w-5 h-5" onClick={() => handleSidebarClick("Languages")} />
          <Settings className="w-5 h-5" onClick={() => handleSidebarClick("Settings")} />
        </div>
        <LogOut className="w-5 h-5 cursor-pointer" onClick={() => handleSidebarClick("LogOut")} />
      </div>

      {/* Main */}
      <div className="flex-1 bg-gray-100 overflow-auto ml-16">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 bg-white shadow">
          <div className="text-xl font-semibold text-blue-900">NusaExplore</div>
          <div className="flex items-center gap-3 w-full max-w-xl relative">
            <Input type="text" placeholder="Telusuri destinasi" className="w-full pr-10" />
            <div className="absolute right-4 top-3 cursor-pointer">
              <Search className="w-5 h-5 text-gray-500" />
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

        <div className="flex h-full">
          <div className="w-64 bg-[#D6F0F7] p-6 flex flex-col justify-between rounded-xl shadow-lg">
            <div>
              <div className="flex items-center mb-10 text-xl font-bold text-blue-800">
                <span className="text-2xl font-extrabold">Menu</span>
              </div>
              <ul className="space-y-5">
                {["Profile", "Change password", "Become a Destination Manager", "Hapus Akun"].map((item) => (
                  <li
                    key={item}
                    className={`cursor-pointer flex items-center space-x-2 text-[#0B3E58] hover:font-semibold hover:bg-blue-100 rounded-xl ${
                      activeMenu === item ? "font-bold" : ""
                    }`}
                    onClick={() => setActiveMenu(item)}
                  >
                    <span>
                      {item === "Profile" && <FaUser />}
                      {item === "Change password" && <FaLock />}
                      {item === "Become a Destination Manager" && <FaMountain />}
                      {item === "Hapus Akun" && <FaTrash />}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex-1 p-10 overflow-y-auto">
            {/* Profile */}
            {activeMenu === "Profile" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <img src={profile} className="w-28 h-28 rounded-xl object-cover" />
                    <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                      <FaCamera className="text-gray-600" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{username}</h2>
                    <p className="text-sm text-gray-500">Destination manager of [nm_wisata]</p>
                  </div>
                  <button
                    className="ml-auto bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-gray-700">User name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded bg-gray-100"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 rounded bg-gray-100"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!editing}
                    />
                  </div>
                  {editing && (
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border"
                        onClick={() => setEditing(false)}
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Change Password */}
            {activeMenu === "Change password" && (
              <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
    
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <img src={profile} className="w-28 h-28 rounded-xl object-cover" />
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer">
                    <FaCamera className="text-gray-600" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">John Doe</h2>
                  <p className="text-sm text-gray-500">Destination manager of [nm_wisata]</p>
                </div>
                <button 
                  className="ml-auto bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border"
                  onClick={() => setEditing(true)}
                >
                Edit Password
                </button>
              </div>
            
              <div className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-gray-700">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-gray-100"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-gray-100"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 rounded bg-gray-100"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm">{passwordError}</p>
                )}

{editing && (
  <div className="flex justify-end">
    <button 
      className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-xl border"
      onClick={() => setEditing(false)}>
      Save Changes
    </button>
  </div>
)}
              </div>
            </div>
            
            )}

{activeMenu === "Become a Destination Manager" && (
  <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6 max-w-3xl mb-20">
    {!applicationSubmitted ? (
      <>
        <h2 className="text-2xl font-bold text-gray-800">Become Destination Manager</h2>
        <div className="space-y-4">
          {/* Input Form */}
          <div>
            <label className="block text-gray-700">Name</label>
            <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-700">Destination Name</label>
            <input type="text" placeholder="Destination Name" className="w-full px-4 py-2 rounded bg-gray-100" />
          </div>
          <div>
            <label className="block text-gray-700">Why do you want to become a Tourism Admin?</label>
            <textarea placeholder="Your reason" className="w-full px-4 py-2 rounded bg-gray-100" rows={3}></textarea>
          </div>
          <div>
            <label className="block text-gray-700">Brief Description of the Destination</label>
            <textarea placeholder="Description" className="w-full px-4 py-2 rounded bg-gray-100" rows={3}></textarea>
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Upload Supporting Document (Optional)</label>
            <input type="file" className="block" />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-800 text-white font-bold px-6 py-2 rounded-xl"
              onClick={() => setShowSubmitConfirm(true)}
            >
              Submit
            </button>
          </div>
        </div>
      </>
    ) : (
      <>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Application Status</h2>
        <div className="flex justify-between items-center px-4 py-6 bg-gray-50 rounded-xl shadow-inner">
          <div className="text-center flex-1">
            <CheckCircle className="text-green-500 w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Submitted</p>
            <p className="text-xs text-gray-500">02/02/2022</p>
          </div>
          <div className="text-center flex-1">
            <FileClock className="text-yellow-500 w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Under Review</p>
            <p className="text-xs text-gray-500">02/02/2022</p>
          </div>
          <div className="text-center flex-1">
            <Hourglass className="text-gray-500 w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Result</p>
            <p className="text-xs text-gray-500">Review in progress</p>
          </div>
        </div>
      </>
    )}
  </div>
)}

{showSubmitConfirm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm text-center space-y-4">
      <p className="text-lg font-semibold text-green-700">Your application submitted!</p>
      <p className="text-gray-600 text-sm">Thank you for your application. Our team will review it shortly.</p>
      <div className="flex justify-center">
        <button
          onClick={() => {
            setShowSubmitConfirm(false);
            setApplicationSubmitted(true);
          }}
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-800 text-white"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}


            

{/* Popup Konfirmasi Hapus Akun */}
{activeMenu === "Hapus Akun" && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-2xl p-8 w-80 text-center shadow-lg">
      <Frown className="text-yellow-500 mx-auto mb-4 w-12 h-12" />
      <h2 className="text-xl font-semibold mb-2">Delete Account</h2>
      <p className="text-gray-600 mb-6">
        Are you sure you want to delete this account?
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg w-24"
        >
          Yes
        </button>
        <button
          onClick={() => setActiveMenu('')}  // Mengatur activeMenu ke nilai yang bukan "Hapus Akun"
          className="bg-blue-600 text-blue px-4 py-2 rounded-lg w-24"
        >
          No
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
