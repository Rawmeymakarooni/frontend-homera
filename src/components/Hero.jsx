function Hero() {
  const articles = [
    {
      id: 1,
      title: "Cara Menata Ruang Tamu Minimalis",
      imageUrl: "/images/article1.jpg",
      content: "Ruang tamu minimalis cocok untuk rumah modern...",
      publishedAt: "2025-05-01"
    },
    {
      id: 2,
      title: "Inspirasi Dapur Estetik",
      imageUrl: "/images/article2.jpg",
      content: "Dapur dengan warna earth tone sangat populer...",
      publishedAt: "2025-05-01"
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <section className="flex w-full h-screen">
        {/* Left image */}
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/ff/cf/3f/ffcf3f2aafaa21c33652ac3bc9186501.jpg')",
          }}
        ></div>

        {/* Right content */}
        <div className="w-1/2 h-full bg-[#8B7357] flex flex-col justify-center items-start px-12 text-white">
          <h1 className="text-6xl font-serif mb-8">HOMÉRA</h1>
          <div className="bg-[#5A4B38] p-6">
            <h2 className="text-2xl font-semibold">BLOGS</h2>
            <p className="mt-2 text-sm">
              We Create Elegant, Simple and Luxury Interior Design
            </p>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="bg-[#f9f9f9] p-6">
        <div className="space-y-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex gap-6 bg-white p-4 rounded shadow w-full"
            >
              {/* Gambar di kiri */}
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-1/3 h-40 object-cover rounded"
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

export default Hero;
