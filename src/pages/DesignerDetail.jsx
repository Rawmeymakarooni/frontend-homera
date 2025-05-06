import { useParams } from 'react-router-dom';

function DesignerDetail() {
  const { id } = useParams(); // Ambil id dari URL
  const designers = [
    {
      id: 1,
      name: "Leonardo Pratama",
      image: "https://i.pinimg.com/736x/92/5d/c4/925dc42ab4d565440fc168d459c6bc2a.jpg",
      description: "Interior Designer | Modern & Minimalist Specialist",
      address: "Semarang, Indonesia",
      email: "leonardo.pratama@gmail.com",
      whatsapp: "+62 814-6362-2736",
      instagram: "@leonardp",
    },
    {
      id: 2,
      name: "Nadira Vera",
      image: "https://i.pinimg.com/736x/52/d7/e4/52d7e40bbc472afeb190030cf16471bb.jpg",
      description: "Interior Design Enthusiast",
      address: "Jakarta, Indonesia",
      email: "nadiravera@gmail.com",
      whatsapp: "+62 814-6772-0737",
      instagram: "@nad.vera",
    },
    {
      id: 3,
      name: "Nathan Wirawan",
      image: "https://i.pinimg.com/736x/4b/9b/e0/4b9be0ae3599b7b70e8c247ffaf56655.jpg",
      description: "Desainer interior yang kreatif dengan pendekatan minimalis.",
      address: "Bali, Indonesia",
      email: "nathanwira@gmail.com",
      whatsapp: "+62 880-9372-0737",
      instagram: "@nathan_wira",
    },
  ];

  // Cari data desainer yang sesuai dengan id
  const designer = designers.find(d => d.id === parseInt(id));

  if (!designer) {
    return <div>Desainer tidak ditemukan</div>;
  }

  return (
    <>
      <section className="p-6 pt-[60px] bg-[#8B7357] text-white min-h-[60vh] flex px-12 items-center justify-between">
        <div>
          <p className="text-2xl mb-5">Hello, I'm</p>
          <h1 className="text-5xl font-serif font-bold mb-5 text">{designer.name}</h1>
          <p className="text-5md font-serif">{designer.description}</p>
          <div className="mt-4 text-sm">
            <p>{designer.address}</p>
            <p>{designer.email}</p>
            <p>{designer.whatsapp}</p>
            <p>{designer.instagram}</p>
          </div>
        </div>
        <div  className="w-68 h-58 object-cover">
          <img src={designer.image} alt={designer.name} className="w-60 h-60 object-cover rounded-xl" />
        </div>
      </section>

      <section className="py-16 px-12 text-center bg-white">
        <h2 className="text-4xl font-serif text-[#4e3b26] mb-8">About me</h2>
          <div>
          <img src={designer.image} alt={designer.name} className="w-60 h-60 object-cover rounded-xl" />
          </div>
      </section>

      <section className="py-12 px-12 text-center bg-white">
      <h2 className="text-4xl font-serif text-[#4e3b26] mb-8">Portofolio</h2>
      <div className="flex flex-col items-center">
        <img src="" alt="Terrace" className="w-40 h-40 object-cover border" />
        <p className="mt-2 text-sm">Teracce</p>
      </div>
      </section>

      <section className="py-16 px-12 text-center bg-white">
        <h2 className="text-4xl font-serif text-[#4e3b26] mb-8">Testimonial</h2>
        <div className="w-[80%] mx-auto h-32 bg-gray-300 rounded-2xl" />
      </section>
    </>
  );
}

export default DesignerDetail;
