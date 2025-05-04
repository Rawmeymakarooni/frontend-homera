function Hero() {
  return (
    <section className="relative flex h-[90vh] overflow-hidden font-serif">
      {/* Left image */}
      <div
        className="w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/ff/cf/3f/ffcf3f2aafaa21c33652ac3bc9186501.jpg')",
        }}
      ></div>

      {/* Right content */}
      <div className="w-1/2 bg-[#8B7357] flex flex-col justify-center px-7 text-white relative z-10">
        {/* H1 split with part over image */}
        <div className="flex items-center text-9xl font-serif mb-8">
          {/* "HOM" on left, over image */}
          <span
            className="text-[#36271C] absolute left-0 ml-[-270px] z-20"
            style={{ backgroundColor: "transparent" }}
          >
            HOM
          </span>

          {/* "ÉRA" on right, in brown background */}
          <span className="ml-[18px] text-white">ÉRA</span>
        </div>

        {/* Blog container - with white shadow behind */}
        <div className="relative left-[-100px] w-[500px] max-w-full">
          {/* White shadow layer */}
          <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#C4B29A] rounded-sm z-0"></div>

          {/* Brown box content */}
          <div className="relative z-10 bg-[#5A4B38] p-5 rounded-sm flex flex-col items-center text-center">
            <h2 className="text-4xl font-jost">BLOGS</h2>
            <p className="mt-2 text-1x1">
            We Create Elegant, Simple, and Luxury Interior Design
            </p>
          </div>
        </div>
      </div> {/* ← penutup div untuk right content (INI YANG KURANG TADI) */}
    </section>
  );
}

export default Hero;
