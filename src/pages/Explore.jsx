import { FaCheckCircle } from 'react-icons/fa';

function Explore() {
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
              <h2 className="text-4xl font-jost">EXPLORE</h2>
              <p className="mt-2 text-1x1">Your Design Journey Starts Here</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Explore;
