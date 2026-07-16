"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Phone, BookOpen, Menu, X, ShieldCheck, 
  Wind, Play, Square, Heart
} from "lucide-react";

interface Article {
  id: number;
  title: string;
  description: string;
  tag: string;
  linkText: string;
  linkUrl: string;
  emoji: string;
  color: string;
}

export default function ResourcesPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  
  // 🧘‍♂️ State สำหรับระบบฝึกหายใจสากล 4-7-8
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState(0); // 0: เข้า (4s), 1: กลั้น (7s), 2: ออก (8s)
  const [secondsLeft, setSecondsLeft] = useState(4);

  // โครงสร้างเวลาและคำแนะนำสูตร 4-7-8
  const phases = [
    { 
      text: "หายใจเข้าช้าๆ... 🧘‍♂️", 
      sub: "สูดลมหายใจเข้าทางจมูกเงียบๆ", 
      duration: 4, 
      color: "text-indigo-600 dark:text-indigo-400"
    },
    { 
      text: "กลั้นหายใจไว้นิ่งๆ... 🎯", 
      sub: "ผ่อนคลายร่างกาย ให้ใจสงบลง", 
      duration: 7, 
      color: "text-amber-600 dark:text-amber-400"
    },
    { 
      text: "ผ่อนหายใจออกยาวๆ... 💨", 
      sub: "พ่นลมหายใจออกทางปากให้มีเสียง 'ฟู่'", 
      duration: 8, 
      color: "text-rose-600 dark:text-rose-400"
    }
  ];

  // ข้อมูลเคล็ดลับดูแลสุขภาพจิตประจำวัน (ถอดแบบจากรูปภาพ)
  const dailyTips = [
    {
      id: 1,
      title: "เขียนความรู้สึกทุกวัน",
      desc: "Journal ช่วยระบายและจัดระเบียบความคิดได้ดีกว่าที่คิด"
    },
    {
      id: 2,
      title: "ออกกำลังกาย 30 นาที",
      desc: "ร่างกายและจิตใจเชื่อมกัน การขยับร่างกายช่วยเพิ่ม serotonin"
    },
    {
      id: 3,
      title: "จำกัดเวลาหน้าจอ",
      desc: "ลดการรับข่าวสารและโซเชียลมีเดียก่อนนอนอย่างน้อย 1 ชั่วโมง"
    },
    {
      id: 4,
      title: "พูดคุยกับคนที่ไว้ใจ",
      desc: "ความเป็นส่วนตัวสำคัญ แต่การแบ่งปันความรู้สึกช่วยลดภาระในใจ"
    }
  ];

  // 1. ตัวนับถอยหลังวินาทีจริง
  useEffect(() => {
    if (!isBreathingActive) {
      setBreathingPhase(0);
      setSecondsLeft(4);
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isBreathingActive]);

  // 2. ตัวสลับเฟสการหายใจเมื่อเวลานับจนถึง 0
  useEffect(() => {
    if (secondsLeft === 0 && isBreathingActive) {
      setBreathingPhase((prevPhase) => {
        const nextPhase = (prevPhase + 1) % 3;
        setSecondsLeft(phases[nextPhase].duration);
        return nextPhase;
      });
    }
  }, [secondsLeft, isBreathingActive]);

  // ✅ แก้ไขปัญหาหน้าจอแดง: เติมประเภทข้อมูลข้อมูล : Variants ให้ TypeScript ตาสว่างเรียบร้อย
  const circleVariants: Variants = {
    idle: { scale: 1, opacity: 0.3 },
    phase0: { scale: 1.5, opacity: 0.8, transition: { duration: 4, ease: "easeOut" } },
    phase1: { 
      scale: 1.5, 
      opacity: [1, 0.8, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } 
    },
    phase2: { scale: 1.0, opacity: 0.4, transition: { duration: 8, ease: "easeInOut" } }
  };

  const categories = ["ทั้งหมด", "ความเครียด", "ความวิตกกังวล", "การนอนหลับ", "สติ & Mindfulness", "ความสัมพันธ์"];

  const articles: Article[] = [
    {
      id: 1,
      title: "การฝึก Mindfulness เพื่อลดความเครียด",
      description: "เรียนรู้วิธีอยู่กับปัจจุบัน ลดความคิดฟุ้งซ่าน และสร้างความสงบจากภายใน",
      tag: "สติ & Mindfulness",
      linkText: "อ่านต่อ →",
      linkUrl: "/resources/mindfulness",
      emoji: "🧘‍♀️",
      color: "bg-indigo-50 dark:bg-indigo-950/40"
    },
    {
      id: 2,
      title: "แบบทดสอบความเครียด — รู้ตัวเองก่อน",
      description: "ประเมินระดับความเครียดของคุณในวันนี้ เพื่อรับมือได้ตรงจุด",
      tag: "ความเครียด",
      linkText: "ทำแบบทดสอบ →",
      linkUrl: "/quiz",
      emoji: "🥺",
      color: "bg-purple-50 dark:bg-purple-950/40"
    },
    {
      id: 3,
      title: "Body Scan — สแกนร่างกายเพื่อสงบจิต",
      description: "สัมผัสความรู้สึกในร่างกายทีละส่วน ช่วยคลายการแข็งตึงและหยุดคิดฟุ้งซ่าน",
      tag: "สติ & Mindfulness",
      linkText: "อ่านต่อ →",
      linkUrl: "/resources/bodyscan",
      emoji: "✨",
      color: "bg-violet-50 dark:bg-violet-950/40"
    },
    {
      id: 4,
      title: "เทคนิคจัดความคิดวนเวียนก่อนเข้านอน",
      description: "เคล็ดลับผ่อนคลายสมองที่ตึงเครียดสะสมมาทั้งวัน เพื่อการนอนหลับที่ลึกและสบายขึ้น",
      tag: "การนอนหลับ",
      linkText: "อ่านต่อ →",
      linkUrl: "/resources/sleep",
      emoji: "🌙",
      color: "bg-blue-50 dark:bg-blue-950/40"
    },
    {
      id: 5,
      title: "สื่อสารอย่างไรในความสัมพันธ์ที่เริ่มอึดอัด",
      description: "เปิดใจคุยกับคนรอบข้างด้วยหลักจิตวิทยา ปรับความเข้าใจโดยไม่ทำร้ายความรู้สึกกัน",
      tag: "ความสัมพันธ์",
      linkText: "อ่านต่อ →",
      linkUrl: "/resources/relationship",
      emoji: "🌱",
      color: "bg-emerald-50 dark:bg-emerald-950/40"
    }
  ];

  const filteredArticles = selectedCategory === "ทั้งหมด" 
    ? articles 
    : articles.filter(article => article.tag === selectedCategory);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      
      {/* 🏡 1. Navigation Bar */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="/" className="text-base font-black tracking-tight flex items-center gap-1.5 hover:opacity-85">
            <span className="text-lg">🏡</span>
            <span className="text-foreground">บ้านพักใจ</span>
          </a>
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-bold text-muted-foreground">
            <a href="/" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">หน้าแรก</a>
            <a href="/vent" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">ระบายความรู้สึก</a>
            <a href="/resources" className="text-primary px-3 py-2 rounded-xl bg-primary/5 transition-colors">ทรัพยากร</a>
            <a href="/quiz" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all flex items-center gap-1">
              แบบประเมิน <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-md font-normal">ใหม่</span>
            </a>
          </nav>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-muted-foreground rounded-xl">
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* 🧩 2. Main Content */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12 space-y-12">
        
        {/* หัวข้อหน้าเว็บ */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#4A3E7D] dark:text-indigo-300">
            ทรัพยากรเพื่อสุขภาพจิตที่ดี
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed max-w-lg mx-auto">
            รวมเครื่องมือ บทความ และช่องทางขอความช่วยเหลือ — เพราะคุณไม่ต้องสู้คนเดียว
          </p>
        </div>

        {/* 📞 แบนเนอร์สายด่วนสีม่วงทรงมนกว้าง */}
        <div className="bg-[#63559E] text-white rounded-[2rem] p-6 sm:p-8 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3.5 rounded-2xl shrink-0 mt-0.5">
              <Phone className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-base sm:text-lg">ต้องการความช่วยเหลือเร่งด่วน?</h3>
              <p className="text-xs text-white/80 font-medium">สายด่วนเหล่านี้พร้อมรับฟังคุณตลอด 24 ชั่วโมง ฟรี ไม่เปิดเผยชื่อ</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center">
            {[{ label: "📞 1323", href: "tel:1323" }, { label: "🚑 1669", href: "tel:1669" }, { label: "📞 1385", href: "tel:1385" }, { label: "📞 1300", href: "tel:1300" }].map((phone, idx) => (
              <a key={idx} href={phone.href} className="bg-white/15 hover:bg-white/25 border border-white/20 px-4 py-2.5 rounded-full text-xs font-bold transition-all active:scale-95">{phone.label}</a>
            ))}
          </div>
        </div>

        {/* ─── 🧘‍♂️ ส่วนเครื่องมือฝึกหายใจ 4-7-8 ─── */}
        <div className="bg-card border border-border rounded-[2rem] p-6 sm:p-8 shadow-2xs space-y-6">
          <div className="flex items-center gap-2 text-[#4A3E7D] dark:text-indigo-300">
            <Wind className="w-5 h-5 stroke-[2.5]" />
            <h2 className="text-lg sm:text-xl font-black tracking-tight">เครื่องมือนำฝึกหายใจบำบัดระบบประสาท (สูตร 4-7-8)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center bg-background/50 p-6 rounded-2xl border border-border/40">
            
            {/* ฝั่งซ้าย: วงกลมนำหายใจ */}
            <div className="md:col-span-3 flex flex-col items-center justify-center py-6 border-b md:border-b-0 md:border-r border-border/60 min-h-[260px]">
              <div className="relative w-44 h-44 flex items-center justify-center">
                <motion.div 
                  variants={circleVariants}
                  animate={isBreathingActive ? `phase${breathingPhase}` : "idle"}
                  className="absolute w-28 h-28 rounded-full bg-[#63559E]/20 blur-xs"
                />
                <motion.div 
                  variants={circleVariants}
                  animate={isBreathingActive ? `phase${breathingPhase}` : "idle"}
                  className="absolute w-24 h-24 rounded-full bg-[#63559E] flex items-center justify-center text-white shadow-md z-10"
                >
                  <span className="text-2xl font-black tracking-tighter">{secondsLeft}</span>
                </motion.div>
              </div>

              <div className="text-center mt-6 h-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isBreathingActive ? breathingPhase : "idle"}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="space-y-0.5"
                  >
                    <p className={`text-sm sm:text-base font-black ${isBreathingActive ? phases[breathingPhase].color : "text-muted-foreground"}`}>
                      {isBreathingActive ? phases[breathingPhase].text : "พร้อมแล้วหรือยังครับคนเก่ง?"}
                    </p>
                    <p className="text-[11px] sm:text-xs text-muted-foreground font-medium">
                      {isBreathingActive ? phases[breathingPhase].sub : "เทคนิค 4-7-8 ช่วยชะลออัตราการเต้นของหัวใจและแก้อาการนอนไม่หลับได้ดีมาก"}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ฝั่งขวา: ไกด์ไลน์สูตร 4-7-8 */}
            <div className="md:col-span-2 space-y-5 px-0 md:px-4">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-[#4A3E7D] dark:text-indigo-400">รอบจังหวะการบำบัดใจ:</h4>
                <div className="space-y-2 text-xs font-semibold text-muted-foreground">
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-indigo-500 block"/> หายใจเข้าลึก ๆ <span className="text-foreground font-bold">4 วินาที</span></p>
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500 block"/> กลั้นหายใจผ่อนคลาย <span className="text-foreground font-bold">7 วินาที</span></p>
                  <p className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-rose-500 block"/> ผ่อนหายใจออกยาว ๆ <span className="text-foreground font-bold">8 วินาที</span></p>
                </div>
              </div>

              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`w-full py-3.5 px-4 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs border ${
                  isBreathingActive 
                    ? "bg-rose-500/10 border-rose-200 text-rose-600 hover:bg-rose-500/20" 
                    : "bg-[#63559E] border-[#63559E] text-white hover:opacity-90"
                }`}
              >
                {isBreathingActive ? (
                  <>
                    <Square className="w-3.5 h-3.5 fill-current" /> หยุดการฝึกหายใจ
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" /> เริ่มต้นฝึกอารมณ์ 4-7-8
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─── 💜 ใหม่: ส่วนเคล็ดลับดูแลสุขภาพจิตประจำวัน (อยู่ใต้ส่วนฝึกหายใจตามรูป) ─── */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-2 text-[#4A3E7D] dark:text-indigo-300">
            <Heart className="w-5 h-5 stroke-[2.5]" />
            <h2 className="text-lg sm:text-xl font-black tracking-tight">เคล็ดลับดูแลสุขภาพจิตประจำวัน</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyTips.map((tip) => (
              <div 
                key={tip.id}
                className="bg-amber-50/60 dark:bg-purple-950/20 border border-purple-100/40 dark:border-purple-900/30 rounded-2xl p-6 flex flex-col items-center text-center space-y-3.5 shadow-2xs transition-all hover:scale-[1.02]"
              >
                {/* ตัวเลขสีม่วงทรงกลมแบบ Centered Alignment */}
                <div className="w-7 h-7 rounded-full bg-[#63559E] text-white flex items-center justify-center text-xs font-black shadow-xs">
                  {tip.id}
                </div>
                
                <div className="space-y-1.5">
                  <h4 className="font-black text-xs sm:text-sm text-foreground tracking-tight">
                    {tip.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground font-medium leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 📖 ส่วนเนื้อหาบทความจัดการความเครียด ─── */}
        <div className="space-y-6 pt-2">
          <div className="flex items-center gap-2 text-[#4A3E7D] dark:text-indigo-300">
            <BookOpen className="w-5 h-5 stroke-[2.5]" />
            <h2 className="text-lg sm:text-xl font-black tracking-tight">บทความจัดการความเครียด</h2>
          </div>

          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#63559E] border-[#63559E] text-white shadow-xs scale-102"
                    : "bg-card border-border text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-3xl overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow group"
                >
                  <div className={`h-44 ${article.color} flex items-center justify-center border-b border-border/40 relative`}>
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-300 drop-shadow-xs">{article.emoji}</span>
                    <span className="absolute bottom-3 left-4 bg-background/95 text-[#63559E] dark:text-indigo-300 text-[10px] font-bold px-3 py-1 rounded-lg shadow-2xs border border-border/30">
                      {article.tag}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-black text-sm sm:text-base text-foreground leading-snug group-hover:text-[#63559E] dark:group-hover:text-indigo-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-muted-foreground font-medium leading-relaxed line-clamp-2">
                        {article.description}
                      </p>
                    </div>

                    <a
                      href={article.linkUrl}
                      className="text-xs font-black text-[#63559E] dark:text-indigo-400 hover:opacity-85 inline-flex items-center pt-2"
                    >
                      {article.linkText}
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-14 bg-accent/20 border border-dashed border-border rounded-3xl text-xs text-muted-foreground font-medium">
              🍃 กำลังรวบรวมข้อมูลเพิ่มเติมสำหรับหมวดหมู่นี้อยู่ครับ แวะกลับมาอ่านใหม่ได้เรื่อยๆ เลยนะ
            </div>
          )}
        </div>
      </main>

      {/* 📋 3. Footer */}
      <footer className="bg-card border-t border-border py-6 text-center text-[10px] text-muted-foreground mt-12">
        <p className="font-semibold text-foreground/70 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> © 2026 บ้านพักใจ My Safe Space · คลังทรัพยากรและสุขภาพจิตชุมชน
        </p>
      </footer>

    </div>
  );
}