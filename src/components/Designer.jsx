function Designer() {
    
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
                <div className="w-1/2 h-full bg-[#8B7357] flex flex-col justify-center items-start px-12 text-white">
                    <h1 className="text-6xl font-serif mb-8">HOMÉRA</h1>
                    <div className="bg-[#5A4B38] px-35 py-5">
                        <h2 className="text-2xl font-semibold text-left">DESIGNER</h2>
                        <p className="mt-2 text-sm text-left">
                        Create with Experts-                
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Designer;