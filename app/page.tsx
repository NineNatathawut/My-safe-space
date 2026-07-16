"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Wind, Brain, Phone, Shield, 
  Smile, ArrowRight, Lock, EyeOff, Sparkles, 
  ShieldCheck, Menu, X, ChevronRight
} from "lucide-react";

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ข้อมูลเหตุผล "ทำไมต้องบ้านพักใจ?" (จากไฟล์ PDF)
  const whyUs = [
    {
      title: "ออนไลน์ตลอด 24 ชม.",
      desc: "เราออกแบบมาเพื่อให้คุณรู้สึกปลอดภัย อบอุ่น และได้รับการสนับสนุน ทุกคำที่คุณพิมพ์มีค่า",
      icon: Smile,
      color: "bg-amber-500/10 text-amber-600 border-amber-100/50"
    },
    {
      title: "ไม่ระบุตัวตน 100%",
      desc: "ไม่ต้องสมัครสมาชิก ไม่มีชื่อ ไม่มีเบอร์โทร พิมพ์ระบายได้เลยทันทีโดยไม่มีใครรู้",
      icon: EyeOff,
      color: "bg-purple-500/10 text-purple-600 border-purple-100/50"
    },
    {
      title: "ไม่ตัดสิน ไม่วิจารณ์",
      desc: "ทุกความรู้สึกมีสิทธิ์อยู่ที่นี่ โกรธ เศร้า กลัว หรือแม้แต่ไม่รู้สึกอะไร - ก็ระบายได้",
      icon: Heart,
      color: "bg-rose-500/10 text-rose-600 border-rose-100/50"
    }
  ];

  // ข้อมูลหมวดหมู่ทรัพยากร (จากไฟล์ PDF)
  const resourceCategories = [
    {
      title: "เบอร์โทรฉุกเฉินพร้อมใช้",
      desc: "สายด่วนสุขภาพจิต 1323 และหน่วยงานสนับสนุนอื่น ๆ - เข้าถึงได้ทุกหน้าเมื่อใจอ่อนล้า",
      icon: Phone,
      bgColor: "bg-emerald-500/5 text-emerald-600 border-emerald-100/30"
    },
    {
      title: "เทคนิคจัดการความเครียด",
      desc: "การหายใจ mindfulness บอดี้แสกน และกิจกรรมง่าย ๆ ที่ช่วยให้ใจสงบลงได้จริง",
      icon: Wind,
      bgColor: "bg-sky-500/5 text-sky-600 border-sky-100/30"
    },
    {
      title: "บรรยากาศอบอุ่น ปลอดภัย",
      desc: "ออกแบบมาเพื่อให้คุณรู้สึกเหมือนได้นั่งคุยกับเพื่อนที่ไว้ใจได้ในบ้านหลังเล็กที่อบอุ่น",
      icon: Shield,
      bgColor: "bg-indigo-500/5 text-indigo-600 border-indigo-100/30"
    }
  ];

  // รายการสายด่วนความช่วยเหลือทั้งหมดจากพิมพ์เขียว
  const emergencyHelplines = [
    { name: "1323", label: "สายด่วนสุขภาพจิต", sub: "กรมสุขภาพจิต กระทรวงสาธารณสุข", note: "ตลอด 24 ชม. ฟรี" },
    { name: "1385", label: "ป้องกันการฆ่าตัวตาย", sub: "กรมสุขภาพจิต", note: "ตลอด 24 ชม. ฟรี" },
    { name: "02-713-6793", label: "โรงพยาบาลราชานุกูล", sub: "ปรึกษาจิตเวช จ-ศ 08:00-16:00", note: "เวลาราชการ" },
    { name: "1669", label: "ฉุกเฉินการแพทย์", sub: "กรณีฉุกเฉินที่เป็นอันตรายต่อชีวิต", note: "ตลอด 24 ชม. ฟรี" },
    { name: "1300", label: "ศูนย์ช่วยเหลือสังคม", sub: "กระทรวงการพัฒนาสังคมฯ", note: "ตลอด 24 ชม. ฟรี" },
    { name: "1422", label: "สายด่วนสาธารณสุข", sub: "กระทรวงสาธารณสุข", note: "ตลอด 24 ชม. ฟรี" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      
      {/* 🚨 1. Top Urgent Bar (แถบด่วนบนสุดของหน้าเว็บจากไฟล์ PDF) */}
      <div className="bg-rose-500/5 border-b border-rose-100/60 py-2.5 px-4 text-center text-xs font-semibold text-rose-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
        <span>🚨 ต้องการความช่วยเหลือเร่งด่วน? โทรหาผู้เชี่ยวชาญได้เลย - ฟรี ตลอด 24 ชั่วโมง</span>
        <div className="flex gap-2 font-bold text-[10px] sm:text-xs">
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1323 สุขภาพจิต</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1669 ฉุกเฉิน</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1385 ป้องกันชีวิต</span>
        </div>
      </div>

      {/* 🏡 2. Sticky Navigation Bar (เมนูบาร์ลูกผสมดีไซน์น่ารัก + หัวข้อจากไฟล์หลัก) */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-border/60 transition-all">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* โลโก้แบรนด์ */}
          <a href="/" className="text-base font-black tracking-tight flex items-center gap-1.5 hover:opacity-85 transition-opacity">
            <span className="text-lg">🏡</span>
            <span className="text-foreground">บ้านพักใจ</span>
          </a>

          {/* เมนูสำหรับหน้าจอ Desktop (ครบตามข้อกำหนดในไฟล์ PDF) */}
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-bold text-muted-foreground">
            <a href="/" className="text-primary px-3 py-2 rounded-xl bg-primary/5 transition-colors">หน้าแรก</a>
            <a href="/vent" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">ระบายความรู้สึก</a>
            <a href="/resources" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">ทรัพยากร</a>
            <a href="/quiz" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all flex items-center gap-1">
              แบบประเมิน <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-md font-normal">ใหม่</span>
            </a>
            <a href="#helpline" className="ml-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-xs hover:bg-primary/90 hover:scale-102 transition-all text-xs font-black">
              ติดต่อขอความช่วยเหลือ
            </a>
          </nav>

          {/* ปุ่มเปิดเมนูบน Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* เมนู Dropdown แบบสไลด์ลงมาสำหรับ Mobile */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-b border-border text-sm font-bold shadow-inner"
            >
              <div className="px-4 py-4 space-y-2 flex flex-col">
                <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-primary bg-primary/5 p-3 rounded-xl flex items-center justify-between">หน้าแรก <ChevronRight className="w-4 h-4" /></a>
                <a href="/vent" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground hover:text-foreground">ระบายความรู้สึก <ChevronRight className="w-4 h-4" /></a>
                <a href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground hover:text-foreground">ทรัพยากร <ChevronRight className="w-4 h-4" /></a>
                <a href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground hover:text-foreground">แบบประเมินความเครียด <ChevronRight className="w-4 h-4" /></a>
                <a href="#helpline" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-primary-foreground text-center py-3 rounded-xl shadow-xs block mt-2 font-black">
                  ติดต่อขอความช่วยเหลือ 📞
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🧩 3. ส่วนเนื้อหาหลัก (Main Content) */}
      <main className="flex-1 space-y-24 py-12 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 space-y-24">
          
          {/* Hero Section */}
          <section className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3 space-y-6 text-left">
              <div className="inline-flex items-center gap-1.5 bg-accent text-primary px-4 py-1.5 rounded-full text-xs font-bold border border-primary/10 shadow-xs">
                <Lock className="w-3.5 h-3.5" /> พื้นที่ปลอดภัย ไม่ระบุตัวตน
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-tight">
                ที่นี่คือ <br />
                <span className="text-primary text-5xl sm:text-6xl relative inline-block">
                  บ้านพักใจ
                  <span className="absolute -bottom-1 left-0 w-full h-2 bg-primary/10 rounded-full -z-10"></span>
                </span> <br />
                ของคุณ
              </h1>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg">
                ระบายความรู้สึก แบ่งปันความเจ็บปวด หรือแค่อยากพิมพ์บอกใครสักคน - เราพร้อมรับฟังทุกคำ โดยไม่ตัดสิน ไม่มีการระบุตัวตน
              </p>

              <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold">
                <a href="/vent" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 flex items-center gap-1">
                  ระบายความรู้สึก <ArrowRight className="w-4 h-4" />
                </a>
                <a href="/resources" className="bg-secondary hover:bg-secondary/80 text-secondary-foreground px-6 py-3.5 rounded-full transition-all">
                  ค้นหาทรัพยากร
                </a>
              </div>

              <p className="text-xs text-muted-foreground/80 font-medium flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-current" /> ไม่มีการบันทึกชื่อ - ไม่มีการล็อกอิน ปลอดภัย 100%
              </p>
            </div>

            {/* ฝั่งขวา: วงกลม Visual น่ารัก */}
            <div className="md:col-span-2 flex justify-center">
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="w-full max-w-[290px] aspect-square rounded-3xl bg-linear-to-tr from-primary/10 via-accent to-background flex flex-col items-center justify-center p-8 border border-primary/20 shadow-md relative group"
              >
                <div className="absolute -top-4 -right-2 bg-card p-3 rounded-2xl border border-border shadow-md rotate-12 transition-transform group-hover:rotate-0">
                  <Heart className="w-7 h-7 text-rose-400 fill-current animate-pulse" />
                </div>
                <p className="text-xs font-black text-primary tracking-widest uppercase mb-1.5">พื้นที่ปลอดภัย</p>
                <p className="text-xs text-muted-foreground font-medium text-center px-4 leading-relaxed">ไม่ตัดสิน ไม่วิจารณ์ ไม่ระบุตัวตนของคุณ</p>
                <a href="/vent" className="mt-6 text-xs font-bold bg-background hover:bg-primary hover:text-primary-foreground border border-border text-foreground px-5 py-2.5 rounded-full shadow-xs transition-all">
                  เริ่มระบายเลย ✨
                </a>
              </motion.div>
            </div>
          </section>

          {/* ทำไมต้องบ้านพักใจ? */}
          <section className="space-y-10 text-center">
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl font-black text-foreground">ทำไมต้องบ้านพักใจ?</h2>
              <p className="text-xs sm:text-sm font-bold text-primary uppercase tracking-wider">พื้นที่ที่คุณระบายได้อย่างอิสระ</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                เราออกแบบมาเพื่อให้คุณรู้สึกปลอดภัย อบอุ่น และได้รับการสนับสนุน ทุกคำที่คุณพิมพ์มีค่า
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {whyUs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -6 }}
                    className="bg-card p-6 rounded-3xl border border-border text-left space-y-4 shadow-2xs hover:shadow-md transition-all duration-300"
                  >
                    <div className={`p-3.5 rounded-2xl w-fit border ${item.color}`}><Icon className="w-5 h-5" /></div>
                    <h3 className="font-bold text-base text-foreground">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ทรัพยากรสุขภาพจิต */}
          <section className="space-y-10">
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <h2 className="text-2xl font-black text-foreground">ทรัพยากรสุขภาพจิต</h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                บทความ เทคนิคจัดการความเครียด และลิงก์หน่วยงานผู้เชี่ยวชาญ พร้อมให้คุณทุกเมื่อ
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {resourceCategories.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-card p-6 rounded-3xl border border-border flex items-start gap-4 shadow-2xs bg-linear-to-b from-card to-accent/20">
                    <div className="p-3 bg-background text-primary rounded-2xl border border-border/40 shrink-0 shadow-2xs"><Icon className="w-5 h-5" /></div>
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-sm text-foreground">{item.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ขอความช่วยเหลือ / แผงสายด่วน (ผูกไอดีสำหรับ Jump link จากปุ่มบนเมนูบาร์) */}
          <section id="helpline" className="scroll-mt-20 space-y-10 bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-xs relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -z-10"></div>
            
            <div className="space-y-2 max-w-xl">
              <h2 className="text-2xl font-black text-foreground">ขอความช่วยเหลือ</h2>
              <p className="text-sm font-bold text-primary uppercase tracking-wider">สายด่วนสุขภาพจิต</p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                หากคุณรู้สึกไม่ปลอดภัย หรือต้องการพูดคุยกับผู้เชี่ยวชาญ โทรได้เลยทันที ฟรี ไม่มีค่าใช้จ่าย
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {emergencyHelplines.map((phone, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ scale: 1.02 }}
                  className="bg-background p-4 rounded-2xl border border-border flex flex-col justify-between space-y-4 hover:border-primary/40 shadow-2xs transition-all"
                >
                  <div className="space-y-1">
                    <span className="text-xl font-black text-primary block tracking-wide">{phone.name}</span>
                    <span className="text-xs font-bold text-foreground block">{phone.label}</span>
                    <span className="text-[11px] text-muted-foreground block leading-tight">{phone.sub}</span>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground bg-accent px-2.5 py-1 rounded-full w-fit border border-border/30">
                    {phone.note}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* พร้อมระบายแล้วหรือยัง? */}
          <section className="bg-linear-to-b from-accent to-accent/40 text-accent-foreground p-8 rounded-3xl border border-primary/10 text-center space-y-4 max-w-2xl mx-auto w-full shadow-xs">
            <h3 className="text-xl font-black text-foreground">พร้อมระบายแล้วหรือยัง?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
              ไม่ต้องกังวล ไม่มีใครรู้ว่าคุณเป็นใคร - พิมพ์เรื่องราวในใจได้เลยตอนนี้
            </p>
            <a href="/vent" className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold px-8 py-3.5 rounded-full shadow-md transition-all hover:scale-105 mt-2">
              เข้าสู่ห้องระบายใจ <ArrowRight className="w-4 h-4" />
            </a>
          </section>

        </div>
      </main>

      {/* 📋 4. Footer ส่วนท้ายหน้าเว็บ */}
      <footer className="bg-card border-t border-border pt-12 text-xs text-muted-foreground">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          <div className="space-y-3 md:col-span-1">
            <span className="text-base font-black text-foreground flex items-center gap-1.5">🏡 บ้านพักใจ</span>
            <p className="text-[11px] leading-relaxed text-muted-foreground/80">
              พื้นที่ปลอดภัยสำหรับทุกคน ไม่ระบุตัวตน ไม่ตัดสิน พร้อมสนับสนุนสุขภาพจิตที่ดีของคุณในทุกๆ วัน
            </p>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">เมนู</h5>
            <ul className="space-y-2 text-[11px]">
              <li><a href="/" className="hover:text-primary transition-colors">หน้าแรก</a></li>
              <li><a href="/vent" className="hover:text-primary transition-colors">ระบายความรู้สึก</a></li>
              <li><a href="/resources" className="hover:text-primary transition-colors">ทรัพยากรสุขภาพจิต</a></li>
              <li><span className="text-muted-foreground/40 cursor-not-allowed">เกี่ยวกับเรา</span></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">ช่วยเหลือฉุกเฉิน</h5>
            <ul className="space-y-2 text-[11px]">
              <li>📞 1323 (สุขภาพจิต)</li>
              <li>📞 1669 (ฉุกเฉินแพทย์)</li>
              <li>📞 02-713-6793 (ราชานุกูล)</li>
              <li>📞 1422 (สายด่วนสาธารณสุข)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">ทรัพยากรเพิ่มเติม</h5>
            <ul className="space-y-2 text-[11px]">
              <li><span className="text-muted-foreground/80">กรมสุขภาพจิต</span></li>
              <li><span className="text-muted-foreground/80">โรงพยาบาลราชานุกูล</span></li>
              <li><span className="text-muted-foreground/80">สถาบันจิตเวชศาสตร์สมเด็จฯ</span></li>
              <li><a href="/quiz" className="hover:text-primary text-primary font-bold underline">แบบประเมินความเครียด</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border py-6 text-center text-[10px] space-y-1.5 max-w-4xl mx-auto px-4">
          <p className="font-semibold text-foreground/70 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> © 2026 บ้านพักใจ My Safe Space · สร้างมาเพื่อทุกคน ด้วยความรัก
          </p>
          <p className="text-muted-foreground/50 max-w-lg mx-auto leading-normal">
            ข้อมูลบนเว็บไซต์นี้ไม่ใช่การวินิจฉัยทางการแพทย์ หากคุณหรือคนใกล้ชิดอยู่ในภาวะวิกฤตที่มีความเสี่ยง โปรดติดต่อผู้เชี่ยวชาญทางสายด่วนโดยตรงทันที
          </p>
        </div>
      </footer>

    </div>
  );
}