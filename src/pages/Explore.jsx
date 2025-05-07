import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Tambah animasi

function Explore() {
  const categories = ["All", "Living", "Bath", "Bed", "Kitchen", "Terrace", "Pool"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Data
  const allDesigns = [
    {
      id: 1,
      title: "Judul Desain",
      designer: "Leonardo Pratama",
      image: "/living.png",
      category: "Living",
    },
    {
      id: 2,
      title: "Judul Desain",
      designer: "Nadira Vera",
      image: "/bed.png",
      category: "Bed",
    },
    {
      id: 3,
      title: "Judul Desain",
      designer: "Nathan Wirawan",
      image: "/.png",
      category: "Terrace",
    },
    {
      id: 4,
      title: "Judul Desain",
      designer: "Nama Desainer",
      image: "/.png",
      category: "Living",
    },
    // Tambah data lainnya...
  ];

  const filteredDesigns =
    selectedCategory === "All"
      ? allDesigns
      : allDesigns.filter((item) => item.category === selectedCategory);

  const designerIdMap = {
    "Leonardo Pratama": 1,
    "Nadira Vera": 2,
    "Nathan Wirawan": 3,
    // Tambah id desainer lainnya
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
            <motion.span
              className="text-[#36271C] absolute left-0 ml-[-270px] z-20"
              style={{ backgroundColor: "transparent" }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
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

          {/* Blog Box */}
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
      
      {/* Section 2: Filter + Content */}
      <section className="w-full bg-[#F5F0EB] flex px-10 py-8 gap-10">
        {/* Kategori */}
        <div className="w-25 flex flex-col gap-5">
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

        {/* Desain */}
        <div className="flex-1 max-h-[335px] overflow-y-auto pr-3 custom-scroll">
          <h2 className="text-3xl font-bold text-[#36271C] mb-4">
            Showing: {selectedCategory}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-20">
            {filteredDesigns.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-md border border-[#C4B29A] overflow-hidden "
              >
                <img
                  src={item.image.startsWith("/") ? item.image : `/${item.image}`}
                  alt={item.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-[#36271C] hover:underline font-weight-500 text-decoration-inherit hover:text-[#af7b43]">
                    <Link to={`/design/${item.id}`}>{item.title}</Link>
                  </h3>
                  <p className="text-sm text-[#5A4B38] hover:underline font-weight-500 text-[#5A4B38] text-decoration-inherit hover:text-[#af7b43]">
                    <Link to={`/designer/${designerIdMap[item.designer]}`}>
                      {item.designer}
                    </Link>
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
