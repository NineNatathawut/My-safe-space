import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar"; // 🌟 ปรับตรงนี้ให้ถอยออกไปหาโฟลเดอร์ components ด้านนอก

export const metadata: Metadata = {
  title: "บ้านพักใจ My Safe Space",
  description: "พื้นที่ปลอดภัย ไม่ระบุตัวตน ไม่ตัดสิน พร้อมรับฟังคุณเสมอ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className="min-h-full flex flex-col pt-24 antialiased"> {/* 🌟 คงโครงสร้าง flex ของคุณไว้ และเพิ่ม pt-24 เพื่อดันเนื้อหาลงมาจาก Navbar */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}