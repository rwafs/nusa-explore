import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      alert("Harap isi semua kolom!");
      return;
    }

    console.log("Login berhasil:", formData);
    setIsAuthenticated(true);
    navigate("/home");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 to-white">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-2">Create an Account</h2>
        <p className="text-gray-500 text-center mb-5">Daftar untuk mendapatkan pengalaman terbaik</p>
        
        <form onSubmit={handleSubmit}>
          {["Username", "Email", "Password"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-700">{field}</label>
              <input
                type={field.toLowerCase() === "password" ? "password" : "text"}
                name={field.toLowerCase()}
                placeholder={field}
                value={formData[field.toLowerCase()]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            </div>
          ))}
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition duration-300">
            Daftar
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Sudah punya akun? <a href="#" className="text-blue-600">Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
