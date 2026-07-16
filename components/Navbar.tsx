"use client"; // 🌟 แก้จาก "use main" เป็น "use client" ให้ถูกต้องครับ

import Link from "next/link";
import { Heart, Phone, Home, MessageSquare, BookOpen } from "lucide-react";

export default function Navbar() {
  return (
    <header className="w-full fixed top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      {/* แถบสายด่วนฉุกเฉินด้านบนสุดตามดีไซน์ PDF */}
      <div className="w-full bg-primary text-primary-foreground py-2 px-4 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2">
        <Phone className="w-4 h-4 animate-pulse" />
        <span>ต้องการความช่วยเหลือเร่งด่วน? โทรหาผู้เชี่ยวชาญได้เลย - ฟรี ตลอด 24 ชั่วโมง</span>
        <span className="font-bold underline ml-1">สายด่วน 1323</span>
      </div>

      {/* เมนูนำทางหลัก */}
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-primary">
          <Heart className="w-5 h-5 fill-current" />
          <span>บ้านพักใจ</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> หน้าแรก
          </Link>
          <Link href="/vent" className="hover:text-primary transition-colors flex items-center gap-1">
            <MessageSquare className="w-4 h-4" /> ระบายความรู้สึก
          </Link>
          <Link href="/resources" className="hover:text-primary transition-colors flex items-center gap-1">
            <BookOpen className="w-4 h-4" /> ทรัพยากรสุขภาพจิต
          </Link>
        </nav>

        <Link 
          href="/vent" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs sm:text-sm px-4 py-2 rounded-full font-medium shadow-sm transition-all hover:scale-105"
        >
          เริ่มระบายเลย
        </Link>
      </div>
    </header>
  );
}