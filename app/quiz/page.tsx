"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Brain, Phone, Shield, 
  Smile, ArrowRight, Sparkles, ShieldCheck, 
  Menu, X, ChevronRight, HelpCircle, RefreshCw, 
  Frown, ClipboardCheck, MessageSquare, ExternalLink
} from "lucide-react";

export default function QuizPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // State สำหรับจัดการหน้าตาและคะแนนของแบบทดสอบ
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // รายการคำถามเช็กสภาพใจสั้นๆ 5 ข้อ (ประยุกต์ให้เข้าใจง่ายและอบอุ่น)
  const questions = [
    { text: "1. ในช่วง 1-2 สัปดาห์นี้ คุณรู้สึกนอนหลับยาก หลับๆ ตื่นๆ หรือนอนมากเกินไปไหม?" },
    { text: "2. คุณรู้สึกสมาธิสั้นลง ใจลอย หรือคิดวนเวียนอยู่กับเรื่องเครียดๆ จนสลัดไม่ออกบ้างไหม?" },
    { text: "3. รู้สึกเหนื่อยล้า อ่อนเพลีย ไม่มีแรง หรือไม่อยากลุกขึ้นมาทำสิ่งที่เคยชอบบ้างหรือเปล่า?" },
    { text: "4. รู้สึกหงุดหงิดง่าย อ่อนไหวง่าย หรือวิตกกังวลกับเรื่องเล็กๆ น้อยๆ มากกว่าปกติไหม?" },
    { text: "5. มีความรู้สึกเบื่อหน่าย ผิดหวังในตัวเอง หรือรู้สึกเหมือนแบกโลกไว้คนเดียวบ้างไหม?" }
  ];

  // ตัวเลือกคะแนน
  const options = [
    { label: "ไม่เลย", score: 0 },
    { label: "บางครั้ง", score: 1 },
    { label: "บ่อยครั้ง", score: 2 },
    { label: "เป็นประจำ", score: 3 }
  ];

  // ฟังก์ชันเมื่อกดเลือกคำตอบ
  const handleAnswer = (score: number) => {
    const updatedAnswers = [...answers, score];
    setAnswers(updatedAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  // ฟังก์ชันเริ่มทำใหม่
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
  };

  // คำนวณคะแนนรวมทั้งหมด
  const totalScore = answers.reduce((a, b) => a + b, 0);

  // แปลผลลัพธ์ตามคะแนน
  const getResultInfo = (score: number) => {
    if (score <= 4) {
      return {
        title: "ใจคุณยังแข็งแรงและน่ารักดีอยู่ภายนอก 🌿",
        desc: "ระดับความเครียดของคุณอยู่ในเกณฑ์ต่ำมากครับ ช่วงนี้สภาพจิตใจยังรับมือกับเรื่องต่างๆ ได้ดี แต่อย่าลืมหาเวลาพักผ่อนและทำกิจกรรมที่ชอบเรื่อยๆ เพื่อรักษาพลังบวกนี้นะครับ",
        color: "text-emerald-600 bg-emerald-500/5 border-emerald-200",
        advice: "ลองแวะไปหน้า 'ทรัพยากร' เพื่อดูเทคนิคการฝึกสติหรือกิจกรรมฮีลใจเบาๆ เติมพลังเสริมได้นะ"
      };
    } else if (score <= 9) {
      return {
        title: "ช่วงนี้ใจเริ่มแบกความเครียดสะสมไว้แล้วนะ ☁️",
        desc: "ระดับความเครียดปานกลางครับ สมองและร่างกายของคุณกำลังส่งสัญญาณเตือนเบาๆ ว่าเริ่มเหนื่อยล้าจากการแบกรับปัญหา ลองหยุดพักความจอกแจกจอแจ หายใจลึกๆ และหาคนระบายดูนะครับ",
        color: "text-amber-600 bg-amber-500/5 border-amber-200",
        advice: "แนะนำให้ลองแวะไปที่ 'กล่องระบายใจ (Vent)' พิมพ์ทุกเรื่องอึดอัดปล่อยทิ้งไว้ในบ้านหลังนี้ได้เลยทันที"
      };
    } else {
      return {
        title: "ช่วงนี้หัวใจอ่อนล้าและต้องการการโอบกอดเป็นพิเศษ 🚨",
        desc: "ระดับความเครียดค่อนข้างสูงครับ ไม่แปลกเลยที่คุณจะรู้สึกเหนื่อยหรือหม่นหมองขนาดนี้ คุณเก่งมากแล้วที่ประคับประคองใจมาได้ถึงตอนนี้ แต่ถ้ารู้สึกหนักเกินไป การพูดคุยกับผู้เชี่ยวชาญจะช่วยปลดล็อกได้ดีมากๆ ครับ",
        color: "text-rose-600 bg-rose-500/5 border-rose-200",
        advice: "อย่าแบกไว้คนเดียวนะครับ ลองกดโทรหาหน่วยงานซัพพอร์ตด้านล่าง หรือสายด่วนสุขภาพจิต 1323 (โทรฟรี 24 ชม.) ได้เลยนะ"
      };
    }
  };

  const result = getResultInfo(totalScore);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      
      {/* 🚨 1. Top Urgent Bar */}
      <div className="bg-rose-500/5 border-b border-rose-100/60 py-2.5 px-4 text-center text-xs font-semibold text-rose-700 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
        <span>ต้องการความช่วยเหลือเร่งด่วน? โทรหาผู้เชี่ยวชาญได้เลย - ฟรี ตลอด 24 ชั่วโมง</span>
        <div className="flex gap-2 font-bold text-[10px] sm:text-xs">
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1323 สุขภาพจิต</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1669 ฉุกเฉิน</span>
          <span className="bg-rose-500/10 px-2 py-0.5 rounded-full">1385 ป้องกันชีวิต</span>
        </div>
      </div>

      {/* 🏡 2. Sticky Navigation Bar (ไฮไลต์เมนู "แบบประเมิน") */}
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

      {/* 🧩 3. ส่วนกล่องทำแบบประเมินความเครียด (Main Content) */}
      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-12 flex flex-col justify-center items-center">
        
        <AnimatePresence mode="wait">
          {!showResult ? (
            /* 📝 หน้าจอแสดงคำถามทีละข้อ */
            <motion.div 
              key="quiz-card"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 bg-accent text-primary px-3.5 py-1.5 rounded-full text-xs font-bold border border-primary/10">
                  <ClipboardCheck className="w-3.5 h-3.5" /> แบบสำรวจอารมณ์เบาๆ
                </div>
                <h1 className="text-2xl font-black text-foreground">เช็กสภาพใจกันหน่อยนะ</h1>
                <p className="text-xs text-muted-foreground">
                  ข้อความทั้งหมดเป็นความลับและไม่มีการเก็บสถิติลงระบบใดๆ สบายใจได้เลยครับ
                </p>
                
                {/* Progress Bar แสดงความคืบหน้า */}
                <div className="w-full bg-secondary h-2 rounded-full mt-4 overflow-hidden max-w-xs mx-auto">
                  <div 
                    className="bg-primary h-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground block pt-1">
                  คำถามข้อที่ {currentQuestion + 1} จากทั้งหมด {questions.length} ข้อ
                </span>
              </div>

              {/* การ์ดคำถาม */}
              <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-xs space-y-6">
                <h3 className="font-bold text-base sm:text-lg text-foreground text-center leading-relaxed px-2">
                  {questions[currentQuestion].text}
                </h3>

                {/* รายการปุ่มตัวเลือกตอบ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {options.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleAnswer(opt.score)}
                      className="bg-background hover:bg-primary hover:text-primary-foreground text-foreground border border-border p-4 rounded-2xl font-bold text-sm text-center transition-all active:scale-98 cursor-pointer shadow-2xs hover:shadow-md"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ✨ หน้าจอแสดงผลลัพธ์การคำนวณคะแนนสุดอบอุ่น */
            <motion.div
              key="result-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full space-y-6"
            >
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-black text-foreground">ผลการประเมินสภาพใจของคุณ</h1>
                <p className="text-xs text-muted-foreground">คะแนนสะสมรวม: {totalScore} คะแนน จากเต็ม 15 คะแนน</p>
              </div>

              {/* การ์ดผลลัพธ์ */}
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xs space-y-5 ${result.color}`}>
                <div className="space-y-2">
                  <h2 className="font-black text-lg sm:text-xl leading-snug">{result.title}</h2>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">{result.desc}</p>
                </div>

                <div className="bg-background/80 border border-border/40 p-4 rounded-2xl text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground block mb-1">💡 คำแนะนำเสริมสำหรับคุณ:</span>
                  {result.advice}
                </div>

                {/* ปุ่มนำทางไปต่อที่สอดคล้องกับคะแนน */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={resetQuiz}
                    className="bg-background border border-border text-foreground hover:bg-accent font-bold text-xs px-5 py-3 rounded-full flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> ทำแบบทดสอบอีกครั้ง
                  </button>
                  
                  {totalScore >= 5 ? (
                    <a
                      href="/vent"
                      className="bg-primary text-primary-foreground font-black text-xs px-6 py-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 transition-all text-center"
                    >
                      ไปที่ห้องระบายใจตอนนี้ <MessageSquare className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href="/resources"
                      className="bg-primary text-primary-foreground font-black text-xs px-6 py-3 rounded-full flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 transition-all text-center"
                    >
                      ดูเทคนิคผ่อนคลายเพิ่มเติม <Sparkles className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              <li>📞 1385 (ป้องกันชีวิต)</li>
              <li>📞 1422 (สายด่วนสาธารณสุข)</li>
            </ul>
          </div>
          <div className="space-y-3">
            <h5 className="font-bold text-foreground uppercase tracking-wider text-[11px]">ทรัพยากรเพิ่มเติม</h5>
            <ul className="space-y-2 text-[11px]">
              <li><span className="text-muted-foreground/80">กรมสุขภาพจิต</span></li>
              <li><span className="text-muted-foreground/80">โรงพยาบาลราชานุกูล</span></li>
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