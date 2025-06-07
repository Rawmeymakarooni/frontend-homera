import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Designer() {
  const [designers, setDesigners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:3000/designer-list?page=${page}&limit=${limit}`)
      .then(res => res.json())
      .then(data => {
        setDesigners(data.designers || []);
        setTotal(data.total || 0);
        setLoading(false);
      })
      .catch(err => {
        setError("Gagal mengambil data designer");
        setLoading(false);
      });
  }, [page, limit]);

  const totalPages = Math.ceil(total / limit);

  return (
    <>
      {/* Section 1: Hero */}
      <section className="flex w-full h-screen">
        <div
          className="w-1/2 h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/bghome4.jpg')",
          }}
        ></div>

        <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
          <div className="flex items-center text-9xl font-serif mb-8">
            <motion.span
              className="text-[#36271C] absolute left-0 ml-[-270px] z-20"
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
                DESIGNER
              </motion.h2>
              <motion.p
                className="mt-2 text-1x1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Create with Experts
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Designer list */}
      <section className="bg-white py-12 px-6">
        <h2 className="text-2xl font-semibold text-center mb-8 text-black">
          MEET YOUR DESIGNER
        </h2>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : designers.length === 0 ? (
          <div className="text-center text-gray-400">Tidak ada designer.</div>
        ) : (
          <div className="flex justify-center gap-8 flex-wrap">
            {designers.map((designer, index) => (
              <Link key={designer.uid} to={`/designer/${designer.uid}`} className="flex flex-col items-center w-56 group cursor-pointer">
                <img
                  src={designer.profilePicture || (designer.ppict?.startsWith('http') ? designer.ppict : `/${designer.ppict}`) || "/noimage.png"}
                  alt={designer.uname}
                  className="w-32 h-32 object-cover rounded-full shadow-md hover:shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl group-hover:ring-2 group-hover:ring-[#af7b43]"
                  onError={e => { 
                    e.target.onerror = null; 
                    e.target.src = "https://res.cloudinary.com/dqpnrqvzi/image/upload/v1686138329/homera/profil/Default.jpg"; 
                  }}
                />
                <p className="mt-3 font-medium text-black group-hover:text-[#af7b43]">{designer.uname}</p>
              </Link>
            ))}
          </div>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-1 items-center text-xs select-none">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="w-6 h-6 rounded bg-gray-200 text-[#8B7357] flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400"
              title="Sebelumnya"
            >
              {'<'}
            </button>
            <button
              onClick={() => setPage(1)}
              className={`w-6 h-6 rounded mx-1 ${page === 1 ? 'bg-[#af7b43] text-white' : 'bg-gray-200 text-[#8B7357]'}`}
              title="Halaman pertama"
            >
              1
            </button>
            <span className="mx-1">...</span>
            <button
              onClick={() => {
                const input = prompt(`Ke halaman berapa? (1-${totalPages})`, page);
                const num = Number(input);
                if (num >= 1 && num <= totalPages) setPage(num);
              }}
              className="w-8 h-6 rounded bg-[#8B7357] text-white font-bold mx-1 underline underline-offset-2 cursor-pointer"
              title="Halaman saat ini (klik untuk input)"
            >
              {page}
            </button>
            <span className="mx-1">...</span>
            <button
              onClick={() => setPage(totalPages)}
              className={`w-6 h-6 rounded mx-1 ${page === totalPages ? 'bg-[#af7b43] text-white' : 'bg-gray-200 text-[#8B7357]'}`}
              title="Halaman terakhir"
            >
              {totalPages}
            </button>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="w-6 h-6 rounded bg-gray-200 text-[#8B7357] flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400"
              title="Berikutnya"
            >
              {'>'}
            </button>
          </div>
        )}
      </section>
    </>
  );
}

export default Designer;
