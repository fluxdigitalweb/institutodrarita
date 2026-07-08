import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, animate, AnimatePresence } from "framer-motion";
import {
  Brain,
  HeartPulse,
  Dumbbell,
  Target,
  Menu,
  X,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Check,
  Shield,
  Award,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import heroAsset from "@/assets/aula-pizarron.jpg.asset.json";
import directorAsset from "@/assets/directora.jpg.asset.json";
import kureszaAsset from "@/assets/kuresza.jpeg.asset.json";
import purposeAsset from "@/assets/clase-grupo.jpg.asset.json";
import entrenamientoAsset from "@/assets/entrenamiento.jpg.asset.json";
import logoAsset from "@/assets/logoacademia.png.asset.json";
import groupParkAsset from "@/assets/group-park.jpeg.asset.json";
import trainingConesAsset from "@/assets/training-cones.jpeg.asset.json";
import flyerAsset from "@/assets/flyer-2027.jpeg.asset.json";
import clasePizarronAsset from "@/assets/clase-pizarron.png.asset.json";
import video1 from "@/assets/video1.mp4.asset.json";
import video2 from "@/assets/video2.mp4.asset.json";
import video3 from "@/assets/video3.mp4.asset.json";
import video4 from "@/assets/video4.mp4.asset.json";
import video5 from "@/assets/video5.mp4.asset.json";
import video6 from "@/assets/training-1.mp4.asset.json";
import video7 from "@/assets/training-2.mp4.asset.json";
import enfeGrupoAsset from "@/assets/enfe-2022-grupo.jpeg.asset.json";
import enfeBanderaAsset from "@/assets/enfe-2022-bandera.jpeg.asset.json";
import enfePanoramicaAsset from "@/assets/enfe-2022-panoramica.jpeg.asset.json";
import enfe2021Asset from "@/assets/enfe-2021-segundo.png.asset.json";
import enfeDocAsset from "@/assets/enfe-2022-documento.pdf.asset.json";
import manifiestoAsset from "@/assets/manifiesto-educacion.pdf.asset.json";

const heroImg = heroAsset.url;
const directorImg = directorAsset.url;
const kureszaImg = kureszaAsset.url;
const purposeImg = purposeAsset.url;
const entrenamientoImg = entrenamientoAsset.url;
const logoImg = logoAsset.url;
const flyerImg = flyerAsset.url;
const GALLERY_VIDEOS = [video1.url, video2.url, video3.url, video4.url];
const GALLERY_IMAGES = [purposeAsset.url, groupParkAsset.url, trainingConesAsset.url, clasePizarronAsset.url];

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      {
        property: "og:image",
        content:
          "https://id-preview--787a051d-f271-4a24-a860-fa0fa3a5a0d5.lovable.app/og.jpg",
      },
    ],
  }),
});

/* ---------- Constants ---------- */

const WHATSAPP_NUMBER = "5493855000000"; // placeholder AR
const WHATSAPP_MSG_INFO = encodeURIComponent(
  "Hola, quiero solicitar información sobre orientación vocacional y entrenamiento cognitivo con la Lic. Natalia Kuresza (M.P. N° 962).",
);
const WHATSAPP_MSG_ENTREVISTA = encodeURIComponent(
  "Hola, quiero agendar una entrevista para orientación vocacional y entrenamiento cognitivo con la Lic. Natalia Kuresza (M.P. N° 962).",
);
const WA_URL_INFO = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_INFO}`;
const WA_URL_ENTREVISTA = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG_ENTREVISTA}`;
const WA_URL = WA_URL_INFO;

const NAV = [
  { href: "#servicios", label: "Servicios" },
  { href: "#diferenciales", label: "Diferenciales" },
  { href: "#galeria", label: "Instituto" },
  { href: "#direccion", label: "Dirección" },
  { href: "#proceso", label: "Proceso" },
  { href: "#testimonios", label: "Testimonios" },
  { href: "#contacto", label: "Contacto" },
];

/* ---------- Reusable primitives ---------- */

function FadeIn({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="crest-divider text-xs uppercase tracking-[0.28em] font-medium">
      {children}
    </span>
  );
}

