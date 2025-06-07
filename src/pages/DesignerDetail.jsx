import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";

function DesignerDetail() {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem("comments");
    return saved ? JSON.parse(saved) : [];
  });
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

  const updatedComments = [
    { name: "You", text: newComment },
    ...comments,
  ];
  
  
  // Ambil komentar dari localStorage saat pertama kali load
  setComments(updatedComments);
    localStorage.setItem("comments", JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleDeleteComment = (index) => {
    // Hapus komentar berdasarkan index
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    
    // Update localStorage
    localStorage.setItem("comments", JSON.stringify(updatedComments));
  };
  
  const navigate = useNavigate();
  const { id } = useParams(); // Ambil id dari URL
  // State untuk portofolio dinamis
  const [rooms, setRooms] = useState([]);
  // Ambil data pribadi designer dari backend
  const [designer, setDesigner] = useState(null);

  // Fetch portofolio user setelah designer data siap
  useEffect(() => {
    if (designer && designer.data && designer.data.uid) {
      fetch(`/portofolio/user/${designer.data.uid}`)
        .then(res => res.json())
        .then(res => setRooms(res.data || []));
    }
  }, [designer]);

  useEffect(() => {
    fetch(`/designerdetails?uid=${id}`)
      .then(res => res.json())
      .then(data => setDesigner(data))
      .catch(() => setDesigner(null));
  }, [id]);

  if (!designer || !designer.data) {
    return <div>Desainer tidak ditemukan</div>;
  }

  const goToDesignDetail = (roomId) => {
    navigate(`/design/${roomId}`);
  };  

  return (
    <>
      <div className="pt-[70px] bg-[#8B7357] text-white">
        <div className="px-5 flex font-bold">
          <button
            onClick={() => navigate('/Designer')}
            className="text-3xl ml-5 hover:text-gray-300 transition"
          >
            <i className="ri-arrow-left-circle-line"></i>
          </button>
        </div>
        <section className="h-[300px] bg-[#8B7357] text-white min-h-[20vh] flex px-12 items-center justify-between mt-[-30px]">
          <div>
            <p className="text-2xl mb-5">Hello, I'm</p>
            <h1 className="text-5xl font-serif font-bold mb-3 text">{designer.data.uname}</h1>
            <p className="text-5md font-serif">{designer.data.user_job}</p>
            <div className="mt-4 text-sm">
              <p>{designer.data.location}</p>
              <p>{designer.data.email}</p>
              <p>{designer.data.whatsapp}</p>
              <p>{designer.data.instagram}</p>
            </div>
          </div>
          <div className="w-60 h-60 object-cover">
            {/* Gunakan profilePicture yang sudah diformat oleh backend atau fallback ke ppict dengan penanganan URL yang benar */}
            <img 
              src={designer.data.profilePicture || (designer.data.ppict?.startsWith('http') ? designer.data.ppict : `/${designer.data.ppict}`)} 
              alt={designer.data.uname} 
              className="w-full h-full object-cover rounded-xl"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://res.cloudinary.com/dqpnrqvzi/image/upload/v1686138329/homera/profil/Default.jpg';
              }} 
            />
          </div>
        </section>
      </div>

      <section className="py-16 px-12 bg-white">
        <h2 className="text-4xl font-serif text-center text-[#4e3b26] mb-8">About me</h2>
        <div className="flex flex-row items-center gap-12 max-w-4xl mx-auto">
          <img
            src={`/${designer.data.ppict}`}
            alt={designer.data.uname}
            className="w-60 h-60 object-cover rounded-full"
            style={{ minWidth: 180 }}
          />
          <p className="text-left text-gray-700 text-lg">
            {designer.data.user_desc}
          </p>
        </div>
      </section>

      <section className="py-12 px-12 text-center bg-white">
        <h2 className="text-4xl font-serif text-[#4e3b26] mb-8">Portofolio</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {rooms.map(room => (
            <div
              key={room.porto_id}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer transition hover:scale-105"
              onClick={() => navigate(`/design/${room.porto_id}`)}
            >
              <img
                src={room.cover || '/noimage.png'}
                alt={room.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-3 text-center font-semibold text-[#36271C]">{room.title}</div>
            </div>
          ))}
        </div>

      </section>

      <section className="bg-white py-10 px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl text-center font-serif text-[#4e3b26] mb-8">Testimonial</h2>

          <div className="w-full p-4 space-y-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="bg-gray p-4 rounded shadow text-gray-800 flex justify-between items-start"
              >
                <div>
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-sm">{comment.text}</p>
                </div>
                <button
                  onClick={() => handleDeleteComment(index)}
                  className="text-red-600 hover:text-red-800 hover:scale-105 transition duration-300 ease-in-out transform flex items-center gap-1 ml-4"
                >
                  <i className="ri-delete-bin-6-line text-lg"></i>
                </button>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mb-6">
  <div className="flex items-center gap-3">
    <label htmlFor="comment-input" className="sr-only">Komentar</label>
    <textarea
      id="comment-input"
      name="comment"
      rows="1"
      className="flex-grow p-3 border border-[#8B7357] rounded-l-full resize-none text-[#4e3b26] min-h-[40px]"
      placeholder="Write Your Comments Here..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
    ></textarea>
    <button
      type="submit"
      className="bg-[#8B7357] text-white px-6 py-3 rounded-r-full hover:bg-[#6e5e4b] transition"
    >
      Send
    </button>
  </div>
</form>

        </div>
      </section>
    </>
  );
}

export default DesignerDetail;