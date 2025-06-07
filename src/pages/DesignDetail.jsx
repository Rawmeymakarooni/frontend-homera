import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function DesignDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/portofolio/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Gagal mengambil detail portofolio");
        return res.json();
      })
      .then(res => {
        // Fallback: jika backend tidak mengirim userId, gunakan uid
        if (res.data && !res.data.userId && res.data.uid) {
          res.data.userId = res.data.uid;
        } else if (res && !res.userId && res.uid) {
          res.userId = res.uid;
        }
        setData(res.data || res);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!data) return <div className="p-10">Desain tidak ditemukan.</div>;

  return (
    <div className="bg-white text-[#36271C]">
      <div className="pt-17"></div>
      {/* Title */}
      <section className="text-center pb-4">
        <h1 className="text-2xl font font-bold">{data.title}</h1>
      </section>
      {/* Image with designer & logo */}
      <section className="relative w-full">
        <img 
          src={data.cover?.startsWith('http') ? data.cover : `/${data.cover}` || "/noimage.png"} 
          alt={data.title} 
          className="w-full object-cover h-[400px]" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/noimage.png";
          }}
        />
        {/* Designer name */}
        {data.uname && data.userId && (
          <Link
            to={`/designer/${data.userId}`}
            className="absolute bottom-3 right-5 bg-[#5A4B38]/50 text-white px-4 py-2 rounded-sm text-sm hover:bg-[#36271C] transition"
          >
            by {data.uname}
          </Link>
        )}
        {data.uname && !data.userId && (
          <div className="absolute bottom-3 right-5">
            <span className="bg-[#5A4B38]/50 text-white px-4 py-2 rounded-sm text-sm">by {data.uname}</span>
          </div>
        )}
        {/* Logo in top-right */}
        <img
          src="/logo.png"
          alt="Logo"
          className="absolute top-4 right-4 w-15 h-15 object-contain"
        />
      </section>
      {/* Color Palette */}
      <section className="flex justify-center gap-10 py-8">
        {(data.palette && data.palette.length > 0 ? data.palette : ["#D9D4CF", "#5A4B38", "#1F1F1F"]).map((color, idx) => (
          <div
            key={idx}
            className="w-15 h-15 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </section>
      {/* Concept / Description */}
      <section className="flex justify-center px-4 pb-12">
        <div className="bg-[#C4B29A]/[0.33] rounded-xl p-6 max-w-3xl text-center">
          <h2 className="text-xl font-bold mb-2">CONCEPT</h2>
          <p className="text-lg leading-relaxed">{data.description}</p>
        </div>
      </section>
      {/* Furniture */}
      <section className="px-4 pb-10">
        <h2 className="text-2xl font-semibold text-center mb-6">FURNITURE</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {data.furnitur && data.furnitur.length > 0 ? data.furnitur.map((item, idx) => (
            <div key={idx} className="max-w-[300px] w-full">
              <img
                src={item.image || "/noimage.png"}
                alt={item.name}
                className="w-full h-auto object-contain"
              />
              <div className="text-center mt-2 font-medium">{item.name}</div>
              {item.description && <div className="text-center text-sm text-gray-500">{item.description}</div>}
              {typeof item.quantity !== "undefined" && item.quantity !== null && (
                <div className="text-center text-xs text-gray-400">Jumlah: {item.quantity}</div>
              )}
            </div>
          )) : <div className="col-span-3 text-center text-gray-400">Tidak ada data furnitur.</div>}
        </div>
      </section>
      {/* Call to Action */}
      <section className="text-center py-12">
        <p className="text-lg font-medium mb-6">Tertarik dengan desain ini?</p>
        <div className="flex justify-center gap-6 flex-wrap">
          {/* Link ke profil designer jika ada uid */}
          {data.userId && (
            <Link
              to={`/designer/${data.userId}`}
              className="border border-[#5A4B38] text-[#5A4B38] hover:bg-[#5A4B38] hover:text-white px-6 py-2 rounded-full transition text-sm"
            >
              Lihat Profil
            </Link>
          )}
          <a
            href="https://wa.me/6285779267240"
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
