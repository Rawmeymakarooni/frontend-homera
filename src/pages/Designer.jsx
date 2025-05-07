import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // ✅ Wajib import ini

function Designer() {
    const designers = [
        {
          id: 1, 
          name: "Leonardo Pratama",
          image: "https://i.pinimg.com/736x/92/5d/c4/925dc42ab4d565440fc168d459c6bc2a.jpg",
        },
        {
          id: 2, 
          name: "Nadira Vera",
          image: "https://i.pinimg.com/736x/52/d7/e4/52d7e40bbc472afeb190030cf16471bb.jpg",
        },
        {
          id: 3,  
          name: "Nathan Wirawan",
          image: "https://i.pinimg.com/736x/4b/9b/e0/4b9be0ae3599b7b70e8c247ffaf56655.jpg",
        },
      ];
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
        <div className="flex justify-center gap-8 flex-wrap">
          {designers.map((designer, index) => (
            <Link to={`/designer/${designer.id}`} key={designer.id}>
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: false }}
              >
                <img
                  src={designer.image}
                  alt={designer.name}
                  className="w-32 h-32 object-cover rounded-full shadow-md hover:shadow-lg transition transform duration-300 hover:scale-105 hover:shadow-xl"
                />
                <p className="mt-3 font-medium text-black">{designer.name}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Designer;
