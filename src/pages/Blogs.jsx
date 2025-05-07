import Navbar from "@/components/Navbar";
function Blogs() {
  const articles = [
    {
      id: 1,
      title: "Cara Menata Halaman Minimalis",
      imageUrl: "/blog3.png",
      content: "Halaman belakang bukan sekadar ruang kosong—ia bisa menjadi oase pribadi di tengah hiruk-pikuk kehidupan. Dengan konsep minimalis bernuansa alam, kamu bisa menciptakan taman yang simpel, elegan, dan menenangkan tanpa harus mengorbankan banyak ruang. Gunakan elemen-elemen alami seperti batu alam, rumput hijau, dan tanaman tropis rendah perawatan seperti monstera, sirih gading, atau pakis. Tambahkan kursi kayu dengan bantal berwarna netral untuk tempat bersantai. Minimalis bukan berarti kosong, melainkan hanya memunculkan yang esensial. Dengan penataan yang cermat dan sentuhan alam, halaman belakang bisa menjadi tempat healing terbaik—tanpa harus pergi jauh dari rumah.",
      publishedAt: "2025-05-01"
    },
    {
      id: 2,
      title: "Ruang Tamu dengan Nuansa Alami dan Modern",
      imageUrl: "/blog2.png",
      content: "Ruang tamu adalah ruang pertama yang menyambut tamu dan menggambarkan karakter pemilik rumah. Dengan gaya simple yang mengedepankan kesederhanaan namun tetap estetik, kamu bisa menciptakan suasana nyaman dan modern sekaligus alami. Pilih furnitur dengan garis bersih dan warna netral seperti putih, krem, atau abu-abu muda. Tambahkan sentuhan alami lewat elemen kayu, rotan, serta tanaman hijau seperti monstera atau sansevieria untuk memberi kesegaran. Gunakan pencahayaan alami sebanyak mungkin, dan padukan dengan lampu gantung minimalis berbahan anyaman atau logam. Hindari dekorasi yang terlalu ramai—cukup beberapa bantal bermotif earthy tone, karpet lembut, dan lukisan bertema alam. Dengan penataan yang rapi dan seimbang, ruang tamu simple ini tidak hanya tampak elegan tapi juga menjadi tempat yang menyenangkan untuk bersantai bersama keluarga maupun menyambut tamu.",
      publishedAt: "2025-05-01"
    },
    {
      id: 3,
      title: "Kamar Estetik dengan Warna Earth Tone",
      imageUrl: "/blog1.png",
      content: "Warna earth tone seperti cokelat muda, krem, terracotta, dan olive green menjadi pilihan sempurna untuk menciptakan kamar yang tenang dan menenangkan. Nuansa ini menghadirkan kehangatan alami yang membuat ruangan terasa lebih nyaman dan cozy. Untuk menghadirkan kesan estetik, gunakan sprei dan selimut dengan warna-warna putih yang lembut, serta tambahkan bantal dekoratif dari linen atau katun bertekstur. Material alami seperti kayu pada ranjang atau meja samping bisa menambah kesan rustic yang elegan. Gunakan tirai tipis agar cahaya matahari masuk dengan lembut, menciptakan atmosfer yang damai. Aksen tambahan seperti tanaman hias kecil, lampu tidur dari rotan, atau lukisan bergaya minimalis bertema alam juga akan memperkuat kesan earth tone. Dengan penataan yang harmonis, kamar tidur ini akan menjadi ruang istirahat ideal yang memberi ketenangan setiap harinya.",
      publishedAt: "2025-05-01"
    },
  ];

  return (
    <>
      <div className="font-serif">
        <Navbar />

        {/* HERO SECTION */}
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
                <p className="mt-2 text-x1">We Create Elegant, Simple, and Luxury Interior Design</p>
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
                <div className="flex flex-col justify-start h-full">
                  <p className="text-sm text-gray-500">
                    {article.publishedAt} 
                  </p>
                  <h2 className="text-3xl font-semibold text-[#36271C] mt-2">
                    {article.title}
                  </h2>
                  <p className="text-sm mt-2 text-gray-700">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Blogs;
