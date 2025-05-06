import { FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

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
            backgroundImage:
              "url('https://i.pinimg.com/736x/ff/cf/3f/ffcf3f2aafaa21c33652ac3bc9186501.jpg')",
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

          {/* Blog Box */}
          <div className="relative left-[-100px] w-[500px] max-w-full">
            <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>
            <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
              <h2 className="text-4xl font-jost">ABOUT US</h2>
              <p className="mt-2 text-1x1">Our Story & Vision</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Introduction */}
<section className="bg-white py-20 px-6 md:px-32 text-[#5A4B38] text-center">
  <div className="max-w-3xl mx-auto">
    <h2 className="text-3xl font-bold mb-6">
     Get to Know Homéra
    </h2>
    <p className="mb-4 text-sm">
      Homéra adalah platform yang menghadirkan beragam inspirasi desain
      interior untuk membantu Anda menciptakan hunian yang nyaman,
      estetis, dan fungsional. Kami menyediakan referensi desain untuk
      berbagai ruang—mulai dari ruang tamu, kamar tidur, dapur, hingga area
      outdoor—yang bisa disesuaikan dengan gaya dan kebutuhan Anda.
    </p>
    <p className="text-sm">
      Lebih dari sekadar penyedia inspirasi, Homéra juga menjembatani Anda
      dengan desainer interior profesional. Melalui fitur konsultasi dan
      kolaborasi, Anda bisa mewujudkan rumah impian dengan bantuan ahli
      yang tepat.
    </p>
  </div>
</section>

      {/* Section 3: Services */}
      <section className="flex flex-col md:flex-row bg-[#FAF9F6] px-10 md:px-32 py-16 gap-10 items-center">
        <img
          src="/desainer.png"
          alt="About Homera"
          className="w-full md:w-1/2 rounded-lg shadow-lg"
        />
        <div className="w-full md:w-1/2 text-[#5A4B38]">
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
              <div key={index} className="flex items-center gap-3 text-4x1">
                <div className="flex items-center justify-center bg-[#5A4B38] text-white rounded-full w-8 h-8">
                  <FaCheckCircle />
                </div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Testimoni */}
<section
  className="relative bg-cover bg-center py-40 min-h-[400px]"
  style={{ backgroundImage: "url('/bgtesti.png')" }}
>
  <div className="absolute inset-0 bg-black opacity-25"></div> {/* Overlay transparan agar teks lebih terlihat */}
  <div className="relative flex justify-center items-center gap-8">
    <div className="flex flex-col items-center text-center text-white max-w-xl">
      {/* Title: Customers Stories */}
      <h2 className="text-1xl font mb-4 mt-[-145px]">Customers Stories</h2>

      {/* Profile image */}
      <img
        src={testimonials[currentTestimonial].image}
        alt="Testimonial"
        className="w-24 h-24 rounded-full object-cover border-3 border-[#5A4B38] mb-6 mt-5"
      />
      
      {/* Testimonial Text */}
      <p className="mb-4 px-45 text-lg  mt-[5px]">{testimonials[currentTestimonial].text}</p>
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
