import { Link } from 'react-router-dom';

function Designer() {
    const designers = [
        {
          id: 1, 
          name: "Leonardo Pratama",
          image: "/images/leonardo.jpg",
        },
        {
          id: 2, 
          name: "Nadira Vera",
          image: "/images/nadira.jpg",
        },
        {
          id: 3,  
          name: "Nathan Wirawan",
          image: "/images/nathan.jpg",
        },
      ];
    
  return (
      <>
            {/* designer SECTION */}
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
                <div className="relative left-[-100px] w-[500px] max-w-full">
                    <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>
                    <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
                    <h2 className="text-4xl font-jost">DESIGNER</h2>
                    <p className="mt-2 text-1x1">Create with Experts-</p>
                    </div>
                </div>
                </div>
            </section>

            <section className="bg-white py-12 px-6">
                <h2 className="text-2xl font-semibold text-center mb-8 text-black">MEET YOUR DESIGNER</h2>
                <div className="flex justify-center gap-8 flex-wrap">
                {designers.map((designer, index) => (
                    <Link to={`/designer/${designer.id}`}>
                        <div key={index} className="flex flex-col items-center">
                            <img
                                src={designer.image}
                                alt={designer.name}
                                className="w-32 h-32 object-cover rounded-full shadow-md hover:shadow-lg transition transform transition duration-300 hover:scale-105 hover:shadow-xl"
                            />
                            <p className="mt-3 font-medium text-black">{designer.name}</p>
                        </div>
                    </Link>
                ))}
                </div>
            </section>
      </>
    );
}

export default Designer;