import { Link, useParams } from "react-router-dom";

const designData = {
  1: {
    title: "Soft Earth Harmony",
    designer: {
      name: "Leonardo Pratama",
      id: 1,
    },
    mainImage: "/portodesain1.png",
    palette: ["#D9D4CF", "#5A4B38", "#1F1F1F"],
    concept: `Soft Earth Harmony mengusung nuansa natural yang tenang dengan kombinasi warna abu muda, coklat kopi, dan aksen hitam. Desain ini menciptakan suasana ruang tamu yang hangat dan seimbang, memadukan kesan modern dengan kenyamanan khas warna-warna bumi.`,
    furnitures: [
      { name: "One line hanging wire lamp", image: "/furniture1.png" },
      { name: "Cotton and linen sofa", image: "/furniture2.png" },
      { name: "Fisheman's floor lamp", image: "/furniture3.png" },
      { name: "Geometric hanging paintings", image: "/furniture4.png" },
      { name: "Crab single chair", image: "/furniture5.png" },
      { name: "Coffe table", image: "/furniture6.png" },
    ],
  },
};

function DesignDetail() {
  const { id } = useParams();
  const design = designData[id];

  if (!design) return <div className="p-10">Desain tidak ditemukan.</div>;

  return (
    <div className="bg-white text-[#36271C]">
      {/* Jarak Atas */}
      <div className="pt-17"></div>

      {/* Title */}
      <section className="text-center pb-4">
        <h1 className="text-2xl font font-bold">{design.title}</h1>
      </section>

      {/* Image with designer & logo */}
      <section className="relative w-full">
        <img src={design.mainImage} alt={design.title} className="w-full object-cover" />

        {/* Designer name */}
        <Link
          to={`/designer/${design.designer.id}`}
          className="absolute bottom-3 right-5 bg-[#5A4B38]/50 text-white px-4 py-2 rounded-sm text-sm hover:bg-[#36271C] transition"
        >
          {design.designer.name}
        </Link>

        {/* Logo in top-right */}
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-4 right-4 w-15 h-15 object-contain"
        />
      </section>

      {/* Color Palette */}
      <section className="flex justify-center gap-10 py-8">
        {design.palette.map((color, idx) => (
          <div
            key={idx}
            className="w-15 h-15 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </section>

      {/* Concept */}
      <section className="flex justify-center px-4 pb-12">
        <div className="bg-[#C4B29A]/[0.33] rounded-xl p-6 max-w-3xl text-center">
          <h2 className="text-xl font-bold mb-2">CONCEPT LIVING ROOM</h2>
          <p className="text-lg leading-relaxed">{design.concept}</p>
        </div>
      </section>

      {/* Furniture */}
      <section className="px-4 pb-10">
        <h2 className="text-2xl font-semibold text-center mb-6">FURNITURE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {design.furnitures.map((item, idx) => (
            <div key={idx} className="max-w-[300px] w-full">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-auto object-contain"
              />
              <p className="text-center mt-2 font-medium">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center py-12">
        <p className="text-lg font-medium mb-6">Tertarik dengan desain ini?</p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to={`/designer/${design.designer.id}`}
            className="border border-[#5A4B38] text-[#5A4B38] hover:bg-[#5A4B38] hover:text-white px-6 py-2 rounded-full transition text-sm"
          >
            Lihat Profil
          </Link>
          <a
            href="https://wa.me/6285779267240" // wa desainer
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#5A4B38] text-[#5A4B38] hover:bg-[#5A4B38] hover:text-white px-6 py-2 rounded-full transition text-sm"
          >
            Konsultasi
          </a>
        </div>
      </section>
    </div>
  );
}

export default DesignDetail;
