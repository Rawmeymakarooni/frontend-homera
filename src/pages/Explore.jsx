import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Explore() {
  const navigate = useNavigate(); // << Ini wajib!

  const categories = ["All", "Living", "Bath", "Bed", "Kitchen", "Terrace", "Pool", "Dining"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Data desain
  const allDesigns = [
    { id: 1, title: "Soft Earth Harmony", designer: "Leonardo Pratama", image: "/portodesain1.png", category: "Living" },
    { id: 2, title: "Modern Dream Space", designer: "Nadira Vera", image: "/bed.png", category: "Bed" },
    { id: 3, title: "Calm Nest Retreat", designer: "Leonardo Pratama", image: "/bed22.jpg", category: "Bed" },
    { id: 4, title: "Neat Flow Kitchen", designer: "Leonardo Pratama", image: "/kitchen2.jpg", category: "Kitchen" },
    { id: 5, title: "Industrial Kitchen Corner", designer: "Nathan Wirawan", image: "/kitchenindustrial.jpg", category: "Kitchen" },
    { id: 6, title: "Cream Serenity", designer: "Leonardo Pratama", image: "/bathroom2.jpg", category: "Bath" },
    { id: 7, title: "Minimalist Breeze Spot", designer: "Leonardo Pratama", image: "/gardeen2.jpg", category: "Terrace" },
    { id: 8, title: "Airy Light Living Room", designer: "Nadira Vera", image: "/living.png", category: "Living" },
    { id: 9, title: "Serene Aqua Lines", designer: "Leonardo Pratama", image: "/pool2.jpg", category: "Pool" },
    { id: 10, title: "Playful Minimal Charm", designer: "Leonardo Pratama", image: "/bed2.jpg", category: "Bed" },
    { id: 11, title: "Modern Table Essence", designer: "Leonardo Pratama", image: "/dining2.jpg", category: "Dining" },
    { id: 12, title: "Clean Cut Kitchen", designer: "Nadira Vera", image: "/kitchen.png", category: "Kitchen" },
    { id: 13, title: "Marble Glow Bathroom", designer: "Nadira Vera", image: "/bath.png", category: "Bath" },
    { id: 14, title: "Linear Calm Pool Area", designer: "Nadira Vera", image: "/modernpool.jpg", category: "Pool" },
    { id: 15, title: "Modern Urban Shower Space", designer: "Nathan Wirawan", image: "/bathindustrial.jpg", category: "Bath" },
    { id: 16, title: "Cozy Rustic Bedroom", designer: "Nathan Wirawan", image: "/bedindustrial.jpg", category: "Bed" },
    { id: 17, title: "Industrial Elegance Living Room", designer: "Nathan Wirawan", image: "/livingindustrial.jpg", category: "Living" },
    { id: 18, title: "Brick & Timber Dining", designer: "Nathan Wirawan", image: "/diningindustrial.jpg", category: "Dining" },
    { id: 19, title: "Urban Stone Poolside", designer: "Nathan Wirawan", image: "/poolindustrial.jpg", category: "Pool" },
    { id: 20, title: "Urban Industrial Terrace", designer: "Nathan Wirawan", image: "/terraceindustrial.jpg", category: "Terrace" },
    { id: 21, title: "Cozy Urban Kid’s Room", designer: "Nathan Wirawan", image: "/kidsbedindustrial.jpg", category: "Bed" },
    { id: 22, title: "Bright & Simple Kids Space", designer: "Nadira Vera", image: "/modernkidsbed.jpg", category: "Bed" },
    { id: 23, title: "Modern Zen Terrace", designer: "Nadira Vera", image: "/modernterrace.jpg", category: "Terrace" },
    { id: 24, title: "Pure Form Dining Area", designer: "Nadira Vera", image: "/moderndining.jpg", category: "Dining" },
  ];

  const filteredDesigns =
    selectedCategory === "All"
      ? allDesigns
      : allDesigns.filter((item) => item.category === selectedCategory);

  const designerIdMap = {
    "Leonardo Pratama": 1,
    "Nadira Vera": 2,
    "Nathan Wirawan": 3,
  };

  return (
    <>
      {/* Hero */}
      <section className="flex w-full h-screen">
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/bghome4.jpg')" }}
        ></div>

        <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
          <div className="flex items-center text-9xl font-serif mb-8">
            <motion.span
              className="text-[#36271C] absolute left-0 ml-[-270px] z-20"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
              style={{ backgroundColor: "transparent" }}
            >
              HOM
            </motion.span>
            <motion.span
              className="ml-[18px] text-white"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              ÉRA
            </motion.span>
          </div>

          <div className="relative left-[-100px] w-[500px] max-w-full">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>
            <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
              <motion.h2
                className="text-4xl font-jost"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: false }}
              >
                EXPLORE
              </motion.h2>
              <motion.p
                className="mt-2 text-1x1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Your Design Journey Starts Here
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter + Content */}
      <section className="w-full bg-[#F5F0EB] flex px-10 py-8 gap-15">
        <div className="w-50 flex flex-col gap-5">
          {categories.map((cat, index) => (
            <motion.button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-[#5A4B38] text-white"
                  : "bg-[#E6D9C3] text-[#36271C]"
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        <div className="flex-1 max-h-[400px] overflow-y-auto pr-3 custom-scroll">
          <h2 className="text-3xl font-bold text-[#36271C] mb-4">
            Showing: {selectedCategory}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredDesigns.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer"
                onClick={() => navigate(`/design/${item.id}`)} // klik desain navigasi ke detail desain
              >
                <img
                  src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                  alt={item.title}
                  className="w-full h-64 object-cover hover:brightness-90 transition"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-[#36271C] hover:underline hover:text-[#af7b43]">
                    {item.title}
                  </h3>
                  <p
                    className="text-sm text-[#5A4B38] hover:underline hover:text-[#af7b43]"
                    onClick={(e) => {
                      e.stopPropagation(); // biar gak trigger klik desain
                      navigate(`/designer/${designerIdMap[item.designer]}`); // klik nama designer ke page designer
                    }}
                  >
                    {item.designer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
