67022546 นาย กิตติพงศ์ ตระกลสาทร
67023053 อัครชา มารอด
67022625 ณัฐวุฒิ ประจงศิลป์


# Software Document Specification
## บ้านพักใจ (My Safe Space)

---

## สารบัญ

1. [ภาพรวมโครงการ](#1-ภาพรวมโครงการ)
2. [วัตถุประสงค์](#2-วัตถุประสงค์)
3. [ขอบเขตของระบบ](#3-ขอบเขตของระบบ)
4. [สถาปัตยกรรมระบบ](#4-สถาปัตยกรรมระบบ)
5. [เทคโนโลยีที่ใช้](#5-เทคโนโลยีที่ใช้)
6. [โครงสร้างโปรเจกต์](#6-โครงสร้างโปรเจกต์)
7. [รายละเอียดหน้าจอ (Pages)](#7-รายละเอียดหน้าจอ-pages)
8. [รายละเอียดคอมโพเนนต์](#8-รายละเอียดคอมโพเนนต์)
9. [โมเดลข้อมูล](#9-โมเดลข้อมูล)
10. [ข้อกำหนดด้านความปลอดภัย](#10-ข้อกำหนดด้านความปลอดภัย)
11. [ข้อกำหนดด้านประสิทธิภาพ](#11-ข้อกำหนดด้านประสิทธิภาพ)
12. [แผนผังการเชื่อมต่อระหว่างหน้า](#12-แผนผังการเชื่อมต่อระหว่างหน้า)
13. [สถานะปัจจุบันและแผนพัฒนา](#13-สถานะปัจจุบันและแผนพัฒนา)
14. [ข้อกำหนดด้านการทดสอบ](#14-ข้อกำหนดด้านการทดสอบ)
15. [แผนผังการ Deploy](#15-แผนผังการ-deploy)

---

## 1. ภาพรวมโครงการ

| รายการ | รายละเอียด |
|--------|-----------|
| **ชื่อโครงการ** | บ้านพักใจ (My Safe Space) |
| **ประเภท** | เว็บแอปพลิเคชัน (Web Application) |
| **ภาษา** | ภาษาไทย (Thai) |
| **แพลตฟอร์ม** | Responsive Web (Mobile + Desktop) |
| **จุดประสงค์** | แพลตฟอร์มแสดงความรู้สึกแบบไม่เปิดเผยตัวตนสำหรับสุขภาพจิต |

**คำอธิบายโดยย่อ:**
บ้านพักใจเป็นเว็บแอปพลิเคันสำหรับให้ผู้ใช้ระบายความรู้สึก ทำแบบประเมินความเครียด และเข้าถึงแหล่งข้อมูลด้านสุขภาพจิต โดยไม่ต้องเปิดเผยตัวตน ไม่มีการตัดสิน และพร้อมให้บริการตลอด 24 ชั่วโมง

---

## 2. วัตถุประสงค์

### วัตถุประสงค์หลัก
1. สร้างพื้นที่ปลอดภัยสำหรับระบายความรู้สึกโดยไม่เปิดเผยตัวตน
2. ให้ผู้ใช้ทำแบบประเมินความเครียดเบื้องต้น
3. รวบรวมแหล่งข้อมูลด้านสุขภาพจิตที่มีประโยชน์
4. ให้ข้อมูลหมายเลขสายด่วนฉุกเฉินด้านสุขภาพจิตในประเทศไทย

### กลุ่มผู้ใช้เป้าหมาย
- บุคคลทั่วไปที่ต้องการพื้นที่ระบายความรู้สึก
- ผู้ที่มีความเครียด วิตกกังวล หรือปัญหาด้านสุขภาพจิต
- ผู้ที่ต้องการแหล่งข้อมูลและหมายเลขช่วยเหลือด้านสุขภาพจิต

---

## 3. ขอบเขตของระบบ

### ขอบเขตที่ครอบคลุม

| ฟังก์ชัน | สถานะ |
|----------|-------|
| หน้าแรก (Home) | ✅ ใช้งานจริง |
| ห้องระบาย (Vent Room) | ✅ ใช้งานจริง (ข้อมูลจำลอง) |
| แหล่งข้อมูล (Resources) | ✅ ใช้งานจริง |
| แบบทดสอบความเครียด (Quiz) | ✅ ใช้งานจริง |
| การเก็บข้อมูลถาวร (Persistence) | ❌ ยังไม่พัฒนา |
| API / Backend | ❌ ยังไม่พัฒนา |
| ระบบยืนยันตัวตน (Auth) | ❌ ยังไม่พัฒนา |
| ฐานข้อมูล (Database) | ❌ ยังไม่พัฒนา |

---

## 4. สถาปัตยกรรมระบบ

```
┌─────────────────────────────────────────────────┐
│                    Client                        │
│  ┌─────────────────────────────────────────┐    │
│  │         Next.js 16 (App Router)          │    │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │    │
│  │  │  Pages    │  │Components│  │  Lib   │ │    │
│  │  │ (Server/  │  │  (Client │  │ (utils)│ │    │
│  │  │  Client)  │  │  Comp)   │  │        │ │    │
│  │  └──────────┘  └──────────┘  └────────┘ │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │         Tailwind CSS v4 + shadcn/ui      │    │
│  │         Framer Motion (Animation)        │    │
│  │         Lucide React (Icons)             │    │
│  └─────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────┐    │
│  │    State: React useState (Client-side)   │    │
│  │    Storage: ไม่มี (ยังไม่ implement)      │    │
│  └─────────────────────────────────────────┘    │
└─────────────────────────────────────────────────┘
```

### รูปแบบ Component Architecture

```
RootLayout (Server Component)
├── Navbar.tsx (Client Component)
└── {children}
    ├── page.tsx (Home) - Client Component
    ├── vent/page.tsx - Client Component
    ├── quiz/page.tsx - Client Component
    └── resources/page.tsx - Client Component
```

---

## 5. เทคโนโลยีที่ใช้

### Tech Stack

| ชั้น | เทคโนโลยี | เวอร์ชัน | หน้าที่ |
|------|-----------|---------|--------|
| **Framework** | Next.js | 16.2.10 | App Router, Server/Client Components |
| **Language** | TypeScript | 5.x | Type-safe development |
| **UI Library** | React | 19.2.4 | Component-based UI |
| **Styling** | Tailwind CSS | v4 | Utility-first CSS |
| **UI Components** | shadcn/ui | 4.13.0 (base-nova) | Pre-built accessible components |
| **Animation** | Framer Motion | 12.42.2 | Smooth transitions & animations |
| **Icons** | Lucide React | 1.24.0 | Icon library |
| **CSS Utilities** | clsx + tailwind-merge | - | Class name management |
| **Linting** | ESLint | 9.x | Code quality |

### Dependencies

**Production Dependencies:**
- `next` ^16.2.10
- `react` ^19.2.4
- `react-dom` ^19.2.4
- `@base-ui/react` ^1.6.0
- `class-variance-authority` ^0.7.1
- `clsx` ^2.1.1
- `tailwind-merge` ^3.6.0
- `framer-motion` ^12.42.2
- `lucide-react` ^1.24.0
- `tw-animate-css` ^1.4.0

**Dev Dependencies:**
- `typescript` ^5
- `@types/node` ^20
- `@types/react` ^19
- `@types/react-dom` ^19
- `tailwindcss` ^4
- `@tailwindcss/postcss` ^4
- `eslint` ^9
- `eslint-config-next` 16.2.10

---

## 6. โครงสร้างโปรเจกต์

```
My-safe-space/
│
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root Layout (Server Component)
│   ├── page.tsx                  # หน้าแรก (Home)
│   ├── globals.css               # Global styles + Tailwind theme
│   ├── favicon.ico               # Favicon
│   │
│   ├── vent/
│   │   └── page.tsx              # ห้องระบาย (Vent Room)
│   │
│   ├── quiz/
│   │   └── page.tsx              # แบบทดสอบความเครียด
│   │
│   └── resources/
│       └── page.tsx              # แหล่งข้อมูล
│
├── components/
│   ├── Navbar.tsx                # แถบนำทาง (Client Component)
│   └── ui/
│       └── button.tsx            # shadcn/ui Button
│
├── lib/
│   └── utils.ts                  # Utility functions (cn)
│
├── public/                       # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript config
├── next.config.ts                # Next.js config
├── postcss.config.mjs            # PostCSS config
├── eslint.config.mjs             # ESLint config
├── components.json               # shadcn/ui config
└── .gitignore
```

---

## 7. รายละเอียดหน้าจอ (Pages)

### 7.1 หน้าแรก (Home) - `/`

**Route:** `app/page.tsx`
**Component Type:** Client Component (`"use client"`)

| Section | รายละเอียด |
|---------|-----------|
| **Hero** | ข้อความต้อนรับ + ปุ่ม "เริ่มระบาย" |
| **Why Us** | จุดเด่น 3 ข้อ: ออนไลน์ 24 ชม., ไม่เปิดเผยตัวตน, ไม่ตัดสิน |
| **Resource Categories** | หมวดหมู่: สายด่วน, การจัดการความเครียด, บรรยากาศปลอดภัย |
| **Emergency Hotlines** | หมายเลขฉุกเฉิน 6 หมายเลข (1323, 1385, 02-713-6793, 1669, 1300, 1422) |
| **CTA** | ปุ่ม "พร้อมระบายแล้วหรือยัง" |
| **Footer** | ข้อมูลแบรนด์และลิงก์ |

### 7.2 ห้องระบาย (Vent Room) - `/vent`

**Route:** `app/vent/page.tsx`
**Component Type:** Client Component (`"use client"`)

| Section | รายละเอียด |
|---------|-----------|
| **Post Form** | แบบฟอร์มสร้างโพสต์: เลือกอารมณ์ (5 แบบ) + ช่องพิมพ์ + ปุ่มส่ง |
| **Post Feed** | รายการโพสต์ของผู้ใช้ (ข้อมูลจำลอง) |
| **Reply System** | ระบบตอบกลับ/ให้กำลังใจบนโพสต์ |
| **Sidebar** | สายด่วนฉุกเฉิน + แบบฝึกหัดหายใจ 4-4-4 + แหล่งข้อมูล |

**Mood Tags (อารมณ์):**
1. 😢 เศร้า (sad)
2. 😠 โกรธ (angry)
3. 😰 กังวล (worried)
4. 😫 เหนื่อยล้า (tired)
5. 💔 เจ็บปวด (hurt)

**ข้อมูลจำลอง (Mock Data):**
- โพสต์ตัวอย่าง 4 โพสต์ พร้อมคำตอบ
- ไม่มีการเก็บข้อมูลถาวร (หายเมื่อรีเฟรช)

### 7.3 แหล่งข้อมูล (Resources) - `/resources`

**Route:** `app/resources/page.tsx`
**Component Type:** Client Component (`"use client"`)

| Section | รายละเอียด |
|---------|-----------|
| **Emergency Banner** | หมายเลขฉุกเฉินแบบคลิกโทรได้ |
| **Breathing Tool** | เครื่องมือหายใจ 4-7-8 พร้อม animation และ countdown |
| **Daily Tips** | เคล็ดลับสุขภาพจิต 4 ข้อ |
| **Articles** | บทความพร้อมตัวกรอง 6 หมวดหมู่ |

**หมวดหมู่บทความ:**
1. ทั้งหมด (All)
2. ความเครียด (Stress)
3. ความวิตกกังวล (Anxiety)
4. การนอน (Sleep)
5. การมีสติ (Mindfulness)
6. ความสัมพันธ์ (Relationships)

**Breathing Exercise (4-7-8):**
- หายใจเข้า: 4 วินาที
- กลั้น: 7 วินาที
- หายใจออก: 8 วินาที
- Animation: วงกลมขยาย/หดตัว ด้วย Framer Motion

### 7.4 แบบทดสอบความเครียด (Quiz) - `/quiz`

**Route:** `app/quiz/page.tsx`
**Component Type:** Client Component (`"use client"`)

| Section | รายละเอียด |
|---------|-----------|
| **Questions** | คำถาม 5 ข้อ |
| **Progress Bar** | แถบแสดงความคืบหน้า |
| **Scoring** | 4 ระดับ: ไม่ค่อยมี / บางครั้ง / บ่อย / สม่ำเสมอ (0-3 คะแนน) |
| **Results** | 3 ระดับผลลัพธ์ |

**ผลลัพธ์:**

| คะแนน | ระดับ | ข้อความ |
|--------|-------|---------|
| 0-4 | ความเครียดต่ำ | "จิตใจของคุณยังคงแข็งแรงและน่ารัก" |
| 5-9 | ความเครียดปานกลาง | "หัวใจของคุณเริ่มแบกรับความเครียดสะสม" |
| 10-15 | ความเครียดสูง | "หัวใจของคุณเหนื่อยล้าและต้องการการดูแลเป็นพิเศษ" |

**คะแนนสูงสุด:** 15 คะแนน (5 คำถาม × 3 คะแนนสูงสุด)

---

## 8. รายละเอียดคอมโพเนนต์

### 8.1 Root Layout (`app/layout.tsx`)
- **Type:** Server Component
- **หน้าที่:** Root HTML structure, metadata, font loading
- **_children_** content slot
- ไม่ได้ใช้ Navbar.tsx โดยตรงใน layout (แต่ละหน้ามี nav ของตัวเอง)

### 8.2 Navbar (`components/Navbar.tsx`)
- **Type:** Client Component
- **หน้าที่:** แถบนำทางหลัก
- **Features:**
  - Emergency hotline banner ด้านบน
  - Desktop navigation links: Home, Vent, Resources
  - CTA button: "เริ่มระบาย"
  - Mobile hamburger menu (animated slide-down)

### 8.3 Button (`components/ui/button.tsx`)
- **Type:** shadcn/ui base-nova style
- **หน้าที่:** ปุ่มพื้นฐานของระบบ
- **Variants:** ใช้ `class-variance-authority` สำหรับ variant styling

### 8.4 Utils (`lib/utils.ts`)
- **ฟังก์ชัน:** `cn(...inputs)` - รวม class names ด้วย clsx + tailwind-merge
- **หน้าที่:** Utility สำหรับจัดการ CSS classes

---

## 9. โมเดลข้อมูล

### สถานะปัจจุบัน (Current State)
- ไม่มีฐานข้อมูล (No Database)
- ข้อมูลทั้งหมดเป็น Mock Data ใน React State
- ไม่มี API Routes
- ไม่มีการเก็บข้อมูลถาวร

### แผนพัฒนา (Future Schema)

#### ตาราง Posts
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| author_token | String | Guest identifier token |
| author_name | String | Display name |
| content | Text | Post content |
| emotion_tag | Enum | sad, angry, worried, tired, hurt |
| created_at | Timestamp | Creation date |
| reply_count | Integer | Number of replies |

#### ตาราง Comments
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Primary key |
| post_id | UUID | Foreign key to Posts |
| author_name | String | Display name |
| content | Text | Reply content |
| created_at | Timestamp | Creation date |

### แผนการใช้งาน localStorage
| Key | Type | Description |
|-----|------|-------------|
| guest_token | UUID | Guest identification token |
| guest_name | String | Random pseudonym |
| has_posted | Boolean | Whether guest has posted |
| has_replied | Boolean | Whether guest has replied |

---

## 10. ข้อกำหนดด้านความปลอดภัย

### 10.1 การไม่เปิดเผยตัวตน
- ไม่เก็บข้อมูลส่วนบุคคลที่สามารถระบุตัวตนได้
- ใช้ guest_token แทน user ID
- ชื่อที่แสดงเป็นชื่อสุ่ม (เช่น "เมฆฟ้า", "ดาวเหนือ")

### 10.2 ข้อมูลที่ไม่ควรเก็บ
- ไม่เก็บ IP address
- ไม่เก็บ browser fingerprint
- ไม่เก็บ cookies ที่สามารถระบุตัวตนได้

### 10.3 ข้อควรระวัง
- ไม่มีการ log ข้อมูลส่วนตัว
- ไม่ส่งข้อมูลไปยัง third-party analytics
- Content Security Policy ควรตั้งค่าในอนาคต

---

## 11. ข้อกำหนดด้านประสิทธิภาพ

### 11.1 Core Web Vitals

| Metric | เป้าหมาย |
|--------|---------|
| **LCP** (Largest Contentful Paint) | < 2.5 วินาที |
| **FID** (First Input Delay) | < 100 มิลลิวินาที |
| **CLS** (Cumulative Layout Shift) | < 0.1 |

### 11.2 Bundle Size
- ใช้ Tree-shaking โดยอัตโนมัติจาก Next.js
- Dynamic import สำหรับ heavy components (Framer Motion)
- Code splitting ผ่าน App Router

### 11.3 Responsive Design
- Mobile-first approach
- Breakpoint: sm (640px), md (768px), lg (1024px)
- Touch-friendly UI elements (min 44px tap target)

---

## 12. แผนผังการเชื่อมต่อระหว่างหน้า

```
                    ┌──────────┐
                    │   Home   │
                    │   (/)    │
                    └────┬─────┘
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │   Vent   │  │   Quiz   │  │Resources │
    │  (/vent) │  │  (/quiz) │  │(/resources)│
    └──────────┘  └──────────┘  └──────────┘
          │              │              │
          └──────────────┼──────────────┘
                         │
                         ▼
                    ┌──────────┐
                    │ Emergency │
                    │ Hotlines  │
                    │ (tel:)    │
                    └──────────┘
```

**Navigation Flow:**
- Home → Vent Room (via "เริ่มระบาย" button)
- Home → Quiz (via resource categories)
- Home → Resources (via resource categories)
- Vent Room → Emergency Hotlines (sidebar)
- Quiz → Resources (after result)
- Quiz → Vent Room (after result)
- Resources → Emergency Hotlines (banner)
- ทุกหน้า → หน้าอื่นๆ ผ่าน Navbar

---

## 13. สถานะปัจจุบันและแผนพัฒนา

### 13.1 สถานะปัจจุบัน (MVP)

| สถานะ | รายละเอียด |
|-------|-----------|
| ✅ ทำแล้ว | หน้าแรก พร้อม Hero + CTA |
| ✅ ทำแล้ว | ห้องระบาย (Vent) พร้อม mock data |
| ✅ ทำแล้ว | แหล่งข้อมูล (Resources) พร้อม breathing tool |
| ✅ ทำแล้ว | แบบทดสอบความเครียด (Quiz) |
| ✅ ทำแล้ว | Navbar responsive + mobile menu |
| ✅ ทำแล้ว | ระบบ design system (สี, ฟอนต์, spacing) |
| ✅ ทำแล้ว | Framer Motion animations |

### 13.2 แผนพัฒนา (Future)

| Phase | ฟีเจอร์ | สถานะ |
|-------|---------|-------|
| **Phase 1** | localStorage สำหรับ guest token | 🔲 วางแผน |
| **Phase 1** | จำกัดจำนวนโพสต์ (1 โพสต์/คน) | 🔲 วางแผน |
| **Phase 2** | API Routes สำหรับ CRUD | 🔲 วางแผน |
| **Phase 2** | Database (Prisma + PostgreSQL หรือ Supabase) | 🔲 วางแผน |
| **Phase 3** | ระบบยืนยันตัวตน (Guest → Member) | 🔲 วางแผน |
| **Phase 3** | Listener role (อาสาสมัคร) | 🔲 วางแผน |
| **Phase 4** | Admin backoffice (/backoffice) | 🔲 วางแผน |
| **Phase 4** | Content management | 🔲 วางแผน |

### 13.3 แผนผัง Roles (ตาม ROLES-MANAGEMENT.md)

| Role | สิทธิ์ |
|------|--------|
| **Guest** | โพสต์ 1 ครั้ง, ตอบกลับ 1 ครั้ง, ทำ quiz, ดู resources |
| **Member** | เหมือน Guest + โพสต์/ตอบกลับได้มากขึ้น + ดูประวัติ |
| **Listener** | ตอบกลับโพสต์ได้มากขึ้น + verified badge |
| **Admin** | จัดการเนื้อหา + ดูข้อมูล + ลบโพสต์ |

---

## 14. ข้อกำหนดด้านการทดสอบ

### 14.1 สถานะปัจจุบัน
- ไม่มี test framework ที่ติดตั้ง
- ไม่มี test files
- `.gitignore` มี `/coverage` directory (วางแผนไว้)

### 14.2 แผนการทดสอบในอนาคต

| ประเภท | เครื่องมือ | ขอบเขต |
|--------|-----------|--------|
| **Unit Tests** | Jest / Vitest | Utility functions, components |
| **Integration Tests** | React Testing Library | Component interactions |
| **E2E Tests** | Playwright / Cypress | User flows |
| **Visual Regression** | Chromatic / Percy | UI consistency |
| **Performance** | Lighthouse | Core Web Vitals |

### 14.3 Test Cases ที่ควรเขียน

**Home Page:**
- แสดง Hero section ถูกต้อง
- แสดงหมายเลขฉุกเฉินครบ 6 หมายเลข
- ลิงก์โทร (`tel:`) ทำงานถูกต้อง

**Vent Room:**
- สร้างโพสต์ใหม่ได้
- เลือก mood tag ได้ 5 แบบ
- ตอบกลับโพสต์ได้
- โพสต์แสดงผลถูกต้อง

**Quiz:**
- ทำ quiz ครบ 5 ข้อ
- แสดง progress bar ถูกต้อง
- คำนวณคะแนนถูกต้อง
- แสดงผลลัพธ์ตามช่วงคะแนน

**Resources:**
- Breathing tool ทำงาน (timer 4-7-8)
- ตัวกรองบทความทำงาน
- ลิงก์โทรฉุกเฉินทำงาน

---

## 15. แผนผังการ Deploy

### 15.1 แพลตฟอร์ม
- **Vercel** (default configuration)

### 15.2 Build Commands

```bash
# Development
npm run dev

# Production Build
npm run build

# Production Start
npm run start

# Linting
npm run lint
```

### 15.3 Configuration Files

| File | หน้าที่ |
|------|--------|
| `next.config.ts` | Next.js configuration (default) |
| `tsconfig.json` | TypeScript config (strict, ES2017) |
| `postcss.config.mjs` | PostCSS + Tailwind v4 |
| `eslint.config.mjs` | ESLint flat config |
| `components.json` | shadcn/ui config (base-nova) |

### 15.4 Environment Variables
- ปัจจุบันไม่มี environment variables
- ในอนาคตจะต้องมี:
  - `DATABASE_URL` - PostgreSQL/Supabase connection
  - `NEXTAUTH_SECRET` - Authentication secret
  - `NEXTAUTH_URL` - Application URL

---

## 附錄

### A. หมายเลขสายด่วนฉุกเฉิน

| หมายเลข | ชื่อ |
|---------|------|
| 1323 | สายด่วนสุขภาพจิต |
| 1385 | สายด่วนเด็กและเยาวชน |
| 02-713-6793 | สมาคมสะมาริตัน |
| 1669 | สถาบันการแพทย์ฉุกเฉิน |
| 1300 | สายด่วนสุขภาพจิต กรมสุขภาพจิต |
| 1422 | สายด่วนสุขภาพจิต |

### B. คำศัพท์

| คำ | ความหมาย |
|----|---------|
| **Vent** | การระบายความรู้สึก |
| **Mood Tag** | ป้ายอารมณ์ |
| **Mock Data** | ข้อมูลจำลองสำหรับทดสอบ |
| **Guest Token** | ตัวระบุผู้ใช้ชั่วคราว |
| **Breathing Exercise** | แบบฝึกหัดหายใจ |
| **Stress Assessment** | การประเมินความเครียด |

---

*เอกสารฉบับนี้สร้างขึ้นเมื่อ: กรกฎาคม 2569*
*เวอร์ชัน: 1.0*
*สถานะ: Draft*
