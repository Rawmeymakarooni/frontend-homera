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
  const designers = [
    {
      id: 1,
      name: "Leonardo Pratama",
      image: "https://i.pinimg.com/736x/92/5d/c4/925dc42ab4d565440fc168d459c6bc2a.jpg",
      description: "Interior Designer | Modern & Minimalist Specialist",
      address: "Semarang, Indonesia",
      email: "leonardo.pratama@gmail.com",
      whatsapp: "+62 814-6362-2736",
      instagram: "@leonardp",
      rooms: [
        {name: "Soft Earth Harmony", image:"/portodesain1.png"},
        {name: "Calm Nest Retreat", image:"/bed22.jpg"},
        {name: "Neat Flow Kitchen", image:"/kitchen2.jpg"},
        {name: "Cream Serenity", image:"/bathroom2.jpg"},
        {name: "Minimalist Breeze Spot", image:"/gardeen2.jpg"},
        {name: "Serene Aqua Lines", image:"/pool2.jpg"},
        {name: "Playful Minimal Charm", image:"/bed2.jpg"},
        {name: "Modern Table Essence", image:"/dining2.jpg"},
      ],
    },
    {
      id: 2,
      name: "Nadira Vera",
      image: "https://i.pinimg.com/736x/52/d7/e4/52d7e40bbc472afeb190030cf16471bb.jpg",
      description: "Interior Design Enthusiast",
      address: "Jakarta, Indonesia",
      email: "nadiravera@gmail.com",
      whatsapp: "+62 814-6772-0737",
      instagram: "@nad.vera",
      rooms: [
        {name: "Modern Dream Space", image:"/bed.png"},
        {name: "Airy Light Living Room", image:"/living.png"},
        {name: "Clean Cut Kitchen", image:"/kitchen.png"},
        {name: "Marble Glow Bathroom", image:"/bath.png"},
        {name: "Linear Calm Pool Area", image:"/modernpool.jpg"},
        {name: "Pure Form Dining Area", image:"/moderndining.jpg"},
        {name: "Modern Zen Terrace", image:"/modernterrace.jpg"},
        {name: "Bright & Simple Kids Space", image:"/modernkidsbed.jpg"},
      ],
    },
    {
      id: 3,
      name: "Nathan Wirawan",
      image: "https://i.pinimg.com/736x/4b/9b/e0/4b9be0ae3599b7b70e8c247ffaf56655.jpg",
      description: "Interior Designer | Urban Industrial Specialist",
      address: "Bali, Indonesia",
      email: "nathanwira@gmail.com",
      whatsapp: "+62 880-9372-0737",
      instagram: "@nathan_wira",
      rooms: [
        {name: "Industrial Kitchen Corner", image:"/kitchenindustrial.jpg"},
        {name: "Modern Urban Shower Space", image:"/bathindustrial.jpg"},
        {name: "Cozy Rustic Bedroom", image:"/bedindustrial.jpg"},
        {name: "Industrial Elegance Living Room", image:"/livingindustrial.jpg"},
        {name: "Brick & Timber Dining", image:"/diningindustrial.jpg"},
        {name: "Urban Stone Poolside", image:"/poolindustrial.jpg"},
        {name: "Urban Industrial Terrace", image:"/terraceindustrial.jpg"},
        {name: "Cozy Urban Kid’s Room", image:"/kidsbedindustrial.jpg"},
      ],
    },
  ];

  // Cari data desainer yang sesuai dengan id
  const designer = designers.find(d => d.id === parseInt(id));

  if (!designer) {
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
            <h1 className="text-5xl font-serif font-bold mb-3 text">{designer.name}</h1>
            <p className="text-5md font-serif">{designer.description}</p>
            <div className="mt-4 text-sm">
              <p>{designer.address}</p>
              <p>{designer.email}</p>
              <p>{designer.whatsapp}</p>
              <p>{designer.instagram}</p>
            </div>
          </div>
          <div  className="w-60 h-60 object-cover">
            <img src={designer.image} alt={designer.name} className="w-full h-full object-cover rounded-xl" />
          </div>
        </section>
      </div>

      <section className="py-16 px-12 bg-white">
        <h2 className="text-4xl font-serif text-center text-[#4e3b26] mb-8">About me</h2>
        <div className="flex items-center justify-center gap-8">
          <img src={designer.image} alt={designer.name} className="w-60 h-60 object-cover rounded-full" />
          <p className="max-w-xl text-left text-gray-700">
            I’m {designer.name}, an interior designer who believes in the power of simplicity and space. I specialize in minimalist concepts and functional aesthetics, creating spaces that not only look beautiful but feel right.
          </p>
        </div>
      </section>

      <section className="py-12 px-12 text-center bg-white">
        <h2 className="text-4xl font-serif text-[#4e3b26] mb-8">Portofolio</h2>
        <div className="max-h-[600px] overflow-y-auto scrollbar-hide pb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {designer.rooms.map((room, index) => (
              <div
                key={index}
                className="shadow hover:shadow-lg transition rounded overflow-hidden cursor-pointer"
                onClick={() => goToDesignDetail(index + 1)}
                title={`View details of ${room.name}`}
              >
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-48 object-cover"
                />
                <div className="text-center py-3 text-lg font-medium text-black">
                  {room.name}
                </div>
              </div>
            ))}
          </div>
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
    <textarea
      rows="1" // kamu bisa atur ini jadi 1 supaya lebih pas tinggi textarea
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