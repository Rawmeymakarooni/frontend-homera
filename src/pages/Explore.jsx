import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getExplorePortofoliosByCategory } from '../services/api';

function Explore() {
  const categories = ["All", "Living", "Bath", "Bed", "Kitchen", "Terrace", "Pool", "Dining"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [portofolios, setPortofolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getExplorePortofoliosByCategory(selectedCategory.toLowerCase())
      .then(data => {
        setPortofolios(data);
      })
      .catch(err => {
        setError(err.message || 'Gagal mengambil data');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedCategory]);

  // Helper: fallback gambar jika gagal load
  const handleImageError = (e) => {
    e.target.src = '/noimage.png';
  };

  return (
    <>
      {/* Section 1: Hero */}
      <section className="flex w-full h-screen">
        {/* Left image */}
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/bghome4.jpg')", // ✅ Tanpa 'public/'
          }}
        ></div>

        {/* Right content */}
        <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
          {/* Title */}
          <div className="flex items-center text-9xl font-serif mb-8">
            <span className="text-[#36271C] absolute left-0 ml-[-270px] z-20">
              HOM
            </span>
            <span className="ml-[18px] text-white">
              ÉRA
            </span>
          </div>

          {/* Blog Box */}
          <div className="relative left-[-100px] w-[500px] max-w-full">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>
            <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
              <h2 className="text-4xl font-jost">
                EXPLORE
              </h2>
              <p className="mt-2 text-1x1">
                Your Design Journey Starts Here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Filter + Content */}
      <section className="w-full bg-[#F5F0EB] flex px-10 py-8 gap-10">
        {/* Kategori */}
        <div className="w-25 flex flex-col gap-5">
          {categories.map((cat, index) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#5A4B38] text-white"
                  : "bg-[#E6D9C3] text-[#36271C]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Desain */}
        <div className="flex-1 max-h-[450px] overflow-y-auto pr-3 custom-scroll">
          <h2 className="text-3xl font-bold text-[#36271C] mb-4">
            Showing: {selectedCategory}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {loading ? (
              <div className="col-span-2 text-center text-gray-400">Loading...</div>
            ) : error ? (
              <div className="col-span-2 text-center text-red-400">{error}</div>
            ) : portofolios.length === 0 ? (
              <div className="col-span-2 text-center text-gray-400">Tidak ada portofolio.</div>
            ) : portofolios.map((item) => (
              <div key={item.porto_id} className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer">
                <Link to={`/design/${item.porto_id}`}>
                  <img
                    src={item.cover ? item.cover : "/noimage.png"}
                    alt={item.title}
                    className="w-full h-72 object-cover hover:brightness-90 transition"
                    onError={handleImageError}
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-[#1a1208] hover:underline hover:text-[#af7b43]">
                      {item.title}
                    </h3>
                    <div className="text-sm text-[#6b4f27] mt-1">Kategori: {item.kategori}</div>
                    {item.uid && (
                      <div className="mt-1">
                        <Link to={`/designer/${item.uid}`} className="text-[#af7b43] font-semibold hover:underline">by {item.uname}</Link>
                      </div>
                    )}
                    {/* Fallback jika belum ada uid */}
                    {!item.uid && item.uname && (
                      <div className="mt-1">
                        <Link to={`/designer/${item.uname}`} className="text-[#af7b43] font-semibold hover:underline">by {item.uname}</Link>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