function PrimaryButton({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "crimson";
}) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-sm px-7 py-4 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-300 will-change-transform";
  const styles = {
    primary:
      "bg-navy-deep text-white hover:bg-navy hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--navy-deep)_60%,transparent)]",
    outline:
      "border border-navy-deep/30 text-navy-deep hover:bg-navy-deep hover:text-white hover:-translate-y-0.5",
    crimson:
      "bg-crimson text-white hover:bg-crimson/90 hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_color-mix(in_oklab,var(--crimson)_60%,transparent)]",
  }[variant];
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ---------- Loading overlay ---------- */

function Loader({ done }: { done: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      style={{ pointerEvents: done ? "none" : "auto" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-navy-deep"
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex h-24 w-24 items-center justify-center"
        >
          <img src={logoImg} alt="Instituto Juan B. Alberdi" className="h-24 w-24 object-contain drop-shadow-[0_0_24px_rgba(216,195,165,0.35)]" />
        </motion.div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div className="h-full w-full bg-beige loading-bar !static" />
        </div>
        <p className="text-[11px] uppercase tracking-[0.4em] text-beige/80">
          Instituto de Apoyo Académico
        </p>
      </div>
    </motion.div>
  );
}

/* ---------- Navbar ---------- */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-navy-deep/95 backdrop-blur-md border-b border-white/5 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 text-white">
          <div className="flex h-11 w-11 items-center justify-center">
            <img src={logoImg} alt="Logo Instituto" className="h-11 w-11 object-contain" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg">Instituto de Apoyo Académico</div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-beige/80">
              Est. 2000 · Santiago del Estero
            </div>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-white/80 hover:text-beige transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-beige after:transition-all hover:after:w-full"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-sm border border-beige/50 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-beige hover:bg-beige hover:text-navy-deep transition-all"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            Consultar
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden text-white p-2"
          aria-label="Menú"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep border-t border-white/5">
          <div className="container-x py-6 flex flex-col gap-4">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-beige py-2 border-b border-white/5 text-sm"
              >
                {n.label}
              </a>
            ))}
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-beige px-5 py-3 text-xs uppercase tracking-[0.2em] text-navy-deep"
            >
              <MessageCircle className="h-4 w-4" /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  return (
    <section
      id="top"
      className="relative min-h-screen bg-navy-deep text-white overflow-hidden pt-28 lg:pt-0 flex items-center"
    >
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep/95 to-black/60" />

      <div className="container-x relative grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-16 items-center py-16 lg:py-32">
        <div className="min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-beige/30 bg-white/[0.03] px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-beige"
          >
            <Award className="h-3.5 w-3.5" />
            25 años formando aspirantes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] text-balance"
          >
            Instituto de{" "}
            <span className="italic text-beige">Apoyo Académico</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 text-sm uppercase tracking-[0.3em] text-beige/90"
          >
            Un espacio de nivelación y entrenamiento
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-6 max-w-xl text-base lg:text-lg text-white/75 leading-relaxed"
          >
            Preparación especializada para el ingreso a las fuerzas de seguridad.
            Programa integral que forma aspirantes capaces de superar:
          </motion.p>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-5 space-y-2 text-white/80 text-sm"
          >
            {[
              "Exámenes intelectuales",
              "Evaluaciones psicológicas",
              "Pruebas físicas obligatorias",
            ].map((t) => (
              <li key={t} className="flex items-center gap-3">
                <span className="h-px w-6 bg-beige/60" />
                {t}
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={WA_URL_INFO}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm bg-beige px-8 py-4 text-xs uppercase tracking-[0.2em] text-navy-deep hover:bg-white transition-all hover:-translate-y-0.5 shadow-[0_15px_40px_-15px_color-mix(in_oklab,var(--beige)_80%,transparent)]"
            >
              Solicitar información
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={WA_URL_ENTREVISTA}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm border border-white/25 px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:border-beige hover:text-beige transition-all"
            >
              Agendar entrevista
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={flyerImg}
              alt="Aspirantes a las fuerzas de seguridad en formación"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/70 via-transparent to-transparent" />
            <div className="absolute inset-0 ring-1 ring-inset ring-beige/20" />
          </div>
          {/* Floating stat card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="absolute -left-6 bottom-10 w-64 bg-white text-navy-deep p-6 rounded-sm shadow-elegant"
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-navy/60">
              Índice de resultados
            </div>
            <div className="mt-2 font-display text-4xl">+1000</div>
            <div className="mt-1 text-xs text-navy/70">
              Aspirantes preparados en 25 años de trayectoria.
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-beige/60">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="h-10 w-px bg-beige/40 animate-pulse" />
      </div>
    </section>
  );
}

/* ---------- Servicios ---------- */

const SERVICES = [
  {
    icon: Brain,
    title: "Evaluación intelectual",
    text: "Preparación académica intensiva para exámenes de ingreso.",
  },
  {
    icon: HeartPulse,
    title: "Orientación vocacional y entrenamiento cognitivo",
    text: "Lic. Natalia Kuresza · M.P. N° 962",
  },
  {
    icon: Dumbbell,
    title: "Preparación física",
    text: "Guía y entrenamiento para pruebas físicas obligatorias.",
  },
  {
    icon: Target,
    title: "Entrenamiento integral",
    text: "Simulación completa del proceso de ingreso.",
  },
];

function Servicios() {
  return (
    <section id="servicios" className="py-28 lg:py-36 bg-white">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-2xl">
            <SectionEyebrow>Programa</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance">
              Preparación integral para tu ingreso
            </h2>
            <p className="mt-5 text-navy/70 leading-relaxed">
              Cada aspirante recibe una formación completa que cubre las tres
              instancias evaluativas del proceso de admisión.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.08}>
              <div className="group relative h-full bg-beige-light/40 border border-beige/40 rounded-sm p-8 transition-all duration-500 hover:bg-navy-deep hover:border-navy-deep hover:-translate-y-2 hover:shadow-elegant">
                <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-navy-deep text-beige transition-colors duration-500 group-hover:bg-beige group-hover:text-navy-deep">
                  <s.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-8 font-display text-2xl text-navy-deep transition-colors group-hover:text-white">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm text-navy/70 leading-relaxed transition-colors group-hover:text-white/70">
                  {s.text}
                </p>
                <div className="mt-8 h-px w-8 bg-navy-deep/30 transition-all duration-500 group-hover:w-full group-hover:bg-beige" />
                <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-navy/50 transition-colors group-hover:text-beige">
                  0{i + 1} · Módulo
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Diferenciales / Stats ---------- */

const STATS = [
  { num: 25, suffix: "+", label: "Años de experiencia" },
  { num: 1000, suffix: "+", label: "Aspirantes preparados" },
  { num: 100, suffix: "%", label: "Método probado" },
  { num: 3, suffix: "", label: "Áreas de formación" },
];

function Diferenciales() {
  return (
    <section
      id="diferenciales"
      className="relative py-28 lg:py-40 bg-navy-deep text-white overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--beige) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="container-x relative">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>Diferenciales</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-balance">
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Un cuarto de siglo de rigor, método y resultados que hablan por sí solos.
            </p>
          </div>
        </FadeIn>

        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-y-14 gap-x-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.1}>
              <div className="text-center border-t border-beige/20 pt-8">
                <div className="font-display text-5xl lg:text-6xl text-beige tabular-nums">
                  <Counter to={s.num} suffix={s.suffix} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.25em] text-white/70">
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Propósito ---------- */

function Proposito() {
  return (
    <section className="py-28 lg:py-36 bg-muted">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <FadeIn>
          <div className="relative aspect-[5/4] overflow-hidden rounded-sm">
            <img
              src={purposeImg}
              alt="Aula institucional"
              width={1280}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-navy-deep/10" />
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <SectionEyebrow>Nuestro propósito</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance leading-[1.05]">
            Formamos aspirantes preparados para{" "}
            <span className="italic text-crimson">construir su futuro</span>.
          </h2>
          <p className="mt-6 text-navy/75 leading-relaxed text-lg">
            Formando aspirantes comprometidos con el estudio y la
            responsabilidad de adquirir herramientas intelectuales para toda la
            vida.
          </p>
          <div className="mt-8 flex items-center gap-4 text-navy-deep">
            <div className="h-px w-12 bg-navy-deep/30" />
            <span className="text-xs uppercase tracking-[0.25em]">
              Vocación · Disciplina · Excelencia
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Dirección ---------- */

const CREDENTIALS = [
  "Analista en Gestión Educativa",
  "Licenciada en Gestión Educativa",
  "Egresada de Escuela de Innovación Educativa UNSE Santiago del Estero",
  "Procuradora",
  "Abogada egresada de Universidad Nacional de Tucumán",
  "Ex coordinadora provincial Argentinos por la Educación",
  "Ex coordinadora Familias por la Educación Santiago del Estero",
];

function Direccion() {
  return (
    <section id="direccion" className="py-28 lg:py-36 bg-white">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>Dirección académica</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep">
              Al frente de la institución
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 mx-auto max-w-6xl bg-beige-light/50 border border-beige/50 rounded-sm overflow-hidden grid lg:grid-cols-[420px_1fr]">
            <div className="relative bg-navy-deep">
              <img
                src={directorImg}
                alt="Dra. Rita Artaza"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] text-beige">
                  Directora
                </div>
                <div className="mt-1 font-display text-3xl">Dra. Rita Artaza</div>
              </div>
            </div>

            <div className="p-8 lg:p-14">
              <div className="inline-flex items-center gap-2 text-crimson text-[11px] uppercase tracking-[0.25em]">
                <Award className="h-3.5 w-3.5" /> 25 años de ejercicio profesional
              </div>
              <h3 className="mt-4 font-display text-3xl lg:text-4xl text-navy-deep leading-tight">
                Una trayectoria consagrada a la formación y la gestión educativa.
              </h3>

              <ul className="mt-8 space-y-3">
                {CREDENTIALS.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-navy/80 text-sm">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                    {c}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-l-2 border-crimson pl-5">
                <p className="font-display text-xl italic text-navy-deep">
                  “25 años de ejercicio profesional ininterrumpido al servicio
                  de quienes eligen prepararse con seriedad.”
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Orientación Vocacional ---------- */

const KURESZA_PILARES = [
  "Terapia cognitiva conductual",
  "Diplomada en Psicodiagnóstico Clínico",
  "Posgrado en Neuropsicología",
];

function OrientacionVocacional() {
  return (
    <section id="orientacion" className="py-28 lg:py-36 bg-beige-light/30">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>Área complementaria</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep">
              Orientación Vocacional y Entrenamiento Cognitivo
            </h2>
            <p className="mt-5 text-navy/70 leading-relaxed">
              Acompañamiento profesional para potenciar el desarrollo cognitivo,
              emocional y vocacional de cada aspirante.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-16 mx-auto max-w-6xl bg-white border border-beige/50 rounded-sm overflow-hidden grid lg:grid-cols-[420px_1fr] shadow-elegant">
            <div className="relative bg-navy-deep">
              <img
                src={kureszaImg}
                alt="Lic. Natalia Kuresza"
                width={828}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover aspect-[4/5]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-[10px] uppercase tracking-[0.3em] text-beige">
                  Psicóloga
                </div>
                <div className="mt-1 font-display text-3xl">Lic. Natalia Kuresza</div>
                <div className="mt-1 text-xs text-beige/80 tracking-wide">
                  M.P. N° 962
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-14">
              <div className="inline-flex items-center gap-2 text-crimson text-[11px] uppercase tracking-[0.25em]">
                <Brain className="h-3.5 w-3.5" /> Evaluación · Diagnóstico · Tratamiento
              </div>
              <h3 className="mt-4 font-display text-3xl lg:text-4xl text-navy-deep leading-tight">
                Un acompañamiento clínico y cognitivo para el aspirante integral.
              </h3>
              <p className="mt-5 text-navy/70 leading-relaxed">
                Evaluación, diagnóstico y tratamiento orientados a fortalecer las
                capacidades intelectuales, emocionales y vocacionales necesarias
                para afrontar el proceso de ingreso.
              </p>

              <div className="mt-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-navy/50">
                  Pilares de mi formación
                </div>
                <ul className="mt-5 space-y-3">
                  {KURESZA_PILARES.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-navy/80 text-sm">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-crimson" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 border-l-2 border-crimson pl-5">
                <p className="font-display text-xl italic text-navy-deep">
                  “El entrenamiento cognitivo y la orientación vocacional son
                  claves para construir un ingreso sólido y sostenido.”
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const BENEFITS = [
  "Atención personalizada",
  "Seguimiento individual",
  "Formación académica sólida",
  "Preparación enfocada en resultados",
  "Método probado",
  "Entrenamiento orientado al ingreso real",
];

function Beneficios() {
  return (
    <section className="py-28 lg:py-36 bg-muted">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-2xl">
            <SectionEyebrow>Beneficios</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance">
              Un equipo docente de primer nivel
            </h2>
          </div>
        </FadeIn>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
          {BENEFITS.map((b, i) => (
            <FadeIn key={b} delay={i * 0.05}>
              <div className="group flex items-center gap-4 border-b border-navy-deep/10 py-5 hover:border-crimson transition-colors">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-deep text-beige group-hover:bg-crimson group-hover:text-white transition-colors">
                  <Check className="h-4 w-4" />
                </div>
                <span className="font-display text-xl text-navy-deep">{b}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Proceso ---------- */

const STEPS = [
  { t: "Entrevista inicial", d: "Primer encuentro para conocerte y comprender tus objetivos." },
  { t: "Diagnóstico del aspirante", d: "Evaluamos fortalezas y áreas a fortalecer." },
  { t: "Plan personalizado", d: "Diseñamos una hoja de ruta adaptada a tu caso." },
  { t: "Entrenamiento intensivo", d: "Preparación académica, psicológica y física en paralelo." },
  { t: "Preparación final para ingreso", d: "Simulacros y ajustes finales antes del examen." },
  { t: "Objetivo cumplido", d: "Ingreso a la fuerza de seguridad elegida." },
];

function Proceso() {
  return (
    <section id="proceso" className="py-28 lg:py-36 bg-white">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-2xl">
            <SectionEyebrow>Proceso</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance">
              Del primer contacto al ingreso
            </h2>
          </div>
        </FadeIn>

        <div className="mt-16 relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-navy-deep/15 -translate-x-0 lg:-translate-x-1/2" />
          <div className="space-y-12 lg:space-y-20">
            {STEPS.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <FadeIn key={s.t} delay={0.05}>
                  <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
                    <div className={`${left ? "lg:order-1 lg:text-right" : "lg:order-2"} pl-12 lg:pl-0`}>
                      <div className="text-[11px] uppercase tracking-[0.3em] text-crimson">
                        Paso 0{i + 1}
                      </div>
                      <h3 className="mt-3 font-display text-2xl lg:text-3xl text-navy-deep">
                        {s.t}
                      </h3>
                      <p className="mt-3 text-navy/70 max-w-md lg:inline-block">
                        {s.d}
                      </p>
                    </div>
                    <div className={`${left ? "lg:order-2" : "lg:order-1"} relative`}>
                      <div className="absolute left-4 lg:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-navy-deep text-beige text-xs font-medium ring-8 ring-white">
                        {i + 1}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonios ---------- */

const TESTS = [
  {
    q: "Llegué sin preparación y pude aprobar todo el proceso.",
    a: "Martín G.",
    r: "Ingresante 2024",
  },
  {
    q: "El acompañamiento fue clave para ingresar con seguridad.",
    a: "Lucía P.",
    r: "Ingresante 2023",
  },
  {
    q: "Excelente preparación académica y acompañamiento permanente.",
    a: "Diego R.",
    r: "Ingresante 2024",
  },
];

function Testimonios() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % TESTS.length), 5500);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="testimonios" className="py-28 lg:py-36 bg-beige-light/40">
      <div className="container-x">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto">
            <SectionEyebrow>Testimonios</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep">
              La voz de quienes ingresaron
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-14 mx-auto max-w-3xl relative">
            <div className="bg-white rounded-sm p-10 lg:p-14 shadow-card min-h-[280px] flex flex-col justify-center">
              <div className="font-display text-6xl text-beige leading-none">“</div>
              <motion.blockquote
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-2 font-display text-2xl lg:text-3xl text-navy-deep leading-snug"
              >
                {TESTS[i].q}
              </motion.blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="h-px w-10 bg-crimson" />
                <div>
                  <div className="text-navy-deep font-medium">{TESTS[i].a}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-navy/60">
                    {TESTS[i].r}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-2">
              {TESTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setI(idx)}
                  className={`h-1 rounded-full transition-all ${
                    idx === i ? "w-10 bg-navy-deep" : "w-4 bg-navy-deep/25"
                  }`}
                  aria-label={`Testimonio ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Ubicación ---------- */

function Ubicacion() {
  return (
    <section id="ubicacion" className="py-28 lg:py-36 bg-white">
      <div className="container-x grid lg:grid-cols-[1fr_1.2fr] gap-12 items-center">
        <FadeIn>
          <SectionEyebrow>Ubicación</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance">
            Santiago del Estero, Argentina.
          </h2>
          <p className="mt-5 text-navy/70 leading-relaxed">
            Nuestras instalaciones están pensadas para el estudio serio, el
            entrenamiento y la formación integral de cada aspirante.
          </p>
          <div className="mt-8 flex items-center gap-3 text-navy-deep">
            <MapPin className="h-5 w-5 text-crimson" />
            <span className="text-sm">Santiago del Estero · Argentina</span>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Santiago+del+Estero+Argentina"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm bg-navy-deep px-7 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-navy transition-all hover:-translate-y-0.5"
            >
              Cómo llegar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-navy-deep/10 shadow-card">
            <iframe
              title="Mapa Santiago del Estero"
              src="https://www.google.com/maps?q=Santiago+del+Estero,+Argentina&output=embed"
              className="absolute inset-0 h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- ENFE 2022 ---------- */

function ENFECarousel({ images }: { images: { src: string; alt: string }[] }) {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((i) => (i + 1) % images.length);
  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="mt-14 relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-navy-deep/10 shadow-card">
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
      </div>

      <button
        onClick={prev}
        aria-label="Imagen anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 border border-navy-deep/10 shadow-md flex items-center justify-center text-navy-deep hover:bg-white hover:scale-105 transition-all"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        aria-label="Imagen siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-white/90 border border-navy-deep/10 shadow-md flex items-center justify-center text-navy-deep hover:bg-white hover:scale-105 transition-all"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-5 flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ver imagen ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-navy-deep" : "w-2 bg-navy-deep/30 hover:bg-navy-deep/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function ENFE2022() {
  const images = [
    { src: enfePanoramicaAsset.url, alt: "Panorámica del ENFE 2022 en el Monumento a la Bandera, Rosario" },
    { src: enfeGrupoAsset.url, alt: "Grupo de participantes del ENFE 2022 con la bandera Familias por la Educación" },
    { src: enfeBanderaAsset.url, alt: "Bandera Encuentro Nacional Familias por la Educación desplegada" },
    { src: enfe2021Asset.url, alt: "Segundo Encuentro Nacional Familias por la Educación 2021" },
  ];
  return (
    <section id="enfe-2022" className="py-28 lg:py-36 bg-beige-light/40">
      <div className="container-x">
        <FadeIn>
          <SectionEyebrow>Octubre 2022 · Rosario</SectionEyebrow>
          <h2 className="mt-6 font-display text-4xl lg:text-5xl text-navy-deep text-balance max-w-4xl">
            ENFE — Encuentro Nacional Familias por la Educación
          </h2>
          <p className="mt-6 text-navy/70 leading-relaxed max-w-3xl">
            En octubre de 2022 participamos del Encuentro Nacional de Familias
            por la Educación en la ciudad de Rosario, junto al Monumento a la
            Bandera. Un espacio de intercambio entre familias, docentes e
            instituciones comprometidas con transformar la educación argentina.
          </p>
        </FadeIn>

        <ENFECarousel images={images} />

        <FadeIn delay={0.2}>
          <div className="mt-14 grid md:grid-cols-2 gap-5">
            <a
              href={manifiestoAsset.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-5 p-7 bg-white rounded-sm border border-navy-deep/10 shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="shrink-0 h-12 w-12 rounded-sm bg-crimson/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-crimson" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.2em] text-navy/60">Documento</div>
                <div className="mt-1 font-display text-xl text-navy-deep">Manifiesto por la Educación</div>
                <div className="mt-2 text-sm text-navy/70">Descargar PDF</div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-deep transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={enfeDocAsset.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-start gap-5 p-7 bg-white rounded-sm border border-navy-deep/10 shadow-card hover:-translate-y-0.5 transition-all"
            >
              <div className="shrink-0 h-12 w-12 rounded-sm bg-crimson/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-crimson" />
              </div>
              <div className="flex-1">
                <div className="text-xs uppercase tracking-[0.2em] text-navy/60">Documento</div>
                <div className="mt-1 font-display text-xl text-navy-deep">Registro del Encuentro</div>
                <div className="mt-2 text-sm text-navy/70">Descargar PDF</div>
              </div>
              <ArrowRight className="h-5 w-5 text-navy-deep transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- CTA final ---------- */

function CTAFinal() {
  return (
    <section
      id="contacto"
      className="relative py-32 lg:py-40 bg-navy-deep text-white overflow-hidden"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-96 w-[900px] rounded-full bg-crimson/20 blur-[120px]" />
      <div className="container-x relative text-center max-w-3xl mx-auto">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-crimson/40 bg-crimson/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.25em] text-beige">
            <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
            Inscripciones abiertas
          </div>
          <h2 className="mt-8 font-display text-5xl lg:text-7xl leading-[1] text-balance">
            Tu ingreso comienza{" "}
            <span className="italic text-beige">hoy</span>.
          </h2>
          <p className="mt-6 text-white/75 text-lg leading-relaxed">
            Comenzá tu preparación con profesionales que llevan más de 25 años
            formando aspirantes al ingreso a las fuerzas de seguridad.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href={WA_URL_INFO}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm bg-crimson px-8 py-4 text-xs uppercase tracking-[0.2em] text-white hover:bg-crimson/90 transition-all hover:-translate-y-0.5 shadow-[0_15px_40px_-15px_color-mix(in_oklab,var(--crimson)_80%,transparent)]"
            >
              <MessageCircle className="h-4 w-4" /> Solicitar información
            </a>
            <a
              href={WA_URL_ENTREVISTA}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-sm border border-beige/50 px-8 py-4 text-xs uppercase tracking-[0.2em] text-beige hover:bg-beige hover:text-navy-deep transition-all"
            >
              Agendar entrevista
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x py-16 grid gap-12 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3 text-white">
            <div className="flex h-11 w-11 items-center justify-center">
              <img src={logoImg} alt="Logo Instituto" className="h-11 w-11 object-contain" />
            </div>
            <div className="font-display text-lg">Instituto de Apoyo Académico</div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed">
            25 años preparando aspirantes al ingreso a las fuerzas de seguridad
            en Argentina. Formación seria, personalizada y con método probado.
          </p>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-beige">
            Enlaces
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-beige transition-colors">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.25em] text-beige">
            Contacto
          </div>
          <ul className="mt-5 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <MessageCircle className="h-4 w-4 text-beige" />
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="hover:text-beige"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-beige" />
              <a href="#" className="hover:text-beige">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-beige" />
              <a
                href="mailto:contacto@institutoapoyo.com.ar"
                className="hover:text-beige"
              >
                contacto@institutoapoyo.com.ar
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-beige" />
              Santiago del Estero, Argentina
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-white/50">
          <div>
            © {new Date().getFullYear()} Instituto de Apoyo Académico. Todos los
            derechos reservados.
          </div>
          <div className="uppercase tracking-[0.25em]">Est. 2000</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Floating WhatsApp ---------- */

function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed bottom-6 right-6 z-40 group flex items-center gap-3 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-white shadow-[0_20px_40px_-10px_rgba(37,211,102,0.5)] hover:scale-105 transition-transform"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-medium">Consultar</span>
    </a>
  );
}

/* ---------- Galería ---------- */

function Galeria() {
  return (
    <section id="galeria" className="py-28 lg:py-36 bg-ink text-white overflow-hidden">
      <div className="container-x">
        <FadeIn>
          <div className="max-w-2xl">
            <SectionEyebrow>El instituto en acción</SectionEyebrow>
            <h2 className="mt-6 font-display text-4xl lg:text-5xl text-balance">
              Formación real, resultados reales.
            </h2>
            <p className="mt-5 text-white/70 leading-relaxed">
              Momentos de nuestras clases, entrenamiento físico y trabajo diario con los aspirantes.
            </p>
          </div>
        </FadeIn>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((src, i) => (
            <FadeIn key={src} delay={i * 0.06}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm group">
                <img
                  src={src}
                  alt={`Instituto ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-beige/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_VIDEOS.map((src, i) => (
            <FadeIn key={src} delay={i * 0.06}>
              <div className="relative aspect-video overflow-hidden rounded-sm bg-navy-deep ring-1 ring-inset ring-beige/20">
                <video
                  src={src}
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                <div className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.25em] text-beige/90 bg-ink/60 px-2 py-1 rounded-sm">
                  Clip 0{i + 1}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}



function LandingPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Loader done={loaded} />
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Diferenciales />
        <Galeria />
        <Proposito />
        <Direccion />
        <OrientacionVocacional />
        <Beneficios />
        <Proceso />
        <Testimonios />
        <ENFE2022 />
        <Ubicacion />
        <CTAFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
