import React from "react";
import { motion } from "framer-motion";

function Blogs() {
  const articles = [
    {
      id: 1,
      title: "Cara Menata Ruang Tamu Minimalis",
      imageUrl: "/blog3.png",
      content: "Ruang tamu minimalis cocok untuk rumah modern...",
      publishedAt: "2025-05-01",
    },
    {
      id: 2,
      title: "Inspirasi Dapur Estetik",
      imageUrl: "/blog2.png",
      content: "Dapur dengan warna earth tone sangat populer...",
      publishedAt: "2025-05-01",
    },
    {
      id: 3,
      title: "Inspirasi Dapur Estetik",
      imageUrl: "/blog1.png",
      content: "Dapur dengan warna earth tone sangat populer...",
      publishedAt: "2025-05-01",
    },
  ];

  return (
    <div className="font">
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
                BLOGS
              </motion.h2>
              <motion.p
                className="mt-2 text-1x1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                We Create Elegant, Simple, and Luxury Interior
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="bg-[#f9f9f9] p-6">
        <div className="space-y-6">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              className="flex gap-6 bg-white p-4 rounded shadow w-full hover:shadow-lg transition overflow-hidden"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-70 object-cover rounded"
              />
              <div className="flex flex-col justify-between">
                <p className="text-sm text-gray-500">
                  {article.publishedAt}
                </p>
                <h2 className="text-lg font-semibold mt-1">{article.title}</h2>
                <p className="text-sm mt-2 text-gray-700">
                  {article.content.substring(0, 100)}...
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
