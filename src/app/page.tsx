'use client';

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Select from "@/components/ui/select";
import Calendar from "@/components/ui/calendar";
import CardContent from "@/components/ui/cardcontent";

const packages = [
  {
    title: "Paket Zona 1",
    price: "Rp 600.000 / Jeep (5 Lokasi)",
    features: ["Telaga Warna", "Candi Arjuna", "Kawah Sikidang", "Dieng Park", "Tuk Bima Lukar"],
    image: "/images/paket2.jpg",
    gallery: [
      "/images/zona1-1.jpg",
      "/images/zona1-2.jpg",
      "/images/zona1-3.jpg"
    ]
  },
  {
    title: "Paket Zona 2",
    price: "Rp 750.000 / Jeep (5 Lokasi)",
    features: ["Telaga Dringo", "Kawah Candradimuka", "Sumur Jalatunda", "Telaga Merdada", "D'Qiano Water Park"],
    image: "/images/paket1.jpg",
    gallery: [
      "/images/zona2-1.jpg",
      "/images/zona2-2.jpg",
      "/images/zona2-3.jpg"
    ]
  },
  {
    title: "Paket Zona 3",
    price: "Rp 900.000 / Jeep (5 Lokasi)",
    features: ["Curug Sikarim", "Telaga Menjer", "Pintu Langit", "Kebun Teh Panama", "Swiss Van Java"],
    image: "/images/paket3.jpg",
    gallery: [
      "/images/zona3-1.jpg",
      "/images/zona3-2.jpg",
      "/images/zona3-3.jpg"
    ]
  },
];

export default function JeepDiengLandingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [form, setForm] = useState({
    nama: "",
    wa: "",
    paket: "sunrise",
    catatan: "",
  });
  const [openGalleryIndex, setOpenGalleryIndex] = useState<number | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, paket: e.target.value });
  };

  const handleSendWA = () => {
    const pesan = `Halo, saya ingin memesan jeep:\nNama: ${form.nama}\nNo. WA: ${form.wa}\nPaket: ${form.paket}\nTanggal: ${date?.toLocaleDateString('id-ID')}\nCatatan: ${form.catatan || '-'}`;
    const encodedPesan = encodeURIComponent(pesan);
    const url = `https://wa.me/6281717464320?text=${encodedPesan}`;
    window.open(url, "_blank");
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-50 space-y-20">
      <section
        className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/jeep.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-accent drop-shadow-xl">
            Jelajahi Dieng Bersama Jeep
          </h1>
          <p className="text-lg md:text-2xl mb-6 text-white/90 font-medium">
            Sewa Jeep untuk pengalaman wisata terbaik di Dataran Tinggi Dieng
          </p>
          <Button
            size="lg"
            className="bg-accent text-black hover:bg-yellow-400"
            onClick={() => {
              const section = document.getElementById("form-pemesanan");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Pesan Sekarang
          </Button>

        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-primary">
          Paket Wisata
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((paket, i) => (
            <div key={i} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="relative overflow-hidden rounded-2xl shadow-xl h-[26rem] group border border-gray-100 bg-white cursor-pointer">
                  <Image
                    src={paket.image}
                    alt={paket.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                  <CardContent className="absolute inset-0 z-10 flex flex-col justify-end p-5 text-white">
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                      className="font-bold text-xl mb-1 text-accent"
                    >
                      {paket.title}
                    </motion.h3>
                    <p className="text-sm mb-2 font-medium">{paket.price}</p>
                    <ul className="text-sm list-disc list-inside mb-3">
                      {paket.features.map((f, idx) => (
                        <li key={idx}>{f}</li>
                      ))}
                    </ul>
                    <Button
                      size="sm"
                      className="w-full bg-accent text-black hover:bg-yellow-500"
                      onClick={() => setOpenGalleryIndex(openGalleryIndex === i ? null : i)}
                    >
                      {openGalleryIndex === i ? "Tutup Galeri" : "Lihat Galeri"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {openGalleryIndex === i && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {paket.gallery.map((src, j) => (
                    <div key={j} className="overflow-hidden rounded-lg shadow group">
                      <Image
                        src={src}
                        alt={`Gallery ${paket.title} ${j}`}
                        width={400}
                        height={300}
                        className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="form-pemesanan" className="bg-white py-14 px-4">
        <div className="max-w-3xl mx-auto bg-gray-50 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary">
            Form Pemesanan
          </h2>
          <div className="space-y-4">
            <Input name="nama" value={form.nama} onChange={handleChange} placeholder="Nama Lengkap" />
            <Input name="wa" value={form.wa} onChange={handleChange} placeholder="Nomor WhatsApp" type="tel" />
            <Select
              name="paket"
              value={form.paket}
              onChange={handleSelectChange}
              options={[
                { value: "Zona 1", label: "Zona 1" },
                { value: "Zona 2", label: "Zona 2" },
                { value: "Zona 3", label: "Zona 3" },
              ]}
            />
            <Calendar
              value={date?.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="rounded-md border"
            />
            <Textarea
              name="catatan"
              value={form.catatan}
              onChange={handleChange}
              placeholder="Catatan atau permintaan khusus (opsional)"
            />
            <Button onClick={handleSendWA} className="w-full bg-primary text-white hover:bg-green-800">
              Kirim Pemesanan via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-600 py-6 border-t bg-gray-100">
        © {new Date().getFullYear()} <span className="font-semibold">Dieng Jeep Adventure</span>. All rights reserved.
      </footer>
    </div>
  );
}
