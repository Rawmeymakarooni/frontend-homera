import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Home() {
  const rooms = [
    { name: "Living", image: "/living.png" },
    { name: "Bath", image: "/bath.png" },
    { name: "Bed", image: "/bed.png" },
    { name: "Kitchen", image: "/kitchen.png" },
  ];

  const designers = [
    { name: "Leonardo Pratama", image: "/leo.png" },
    { name: "Nadira Vera", image: "/nadira.png" },
    { name: "Nathan Wirawan", image: "/nathan.png" },
  ];

  // Dua portofolio random dari backend
  const [homePortos, setHomePortos] = useState([]);
  const [loadingHomePortos, setLoadingHomePortos] = useState(true);
  const [homePortoError, setHomePortoError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingHomePortos(true);
    setHomePortoError(null);
    import('../services/api').then(({ getHomePortos }) => {
      getHomePortos()
        .then(portos => {
          if (isMounted) setHomePortos(portos);
        })
        .catch(err => {
          if (isMounted) setHomePortoError(err.message || 'Gagal memuat portofolio');
        })
        .finally(() => {
          if (isMounted) setLoadingHomePortos(false);
        });
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="flex w-full h-screen overflow-hidden">
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/bghome4.jpg')" }}
        ></div>

        <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
          <div className="flex text-8xl font-serif mb-8 relative leading-tight">
            <motion.div
              className="absolute left-0 ml-[-270px] z-20 text-[#36271C]"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                bounce: 0.5,
                delay: 0.3,
              }}
            >
              <div>BEST</div>
              <div>YOUR</div>
            </motion.div>

            <motion.div
              className="ml-[18px] text-white"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                bounce: 0.5,
                delay: 0.6,
              }}
            >
              <div>INTERIOR</div>
              <div>HOME</div>
              <motion.p
                className="text-lg mt-4 text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Find the best interior design inspiration and connect directly
                with professional designers. Homera is the place for creative
                ideas and collaboration in interior design.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Explore Preview */}
      <section className="px-10 py-14 bg-[#F5F5F5]">
        <h2 className="text-4xl font-bold text-center mb-2 text-[#36271C]">
          EXPLORE
        </h2>
        <p className="text-center text-lg mb-10 text-gray-600">
          Your Design Journey Starts Here
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Dua gambar desain */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            {loadingHomePortos ? (
              <div className="col-span-2 text-center text-gray-400">Loading...</div>
            ) : homePortoError ? (
              <div className="col-span-2 text-center text-red-400">{homePortoError}</div>
            ) : homePortos.length === 0 ? (
              <div className="col-span-2 text-center text-gray-400">Belum ada portofolio.</div>
            ) : (
              homePortos.map(item => {
                const portoId = item.porto_id || item.portofolioId;
                return (
                  <div key={portoId} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
                    <Link to={`/design/${portoId}`} className="block w-full aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={item.cover ? item.cover : "/noimage.png"}
                        alt={item.title}
                        className="object-cover w-full h-full transition hover:scale-105 duration-300"
                        onError={e => { e.target.onerror = null; e.target.src = "/noimage.png"; }}
                      />
                    </Link>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/design/${portoId}`} className="font-semibold text-lg text-[#1a1208] hover:text-[#af7b43] transition line-clamp-2">{item.title}</Link>
                        <div className="text-sm text-[#6b4f27] mt-1">Kategori: {item.kategori}</div>
                      </div>
                      <div className="mt-2">
                        {item.uid && (
                          <Link to={`/designer/${item.uid}`} className="text-[#af7b43] font-semibold hover:underline">
                            by {item.uname}
                          </Link>
                        )}
                        {/* Fallback jika belum ada uid */}
                        {!item.uid && item.uname && (
                          <Link to={`/designer/${item.uname}`} className="text-[#af7b43] font-semibold hover:underline">
                            by {item.uname}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Teks + tombol di samping */}
          <div className="flex flex-col items-start md:ml-8">
            <h3 className="text-2xl font-semibold mb-4 text-[#36271C]">
              Find Room For Your Family
            </h3>
            <p className="text-left text-sm mb-5 text-gray-600 leading-relaxed">
               Explore a wide range of interior inspirations tailored to bring warmth, style, and functionality into your family's living space. Discover layouts that suit your everyday needs and turn your house into a true home.
               </p>

            <Link
              to="/explore"
              className="bg-[#8B7357] hover:bg-[#725d46] text-white px-6 py-3 rounded-md transition duration-300"
            >
              Explore All
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
