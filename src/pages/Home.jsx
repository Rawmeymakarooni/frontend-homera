import { FaCheckCircle } from 'react-icons/fa';

function Home() {
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
          <div className="flex text-8xl font-serif mb-8 relative leading-tight">
            {/* Kiri (BEST / YOUR) */}
            <div className="absolute left-0 ml-[-270px] z-20 text-[#36271C] bg-transparent">
              <div>BEST</div>
              <div>YOUR</div>
            </div>

            {/* Kanan (INTERIOR / HOME) */}
            <div className="ml-[18px] text-white">
              <div>INTERIOR</div>
              <div>HOME</div>
              <p className="text-lg mt-4 text-white">Find the best interior design inspiration and connect directly
              with profesional designers. Homera is the place for creative ideas and
              collaboration in interior design.
              </p>
            </div>
          </div>


        </div>
      </section>
    </>
  );
}

export default Home;
