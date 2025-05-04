<<<<<<< HEAD
=======
import Footer from '@/components/Footer'; 
import Navbar from './Navbar';

>>>>>>> b89fb0d (Save local changes before pulling)
function Blogs() {
  const articles = [
    {
      id: 1,
      title: "Cara Menata Ruang Tamu Minimalis",
<<<<<<< HEAD
      imageUrl: "/public/blog3.png",
=======
      imageUrl: "/images/article1.jpg",
>>>>>>> b89fb0d (Save local changes before pulling)
      content: "Ruang tamu minimalis cocok untuk rumah modern...",
      publishedAt: "2025-05-01"
    },
    {
      id: 2,
      title: "Inspirasi Dapur Estetik",
<<<<<<< HEAD
      imageUrl: "/public/blog2.png",
      content: "Dapur dengan warna earth tone sangat populer...",
      publishedAt: "2025-05-01"
    },
    {
      id: 3,
      title: "Inspirasi Dapur Estetik",
      imageUrl: "/public/blog1.png",
=======
      imageUrl: "/images/article2.jpg",
>>>>>>> b89fb0d (Save local changes before pulling)
      content: "Dapur dengan warna earth tone sangat populer...",
      publishedAt: "2025-05-01"
    },
  ];
<<<<<<< HEAD

  return (
    <>
=======

  return (
    <div className="font-serif">
      <Navbar />

      {/* HERO SECTION */}
>>>>>>> b89fb0d (Save local changes before pulling)
      <section className="flex w-full h-screen">
        {/* Left image */}
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('public/bghome4.jpg')",
          }}
        ></div>

        {/* Right content */}
        <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
          {/* Title */}
          <div className="flex items-center text-9xl font-serif mb-8">
            <span
              className="text-[#36271C] absolute left-0 ml-[-270px] z-20"
              style={{ backgroundColor: "transparent" }}
            >
              HOM
            </span>
            <span className="ml-[18px] text-white">ÉRA</span>
          </div>
          <div className="relative left-[-100px] w-[500px] max-w-full">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>
            <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
              <h2 className="text-4xl font-jost">BLOGS</h2>
              <p className="mt-2 text-1x1">We Create Elegant, Simple, and Luxury Interior Design</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="bg-[#f9f9f9] p-6">
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex gap-6 bg-white p-4 rounded shadow w-full shadow hover:shadow-lg transition rounded overflow-hidden"
            >
              {/* Gambar di kiri */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-70 object-cover rounded"
              />

              {/* Konten di kanan */}
              <div className="flex flex-col justify-between">
                <p className="text-sm text-gray-500">
                  {article.publishedAt}
                </p>
                <h2 className="text-lg font-semibold mt-1">{article.title}</h2>
                <p className="text-sm mt-2 text-gray-700">
                  {article.content.substring(0, 100)}...
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Blogs;
