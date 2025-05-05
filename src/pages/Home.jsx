import { FaCheckCircle } from 'react-icons/fa';

function Home() {
  const rooms = [
    {
      name: "Living",
      image: "/images/living.png",
    },
    {
      name: "Bath",
      image: "/images/bath.png",
    },
    {
      name: "Bed",
      image: "/images/bed.png",
    },
    {
      name: "Kitchen",
      image: "/images/kitchen.png",
    },
  ];
  const designers = [
    {
      name: "Leonardo Pratama",
      image: "/images/leonardo.jpg",
    },
    {
      name: "Nadira Vera",
      image: "/images/nadira.jpg",
    },
    {
      name: "Nathan Wirawan",
      image: "/images/nathan.jpg",
    },
  ];
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
                className="w-32 h-32 object-cover rounded-full shadow-md hover:shadow-lg transition transform transition duration-300 hover:scale-105 hover:shadow-xl"
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
