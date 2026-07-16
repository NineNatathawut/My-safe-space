"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Phone, BookOpen, Menu, X, ChevronRight, 
  ShieldCheck, Send, MessageCircle, User, MessageSquareHeart
} from "lucide-react";

// โครงสร้างของโพสต์ระบายใจ
interface Post {
  id: number;
  mood: string;
  content: string;
  time: string;
  replies: string[];
}

export default function VentPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [text, setText] = useState("");
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  
  // สร้าง Mock Data สำหรับโพสต์เริ่มต้น เพื่อให้เห็นฟีดที่คนอื่นมาช่วยกันตอบ
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      mood: "เหนื่อยล้า 🥱",
      content: "ช่วงนี้เรียนหนักและสอบติดกันหลายวันมาก รู้สึกสมองตื้อไปหมด เหนื่อยจนอยากร้องไห้เลยครับ ไม่รู้จะไหวไหม...",
      time: "2 นาทีที่แล้ว",
      replies: [
        "กอด ๆ นะคะคุณ เดี๋ยวมันก็ผ่านไปนะ ตอนนี้หาของอร่อยกินแล้วนอนพักผ่อนเยอะ ๆ ก่อนนะคนเก่ง",
        "เป็นกำลังใจให้นะครับ เราก็ผ่านช่วงนั้นมาได้ คุณทำได้แน่นอน อย่าลืมใจดีกับตัวเองนะ"
      ]
    },
    {
      id: 2,
      mood: "เศร้าใจ 😞",
      content: "ทะเลาะกับที่บ้านมาครับ รู้สึกอึดอัดมาก เหมือนพูดอะไรไปก็ไม่มีใครเข้าใจเลย ยิ่งอยู่ยิ่งรู้สึกโดดเดี่ยว",
      time: "1 ชั่วโมงที่แล้ว",
      replies: [
        "เข้าใจความรู้สึกเลยครับ มันอึดอัดมากจริง ๆ มานั่งพักใจในบ้านหลังนี้ก่อนนะ ยินดีรับฟังเสมอครับ"
      ]
    }
  ]);

  // State สำหรับเก็บข้อความที่กำลังพิมพ์ตอบคอมเมนต์แยกตาม ID โพสต์
  const [replyInputs, setReplyInputs] = useState<{ [key: number]: string }>({});

  // ฟังก์ชันโพสต์เรื่องราวใหม่
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newPost: Post = {
      id: Date.now(),
      mood: selectedMood || "ระบายใจ 💬",
      content: text,
      time: "เมื่อสักครู่",
      replies: []
    };

    setPosts([newPost, ...posts]);
    setText("");
    setSelectedMood(null);
  };

  // ฟังก์ชันพิมพ์ตอบกลับให้กำลังใจเพื่อน
  const handleReplySubmit = (postId: number) => {
    const replyText = replyInputs[postId];
    if (!replyText?.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return { ...post, replies: [...post.replies, replyText] };
      }
      return post;
    }));

    setReplyInputs({ ...replyInputs, [postId]: "" });
  };

  const moods = [
    { emoji: "😞", label: "เศร้าใจ" },
    { emoji: "😡", label: "โกรธ/อึดอัด" },
    { emoji: "😰", label: "กังวล" },
    { emoji: "🥱", label: "เหนื่อยล้า" },
    { emoji: "💔", label: "เฮิร์ท" }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      
      {/* 🚨 1. Top Urgent Bar (แถบด่วนบนสุดของหน้าเว็บจากไฟล์ PDF) */}
      <div className="bg-rose-500/5 border-b border-rose-100/60 py-2.5 px-4 text-center text-xs font-semibold text-rose-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
        <span>ต้องการความช่วยเหลือเร่งด่วน? โทรหาผู้เชี่ยวชาญได้เลย - ฟรี ตลอด 24 ชั่วโมง</span>
        <div className="flex gap-2 font-bold text-[10px] sm:text-xs">
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1323 สุขภาพจิต</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1669 ฉุกเฉิน</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1385 ป้องกันชีวิต</span>
        </div>
      </div>

      {/* 🏡 2. Sticky Navigation Bar */}
     <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-md border-b border-border/60 transition-all">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          <a href="/" className="text-base font-black tracking-tight flex items-center gap-1.5 hover:opacity-85 transition-opacity">
            <span className="text-lg"></span>
            <span className="text-foreground">บ้านพักใจ</span>
          </a>

          <nav className="hidden md:flex items-center gap-1 text-[13px] font-bold text-muted-foreground">
            <a href="/" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">หน้าแรก</a>
            <a href="/vent" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">ระบายความรู้สึก</a>
            <a href="/resources" className="hover:text-primary hover:bg-accent/50 px-3 py-2 rounded-xl transition-all">ทรัพยากร</a>
            <a href="/quiz" className="text-primary px-3 py-2 rounded-xl bg-primary/5 transition-colors flex items-center gap-1">
              แบบประเมิน <span className="text-[10px] bg-amber-500/10 text-amber-600 px-1.5 py-0.5 rounded-md font-normal">ใหม่</span>
            </a>
            <a href="/#helpline" className="ml-2 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-xs hover:bg-primary/90 transition-all text-xs font-black">
              ติดต่อขอความช่วยเหลือ
            </a>
          </nav>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-b border-border text-sm font-bold shadow-inner"
            >
              <div className="px-4 py-4 space-y-2 flex flex-col">
                <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground">หน้าแรก <ChevronRight className="w-4 h-4" /></a>
                <a href="/vent" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground">ระบายความรู้สึก <ChevronRight className="w-4 h-4" /></a>
                <a href="/resources" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-accent p-3 rounded-xl flex items-center justify-between text-muted-foreground">ทรัพยากร <ChevronRight className="w-4 h-4" /></a>
                <a href="/quiz" onClick={() => setIsMobileMenuOpen(false)} className="text-primary bg-primary/5 p-3 rounded-xl flex items-center justify-between">แบบประเมินความเครียด <ChevronRight className="w-4 h-4" /></a>
                <a href="/#helpline" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-primary-foreground text-center py-3 rounded-xl shadow-xs block mt-2 font-black">
                  ติดต่อขอความช่วยเหลือ 📞
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🧩 3. Main Content (Fusion Layout) */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-12">
        
        <div className="text-center space-y-2 mb-12 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-accent text-primary px-3.5 py-1.5 rounded-full text-xs font-bold border border-primary/10 shadow-xs">
            🤝 คอมมูนิตี้แลกเปลี่ยนพลังบวก
          </div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">พื้นที่ร่วมแบ่งปันและเยียวยาใจ</h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            พื้นที่แชร์เรื่องราวอึดอัดใจแบบไม่ระบุตัวตน โพสต์ทิ้งไว้เพื่อให้เพื่อน ๆ แวะมาส่งกำลังใจ หรือจะเข้าไปช่วยเยียวยาหัวใจของคนอื่นก็ได้นะ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* 🤍 ฝั่งซ้าย: ฟอร์มโพสต์ + รายการกระทู้ฟีด (2 คอลัมน์) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* กล่องสร้างโพสต์ใหม่ */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-2xs">
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-foreground block">ตอนนี้คุณรู้สึกอย่างไรอยู่บ้าง? (เลือกแท็กอารมณ์)</label>
                  <div className="flex flex-wrap gap-2">
                    {moods.map((m, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedMood(`${m.emoji} ${m.label}`)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          selectedMood === `${m.emoji} ${m.label}`
                            ? "bg-primary border-primary text-primary-foreground shadow-xs scale-102" 
                            : "bg-background border-border text-muted-foreground hover:bg-accent"
                        }`}
                      >
                        {m.emoji} {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="แชร์เรื่องราวที่ทำให้คุณไม่สบายใจลงบนบอร์ดนี้... เพื่อน ๆ ในบ้านรอส่งกำลังใจให้อยู่นะครับ"
                    rows={4}
                    className="w-full bg-background border border-border rounded-2xl p-4 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none text-foreground"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="w-full bg-primary disabled:bg-border text-primary-foreground disabled:text-muted-foreground/50 font-black text-xs sm:text-sm py-3.5 rounded-2xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> โพสต์เรื่องราวลงบอร์ดพักใจ
                </button>
              </form>
            </div>

            {/* ส่วนแสดงรายการโพสต์ (Feed) */}
            <div className="space-y-4">
              <h3 className="font-black text-sm text-muted-foreground px-1 flex items-center gap-1.5">
                <MessageSquareHeart className="w-4 h-4 text-primary" /> เรื่องราวล่าสุดจากเพื่อนร่วมทาง
              </h3>

              <AnimatePresence>
                {posts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
                  >
                    {/* หัวการ์ดโพสต์ */}
                    <div className="flex justify-between items-center text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-accent text-primary flex items-center justify-center">
                          <User className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <span className="font-bold text-foreground block">เพื่อนในบ้านพักใจ</span>
                          <span className="text-[10px] text-muted-foreground">{post.time}</span>
                        </div>
                      </div>
                      <span className="bg-primary/5 border border-primary/10 text-primary font-bold px-2.5 py-1 rounded-full text-[11px]">
                        {post.mood}
                      </span>
                    </div>

                    {/* เนื้อหาโพสต์ */}
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium leading-relaxed whitespace-pre-line bg-background/40 p-3 rounded-2xl border border-border/30">
                      {post.content}
                    </p>

                    {/* ส่วนของคอมเมนต์ตอบกลับ (Replies) */}
                    {post.replies.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-border/40">
                        <span className="text-[10px] font-black text-muted-foreground block px-1">💬 ข้อความส่งพลังบวกจากเพื่อน ๆ:</span>
                        <div className="space-y-2">
                          {post.replies.map((reply, rIdx) => (
                            <div key={rIdx} className="bg-accent/40 border border-border/30 p-3 rounded-xl text-xs text-foreground/80 leading-relaxed font-medium">
                              <span className="font-bold text-primary block text-[10px] mb-0.5">🌟 เพื่อนร่วมทาง:</span>
                              {reply}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* กล่องพิมพ์คอมเมนต์ให้กำลังใจ */}
                    <div className="flex gap-2 pt-2 items-center">
                      <input
                        type="text"
                        value={replyInputs[post.id] || ""}
                        onChange={(e) => setReplyInputs({ ...replyInputs, [post.id]: e.target.value })}
                        placeholder="พิมพ์ข้อความฮีลใจส่งให้เพื่อนคนนี้..."
                        className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-xs font-medium focus:outline-hidden focus:border-primary transition-colors text-foreground"
                      />
                      <button
                        onClick={() => handleReplySubmit(post.id)}
                        className="bg-accent hover:bg-primary hover:text-primary-foreground p-2 rounded-xl text-primary transition-all cursor-pointer shadow-2xs"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

          </div>

          {/* 🔮 ฝั่งขวา: แถบ Sidebar 3 การ์ด (1 คอลัมน์) ยกร่างมาจากอันเดิม */}
          <div className="space-y-6">
            
            {/* การ์ดสายด่วน */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-2xs space-y-4">
              <h2 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-sm sm:text-base">
                <Phone className="w-4 h-4 stroke-[2.5]" /> สายด่วน — พร้อมช่วยเสมอ
              </h2>
              <div className="space-y-2">
                {[
                  { label: "1323 สายด่วนสุขภาพจิต", href: "tel:1323" },
                  { label: "02-713-6793 ราชานุกูล", href: "tel:027136793" },
                  { label: "1669 ฉุกเฉินฟรี", href: "tel:1669" },
                  { label: "1300 ช่วยเหลือสังคม", href: "tel:1300" }
                ].map((item, idx) => (
                  <a 
                    key={idx}
                    href={item.href}
                    className="w-full bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl p-3.5 px-4 flex justify-between items-center text-xs sm:text-sm font-semibold transition-colors group"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs opacity-70 group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* การ์ดฝึกหายใจ */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-2xs space-y-4">
              <div className="space-y-0.5">
                <h2 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-sm sm:text-base">
                  <Heart className="w-4 h-4 stroke-[2.5]" /> หายใจ 4-4-4
                </h2>
                <p className="text-[11px] text-muted-foreground font-medium pl-0.5">ลองหายใจลึกๆ เพื่อลดความเครียดได้ทันที</p>
              </div>
              <div className="space-y-3 pt-1">
                {[
                  "หายใจเข้า นับ 1-2-3-4",
                  "กลั้นหายใจ นับ 1-2-3-4",
                  "หายใจออก นับ 1-2-3-4",
                  "ทำซ้ำ 4 รอบ"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-foreground font-semibold">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* การ์ดทรัพยากรแนะนำ */}
            <div className="bg-card rounded-3xl p-6 border border-border shadow-2xs space-y-4">
              <h2 className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2 text-sm sm:text-base">
                <BookOpen className="w-4 h-4 stroke-[2.5]" /> ทรัพยากรแนะนำ
              </h2>
              <div className="flex flex-col text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 divide-y divide-border/60">
                {[
                  { text: "กรมสุขภาพจิต (DMH)", url: "https://www.dmh.go.th" },
                  { text: "แบบประเมินความเครียด", url: "/quiz" },
                  { text: "คลินิกจิต รพ.รามา", url: "https://www.rama.mahidol.ac.th" },
                  { text: "บทความจัดการความเครียด", url: "/resources" }
                ].map((link, idx) => (
                  <a 
                    key={idx}
                    href={link.url}
                    className="py-3.5 flex justify-between items-center hover:opacity-85 transition-opacity group first:pt-1 last:pb-1"
                  >
                    <span>{link.text}</span>
                    <span className="text-xs opacity-70 group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 📋 4. Footer */}
      <footer className="bg-card border-t border-border py-6 text-center text-[10px] text-muted-foreground">
        <p className="font-semibold text-foreground/70 flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> © 2026 บ้านพักใจ My Safe Space · คอมมูนิตี้เพื่อทุกคน
        </p>
      </footer>

    </div>
  );
}