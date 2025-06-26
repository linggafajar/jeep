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

// Data Paket (boleh di luar komponen)
const packages = [
  {
    title: "Paket Sunrise Sikunir",
    price: "Rp 400.000 / Jeep (4 Lokasi)",
    features: ["Bukit Sikunir", "Kawah Sikidang", "Telaga Warna", "Candi Arjuna"],
    image: "/images/paket1.jpg",
  },
  {
    title: "Paket Explore Dieng",
    price: "Rp 500.000 / Jeep (5 Lokasi)",
    features: ["Dieng Plateau", "Kawah Sileri", "Tuk Bima Lukar", "Batu Pandang", "Dieng Theater"],
    image: "/images/paket2.jpg",
  },
  {
    title: "Paket Custom Trip",
    price: "Harga menyesuaikan rute",
    features: ["Pilih lokasi sesuai keinginan", "Durasi fleksibel", "Guide opsional", "Rute eksklusif"],
    image: "/images/paket3.jpg",
  },
];

export default function JeepDiengLandingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [form, setForm] = useState({
    nama: "",
    wa: "",
    paket: "sunrise",
    catatan: ""
  });

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
    const url = `https://wa.me/6287810104691?text=${encodedPesan}`;
    window.open(url, "_blank");
  };

  return (
    <div className="space-y-16">
      {/* HERO SECTION */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/jeep-dieng-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 text-center px-4"
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Jelajahi Dieng Bersama Jeep
          </h1>
          <p className="text-base md:text-xl mb-6">
            Sewa Jeep untuk pengalaman wisata terbaik di Dataran Tinggi Dieng
          </p>
          <Button size="lg">Pesan Sekarang</Button>
        </motion.div>
      </section>

      {/* PAKET SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Paket Wisata</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((paket, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden rounded-xl shadow-lg h-64 group">
                <Image
                  src={paket.image}
                  alt={paket.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300" />
                <CardContent className="absolute inset-0 z-10 flex flex-col justify-end p-4 text-white">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="font-semibold text-lg mb-1"
                  >
                    {paket.title}
                  </motion.h3>
                  <p className="text-sm mb-2">{paket.price}</p>
                  <ul className="text-sm list-disc list-inside mb-3">
                    {paket.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <Button
                    size="sm"
                    className="w-full bg-white text-black hover:bg-black-200 transition-colors duration-300"
                  >
                    Pesan Sekarang
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FORM BOOKING */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Form Pemesanan</h2>
          <div className="space-y-4">
            <Input
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Nama Lengkap"
            />
            <Input
              name="wa"
              value={form.wa}
              onChange={handleChange}
              placeholder="Nomor WhatsApp"
              type="tel"
            />
            <Select
              name="paket"
              value={form.paket}
              onChange={handleSelectChange}
              options={[
                { value: "sunrise", label: "Paket Sunrise" },
                { value: "dieng3", label: "Tour Dieng 3 Lokasi" },
                { value: "custom", label: "Custom Trip" },
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
            <Button onClick={handleSendWA} className="w-full">
              Kirim Pemesanan via WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-muted-foreground py-6 border-t">
        © {new Date().getFullYear()} Dieng Jeep Adventure. All rights reserved.
      </footer>
    </div>
  );
}
