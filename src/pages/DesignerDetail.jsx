import { useParams } from 'react-router-dom';

function DesignerDetail() {
  const { id } = useParams(); // Ambil id dari URL
  const designers = [
    {
      id: 1,
      name: "Leonardo Pratama",
      image: "/images/leonardo.jpg",
      description: "Desainer yang berbakat dalam menciptakan karya seni modern.",
    },
    {
      id: 2,
      name: "Nadira Vera",
      image: "/images/nadira.jpg",
      description: "Seorang desainer dengan keahlian dalam desain fashion.",
    },
    {
      id: 3,
      name: "Nathan Wirawan",
      image: "/images/nathan.jpg",
      description: "Desainer interior yang kreatif dengan pendekatan minimalis.",
    },
  ];

  // Cari data desainer yang sesuai dengan id
  const designer = designers.find(d => d.id === parseInt(id));

  if (!designer) {
    return <div>Desainer tidak ditemukan</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{designer.name}</h1>
      <img
        src={designer.image}
        alt={designer.name}
        className="w-48 h-48 object-cover rounded-full shadow-lg mt-4"
      />
      <p className="mt-4">{designer.description}</p>
    </div>
  );
}

export default DesignerDetail;
