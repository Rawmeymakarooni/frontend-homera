import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function AboutUs() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      image: "/testi1.png",
      text: "Proses kerja sama dengan desainer lewat Homéra sangat mudah. Dapur impian saya akhirnya terwujud!",
      name: "Livia P., Ibu Rumah Tangga",
    },
    {
      image: "/testi2.png",
      text: "Saya menemukan inspirasi tata letak yang pas untuk apartemen kecil saya lewat Homéra. Sederhana, elegan, dan fungsional!",
      name: "Kevin T., Arsitek",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
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
                ABOUT US
              </motion.h2>
              <motion.p
                className="mt-2 text-1x1"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                Our Story & Vision
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Introduction */}
      <section className="bg-white py-20 px-6 md:px-32 text-[#5A4B38] text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl font-bold mb-6">Get to Know Homéra</h2>
          <p className="mb-4 text-sm">
            Homéra adalah platform yang menghadirkan beragam inspirasi desain
            interior untuk membantu Anda menciptakan hunian yang nyaman, estetis,
            dan fungsional. Kami menyediakan referensi desain untuk berbagai ruang—
            mulai dari ruang tamu, kamar tidur, dapur, hingga area outdoor—yang
            bisa disesuaikan dengan gaya dan kebutuhan Anda.
          </p>
          <p className="text-sm">
            Lebih dari sekadar penyedia inspirasi, Homéra juga menjembatani Anda
            dengan desainer interior profesional. Melalui fitur konsultasi dan
            kolaborasi, Anda bisa mewujudkan rumah impian dengan bantuan ahli yang tepat.
          </p>
        </motion.div>
      </section>

      {/* Section 3: Services */}
      <section className="flex flex-col md:flex-row bg-[#FAF9F6] px-10 md:px-32 py-16 gap-10 items-center">
        <motion.img
          src="/desainer.png"
          alt="About Homera"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        />
        <motion.div
          className="w-full md:w-1/2 text-[#5A4B38]"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h3 className="text-4xl font-bold mb-3">Layanan Terbaik Kami</h3>
          <p className="mb-4">Dari inspirasi menjadi kenyataan</p>
          <div className="grid grid-cols-3 md:grid-cols-2 gap-8">
            {[
              "Inspirasi Desain Interior",
              "Desainer Profesional",
              "Portofolio Eksklusif",
              "Kolaborasi Mudah",
              "Beragam Gaya",
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 text-4x1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
                viewport={{ once: false }}
              >
                <div className="flex items-center justify-center bg-[#5A4B38] text-white rounded-full w-8 h-8">
                  <FaCheckCircle />
                </div>
                <p>{item}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Section 4: Testimoni */}
      <section
        className="relative bg-cover bg-center py-40 min-h-[400px]"
        style={{ backgroundImage: "url('/bgtesti.png')" }}
      >
        <div className="absolute inset-0 bg-black opacity-25"></div> {/* Overlay transparan agar teks lebih terlihat */}
        <div className="relative flex justify-center items-center gap-8">
          <div className="flex flex-col items-center text-center text-white max-w-xl">
            <motion.h2
              className="text-1xl font mb-4 mt-[-145px]"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              Customers Stories
            </motion.h2>

            {/* Profile image */}
            <motion.img
              src={testimonials[currentTestimonial].image}
              alt="Testimonial"
              className="w-24 h-24 rounded-full object-cover border-3 border-[#5A4B38] mb-6 mt-5"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            />

            {/* Testimonial Text */}
            <motion.p
              className="mb-4 px-45 text-lg mt-[5px]"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: false }}
            >
              {testimonials[currentTestimonial].text}
            </motion.p>
            <p className="font-bold">
              — {testimonials[currentTestimonial].name}
            </p>

            {/* Next Testimonial Arrow */}
            <div
              onClick={nextTestimonial}
              className="absolute right-90 top-1/2 transform -translate-y-1/2 cursor-pointer text-white text-2xl"
            >
              <FaArrowRight />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
