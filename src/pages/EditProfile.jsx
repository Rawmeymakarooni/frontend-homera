import { useState } from 'react';
import { FaCamera } from 'react-icons/fa';

export default function EditProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    instagram: '',
    whatsapp: '',
    password: '',
    location: '',
    job: '',
    description: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated!');
    // Di sini bisa ditambahkan logic update ke backend
  };

  return (
    <div
  className="flex justify-center items-center min-h-screen bg-cover bg-center px-4 pt-36 pb-20"
  style={{ backgroundImage: "url('/bg.png')" }}
>
  <div className="bg-white pt-20 px-6 pb-6 rounded-2xl shadow-xl w-full max-w-2xl relative">
    {/* Foto profil bulat keluar dari putih */}
    <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
      <div className="relative">
        <img
          src={profileImage || '/default-avatar.png'}
          alt="Profile"
          className="w-45 h-45 rounded-full object-cover border-4 border-white shadow-md"
        />
        <label htmlFor="profilePic" className="absolute bottom-0 right-0 bg-white p-1 rounded-full cursor-pointer shadow-md">
          <FaCamera className="text-gray-600" />
          <input
            id="profilePic"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>
    </div>

    <h2 className="text-3xl font-bold mt-16 text-center text-black">Profile</h2>

 


        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: 'username', label: 'Username' },
            { name: 'email', label: 'Email' },
            { name: 'instagram', label: 'Instagram' },
            { name: 'whatsapp', label: 'WhatsApp' },
            { name: 'password', label: 'Password', type: 'password' },
            { name: 'location', label: 'Location' },
            { name: 'job', label: 'Job' },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block mb-1 font-semibold text-gray-700">{label}</label>
              <input
                type={type || 'text'}
                name={name}
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border rounded p-2 text-black bg-white"
              />
            </div>
          ))}

          {/* Description field */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Description</label>
            <textarea
              name="description"
              rows="3"
              placeholder="Tell us about yourself"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2 text-black bg-white"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
