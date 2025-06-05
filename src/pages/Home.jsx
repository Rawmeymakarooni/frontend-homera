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

  const exploreExamples = [
    {
      name: "Soft Earth Harmony",
      image: "/portodesain1.png",
      designer: "Leonardo Pratama",
    },
    {
      name: "Modern Dream Space",
      image: "/bed.png",
      designer: "Nadira Vera",
    },
  ];

  const designerIdMap = {
    "Leonardo Pratama": 1,
    "Nadira Vera": 2,
    "Nathan Wirawan": 3,
  };

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
            {exploreExamples.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <Link to={`/design/${idx + 1}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover hover:brightness-90 transition"
                  />
                </Link>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#36271C] hover:underline hover:text-[#af7b43]">
                    <Link to={`/design/${idx + 1}`}>{item.name}</Link>
                  </h3>
                  <p className="text-sm text-[#5A4B38] hover:underline hover:text-[#af7b43]">
                    <Link to={`/designer/${designerIdMap[item.designer]}`}>
                      {item.designer}
                    </Link>
                  </p>
                </div>
              </div>
            ))}
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
