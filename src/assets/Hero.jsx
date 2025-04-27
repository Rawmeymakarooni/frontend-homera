function Hero() {
    return (
      <section className="flex h-[90vh]">
        {/* Left image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('/your-image-path.jpg')" }}>
        </div>
  
        {/* Right content */}
        <div className="w-1/2 bg-[#8C6D5A] flex flex-col justify-center items-start px-12 text-white relative">
          <h1 className="text-6xl font-serif mb-8">HOMÉRA</h1>
          <div className="bg-[#5A3B2B] p-6">
            <h2 className="text-2xl font-semibold">BLOGS</h2>
            <p className="mt-2 text-sm">We Create Elegant, Simple and Luxury Interior Design</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default Hero;
  