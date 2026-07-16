# ⚙️ บ้านพักใจ (My Safe Space) - System Logic & Architecture

ไฟล์นี้อธิบายถึงกลไกการทำงานเบื้องหลัง (Under the hood), การจัดการ State, และโครงสร้างข้อมูลของเว็บแอปพลิเคชัน "บ้านพักใจ" เพื่อให้ AI Developer เข้าใจ Logic ในการนำไปเขียนโค้ดด้วย Next.js 15 (App Router) และ TypeScript

---

## 💾 1. การจัดการตัวตนของผู้ใช้ (Identity & Session Management)

เนื่องจากระบบใช้ปรัชญา "ช่วยเหลือก่อน ขอสมัครทีหลัง" ระบบตัวตนจึงแบ่งเป็น 2 ระดับ:

### 1.1 Guest Session (ผู้ใช้ที่ยังไม่สมัครสมาชิก)
- **กลไกการจำตัวตน:** เมื่อผู้ใช้เข้ามาที่เว็บครั้งแรก ระบบจะสร้าง `guest_token` (UUID) และเก็บไว้ใน `localStorage` ของเบราว์เซอร์
- **ระบบสุ่มชื่อ (Randomized Pseudonym):** 
  - ทันทีที่เข้าสู่หน้า "ห้องระบาย" ระบบจะสุ่มชื่อ 1 ชื่อจาก Array ของชื่อที่เตรียมไว้ (เช่น `['🌸 เมฆสีฟ้า', '🌙 ดาวเหนือ', '🍃 ใบไม้ลมหนาว', ...]`)
  - นำชื่อที่สุ่มได้ไปผูกกับ `guest_token` และเก็บลง `localStorage` (เช่น `guest_name: '🌙 ดาวเหนือ'`)
- **ข้อควรระวัง:** ไม่มีการเก็บ IP Address หรือข้อมูลที่ระบุตัวตนจริงได้ (PII) ลงในฐานข้อมูล เพื่อความเป็นส่วนตัว 100%

### 1.2 Registered User (ผู้ใช้ที่สมัครสมาชิกแล้ว)
- หาก Guest ตัดสินใจสมัครสมาชิก (เพื่อเก็บชื่อสุ่มและประวัติถาวร) `guest_token` จะถูกอัปเกรดและผูกเข้ากับ User ID ในฐานข้อมูล
- ใช้ระบบ Authentication มาตรฐาน (เช่น NextAuth.js / Auth.js หรือ Supabase Auth) แต่ให้ซ่อนข้อมูลอีเมลในหน้า UI ทั้งหมด

---

## 🚦 2. ระบบจำกัดสิทธิ์ (Quota & Permission System)

การควบคุมสิทธิ์ของ Guest จะถูกตรวจสอบผ่าน `localStorage` (หรือคุกกี้) ร่วมกับการตรวจสอบที่ฝั่ง Server/API:

- **สิทธิ์การโพสต์ระบาย:** 1 โพสต์ / 1 Guest Token
  - สร้างตัวแปร state เช่น `has_posted: boolean` ลงใน `localStorage`
- **สิทธิ์การตอบกลับ (Comment):** 1 ครั้ง / 1 Guest Token
  - สร้างตัวแปร state เช่น `has_replied: boolean`
- **เมื่อใช้สิทธิ์ครบ (Soft Call-to-Action):** 
  - **จะไม่เตือนว่า:** "คุณใช้สิทธิ์หมดแล้ว กรุณาสมัครสมาชิก" (ห้ามใช้คำสั่งเชิงลบ/บล็อก)
  - **จะแสดง Popup/Modal ว่า:** "💜 ดีใจที่คุณได้แบ่งปันความรู้สึกกับเรา หากอยากพูดคุยต่อ รับการแจ้งเตือน... กรุณาเข้าบ้านพักใจ"

---

## 🔔 3. ระบบแจ้งเตือน (Notification Logic)

เพื่อสร้างประสบการณ์ที่อบอุ่น ระบบแจ้งเตือนจะทำงานดังนี้:

- **State Management:** ใช้ React Context หรือ Zustand ในการจัดการ Global State ของ Notification
- **Trigger:**
  1. เมื่อมีคนมาคอมเมนต์ในโพสต์ของ Guest ตัว `post_id` ที่ผูกกับ `guest_token` จะมีการอัปเดต 
  2. ระบบจะแสดงจุดสีม่วง (Badge) หรือ Toast Notification: *"🌸 มีใครบางคนส่งกำลังใจถึงคุณ"*
- **Action:** เมื่อ Guest กดที่แจ้งเตือน จะแสดง Modal ชักชวนเข้าสู่ระบบ (Sign-up/Login Modal) เพื่ออ่านข้อความต่อ

---

## 🗄️ 4. โครงสร้างข้อมูลเบื้องต้น (Conceptual Data Schema)

แม้ช่วงแรกอาจจะ Mock Data แต่ AI ควรทราบ Schema หลักเพื่อเตรียมสร้าง API/Database (เช่น Prisma + PostgreSQL หรือ Supabase):

**Table: `Posts`**
- `id` (String/UUID)
- `author_token` (String) -> เก็บ `guest_token` หรือ `user_id`
- `author_name` (String) -> ชื่อที่สุ่มได้ เช่น '🌙 ดาวเหนือ'
- `content` (Text) -> ข้อความระบาย (Max 1000 chars)
- `emotion_tag` (String) -> ไอคอนความรู้สึก (เช่น 'เศร้า', 'เหนื่อย')
- `created_at` (Timestamp)
- `reply_count` (Int) -> ค่าเริ่มต้น 0

**Table: `Comments`**
- `id` (String/UUID)
- `post_id` (String/UUID) -> โพสต์ที่ไปตอบ
- `author_name` (String) -> จะแสดงเป็น "ใครบางคน" (Someone) ในมุมมองของเจ้าของโพสต์ที่เป็น Guest
- `content` (Text)
- `created_at` (Timestamp)

---

## 🚪 5. กลไกตอนออกจากหน้าเว็บ (Exit Intent Logic)

เพื่อแทนที่ Browser Alert แบบเก่า (`Are you sure you want to leave?`):
- ใช้ Event Listener ดักจับการขยับเมาส์ (Mouse Leave) ขึ้นไปที่แถบ URL หรือปิดแท็บ (`mouseleave` event บริเวณ `clientY < 0`)
- **Action:** แสดง Custom Modal ของ `shadcn/ui` (Framer Motion fade-in) 
- **Content:** *"🌸 ก่อนกลับ... หากวันไหนรู้สึกเหนื่อยอีก บ้านพักใจยังเปิดรอคุณเสมอนะ"*
- **Options:** `[🏡 กลับมาครั้งหน้า]` (ปิด Modal) / `[💜 เข้าบ้านพักใจ]` (เปิดหน้า Login/Signup)

---

## 🧩 6. Component Architecture (Next.js App Router)
- **Client Components (`"use client"`):** ใช้สำหรับส่วนที่ต้องทำ Animation (Framer Motion), ฟอร์มกรอกข้อมูล, วงกลมฝึกหายใจ 4-7-8, และส่วนที่ต้องอ่าน `localStorage` (ระบบ Guest)
- **Server Components:** ใช้สำหรับ Layout หลัก, SEO tags, และการดึงข้อมูลทรัพยากร/บทความที่ไม่ได้ต้องการ Interaction เพื่อความรวดเร็วในการโหลด