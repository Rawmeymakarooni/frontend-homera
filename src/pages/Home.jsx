import { motion } from "framer-motion";


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

  return (
    <>
    <div>
      {/* BEST / YOUR muncul dari kiri */}
      <motion.div
        className="absolute left-0 ml-[-270px] z-20 text-[#36271C]"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 12,
          bounce: 0.5,
          delay: 0.5,
        }}
      >
        <div>BEST</div>
        <div>YOUR</div>
      </motion.div>

      {/* INTERIOR / HOME muncul dari kanan */}
      <motion.div
        className="ml-[18px] text-white"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 12,
          bounce: 0.5,
          delay: 0.5,
        }}
      >
        <div>INTERIOR</div>
        <div>HOME</div>
        <motion.p
          className="text-lg mt-4 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.1 }}
        >
          Find the best interior design inspiration and connect directly
          with professional designers. Homera is the place for creative ideas and
          collaboration in interior design.
        </motion.p>
      </motion.div>
    </div>

      {/* Section 2: EXPLORE BY ROOM */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">EXPLORE IDEAS BY ROOM</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {rooms.map((room, index) => (
            <div key={index} className="shadow hover:shadow-lg transition rounded overflow-hidden">
              <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
              <div className="text-center py-3 text-lg font-medium text-black">{room.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: MEET YOUR DESIGNER */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">MEET YOUR DESIGNER</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {designers.map((designer, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={designer.image}
                alt={designer.name}
                className="w-32 h-32 object-cover rounded-full shadow-md hover:shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl"
              />
              <p className="mt-3 font-medium text-black">{designer.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
