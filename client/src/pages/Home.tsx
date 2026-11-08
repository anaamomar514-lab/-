import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowDown,
  ArrowUpLeft,
  ArrowUpRight,
  Clock3,
  GraduationCap,
  Mail,
  Menu,
  Phone,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AssetCard } from "@/components/portfolio/AssetCard";
import { AssetPreviewDialog } from "@/components/portfolio/AssetPreviewDialog";
import { BrandMark } from "@/components/portfolio/BrandMark";
import { MusicPlayer } from "@/components/portfolio/MusicPlayer";
import { portfolioAssets, portfolioCategories, type PortfolioAsset } from "@/data/portfolio";
import { profile } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

const DECORATIVE_ART_URL = "";
const MUSIC_URL = "/manus-storage/bayan-original-ambient_b977470f.mp3";
const INITIAL_ITEMS = 9;
const navigation = [
  { href: "#home", label: "الرئيسية" },
  { href: "#about", label: "عن بيان" },
  { href: "#skills", label: "المهارات" },
  { href: "#work", label: "الأعمال" },
  { href: "#contact", label: "التواصل" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("images");
  const [showAll, setShowAll] = useState(false);
  const [activeAsset, setActiveAsset] = useState<PortfolioAsset | null>(null);
  const { enabled: soundEnabled, volume, setVolume, toggleEnabled, playCue } = useSoundEffects();

  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    document.documentElement.classList.add("has-reveal-observer");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });
    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("has-reveal-observer");
    };
  }, []);

  const cvAsset = useMemo(
    () => portfolioAssets.find((asset) => asset.categoryId === "cv" && asset.name.toLowerCase().endsWith(".pdf")),
    [],
  );
  const currentItems = useMemo(() => (
    selectedCategory === "all"
      ? portfolioAssets
      : portfolioAssets.filter((asset) => asset.categoryId === selectedCategory)
  ), [selectedCategory]);
  const visibleItems = showAll ? currentItems : currentItems.slice(0, INITIAL_ITEMS);

  const chooseCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setShowAll(false);
    playCue("soft");
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    playCue("soft");
  };

  return (
    <div className="portfolio-site" dir="rtl">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="بيان — إلى أعلى الصفحة" onClick={handleNavClick}>
            <BrandMark className="brand-mark" />
            <span className="brand-name">بيان<span className="brand-period">.</span></span>
            <span className="brand-caption">مساحة بصرية متجددة</span>
          </a>

          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            aria-label={menuOpen ? "إغلاق القائمة" : "فتح القائمة"}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>

          <nav id="primary-navigation" className={`primary-navigation${menuOpen ? " menu-open" : ""}`} aria-label="التنقل الرئيسي">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} onClick={handleNavClick}>{item.label}</a>
            ))}
          </nav>

          <div className="header-actions">
            <MusicPlayer src={MUSIC_URL} />
            <div className="sound-control" aria-label="إعدادات المؤثرات الصوتية">
              <button
                type="button"
                className={`sound-toggle${soundEnabled ? " sound-on" : ""}`}
                onClick={toggleEnabled}
                aria-pressed={soundEnabled}
                title={soundEnabled ? "إيقاف المؤثرات الصوتية" : "تفعيل المؤثرات الصوتية"}
              >
                {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
                <span>{soundEnabled ? "الصوت يعمل" : "الصوت مغلق"}</span>
              </button>
              {soundEnabled ? (
                <input
                  aria-label="مستوى صوت المؤثرات"
                  className="sound-volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
              ) : null}
            </div>
            <a className="header-contact" href={`mailto:${profile.email}`} onClick={() => playCue("tap")}>
              لنتحدث <ArrowUpLeft size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero section-shell" id="home" aria-labelledby="hero-title">
          <div className="hero-copy reveal">
            <div className="hero-eyebrow"><span className="eyebrow-dot" /> إعلام <i /> محتوى <i /> إبداع</div>
            <p className="hero-name-line">أنا <strong>{profile.name}</strong></p>
            <h1 id="hero-title">
              أُحوّل الفكرة،<br />
              <span>إلى أثرٍ مرئي.</span>
            </h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-description">{profile.headline} {profile.headlineAccent}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work" onClick={() => playCue("soft")}>
                اكتشفي أعمالي <ArrowUpLeft size={17} aria-hidden="true" />
              </a>
              <a className="button button-outline" href="#contact" onClick={() => playCue("soft")}>
                تواصلي معي
              </a>
            </div>
            <div className="hero-note">
              <Sparkles size={16} aria-hidden="true" />
              <span>صور، فيديوهات، ومحتوى بصري يبدأ بفكرة.</span>
            </div>
          </div>

          <div className="hero-visual reveal" aria-label={`الصورة الشخصية الأصلية لـ ${profile.name}`}>
            <div className="hero-art-backdrop">
              {DECORATIVE_ART_URL ? (
                <img src={DECORATIVE_ART_URL} alt="" aria-hidden="true" fetchPriority="high" />
              ) : (
                <div className="abstract-art-fallback" aria-hidden="true">
                  <span className="art-fallback-orb" />
                  <span className="art-fallback-ring" />
                </div>
              )}
              <div className="art-glow" />
            </div>
            <div className="portrait-card">
              <div className="portrait-topline"><span>مبدعة في طور التشكّل</span><span className="portrait-sparkle"><Sparkles size={14} /></span></div>
              <div className="portrait-window">
                <img src={profile.portraitUrl} alt={`${profile.name} — الصورة الواردة في السيرة الذاتية`} fetchPriority="high" />
              </div>
              <div className="portrait-caption">
                <span>{profile.name}</span>
                <span>الإعلام · الصورة · الفكرة</span>
              </div>
            </div>
            <div className="floating-note floating-note-top"><span className="note-index">01</span><span>فكرة<br />تُلهم</span></div>
            <div className="floating-note floating-note-bottom"><span className="note-dot" /><span>صورة أصلية من ملف CV</span></div>
            <span className="hero-orbit hero-orbit-one" aria-hidden="true" />
            <span className="hero-orbit hero-orbit-two" aria-hidden="true" />
          </div>

          <a className="scroll-cue" href="#about" aria-label="انتقلي إلى نبذة عن بيان">
            <span>اكتشفي حكايتي</span><ArrowDown size={16} aria-hidden="true" />
          </a>
        </section>

        <div className="focus-ribbon" aria-label="مجالات العمل">
          <div className="section-shell focus-ribbon-inner">
            <span className="focus-lead">مساحات أعمل فيها</span>
            <span><i /> الصور</span>
            <span><i /> الفيديو</span>
            <span><i /> المحتوى التعليمي</span>
            <span><i /> الصوت والإلقاء</span>
            <span className="focus-end">فكرةٌ واضحة، أثرٌ أبقى.</span>
          </div>
        </div>

        <section className="about-section section-shell" id="about" aria-labelledby="about-title">
          <div className="section-heading reveal">
            <span className="eyebrow"><span className="eyebrow-number">01</span> نبذة عني</span>
            <h2 id="about-title">الإعلام كان البداية،<br /><span>والصورة مساحة جديدة.</span></h2>
          </div>
          <div className="about-layout">
            <article className="about-card reveal">
              <span className="card-label">تعريف مختصر</span>
              <p className="about-bio">{profile.bio}</p>
              <blockquote>«{profile.cvTagline}»</blockquote>
              <p className="about-note">أضيف إلى خلفيتي الإعلامية شغفًا بصناعة صور وفيديوهات بالذكاء الاصطناعي التوليدي، وأتعلّم باستمرار كيف تصبح التقنية وسيلةً لعرض الفكرة بوضوح.</p>
              {cvAsset?.downloadUrl ? (
                <a className="inline-download" href={cvAsset.downloadUrl} download={cvAsset.downloadName || profile.cvDownloadName}>
                  تنزيل السيرة الذاتية <ArrowUpLeft size={16} aria-hidden="true" />
                </a>
              ) : (
                <a className="inline-download" href="#work" onClick={() => chooseCategory("cv")}>
                  استعراض ملفات السيرة <ArrowUpLeft size={16} aria-hidden="true" />
                </a>
              )}
            </article>

            <div className="about-details reveal">
              <article className="detail-card education-card">
                <span className="detail-icon"><GraduationCap size={20} /></span>
                <div>
                  <span className="card-label">المؤهل العلمي</span>
                  <h3>{profile.education}</h3>
                  <p>{profile.institution}</p>
                </div>
                <span className="detail-index">01</span>
              </article>

              <article className="detail-card training-card">
                <span className="detail-icon"><Clock3 size={20} /></span>
                <div className="training-content">
                  <span className="card-label">خبرات وتدريب</span>
                  <h3>محطات في الإعلام والتعلّم</h3>
                  <ul>
                    {profile.training.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                  <p className="training-extra">{profile.additionalTraining}</p>
                </div>
                <span className="detail-index">02</span>
              </article>
            </div>
          </div>
        </section>

        <section className="skills-section section-shell" id="skills" aria-labelledby="skills-title">
          <div className="skills-header reveal">
            <div>
              <span className="eyebrow"><span className="eyebrow-number">02</span> مهارات من السيرة</span>
              <h2 id="skills-title">أدواتي الأولى؟<br /><span>الانتباه للفكرة والتفاصيل.</span></h2>
            </div>
            <p>أسماء البرامج والأدوات الرقمية غير محددة في السيرة الحالية؛ لذلك أعرض هنا المهارات الموثّقة كما وردت في ملفات CV.</p>
          </div>
          <div className="skill-grid reveal">
            {profile.skills.map((skill, index) => (
              <div className="skill-card" key={skill}>
                <span className="skill-number">0{index + 1}</span>
                <span className="skill-marker"><Sparkles size={16} aria-hidden="true" /></span>
                <h3>{skill}</h3>
                <span className="skill-line" />
              </div>
            ))}
          </div>
          <div className="supporting-skills reveal" aria-label="مهارات تنظيمية وتواصلية واردة في السيرة الإضافية">
            <span className="supporting-label">ومهارات مساندة</span>
            {profile.supportingSkills.map((skill) => <span className="supporting-chip" key={skill}>{skill}</span>)}
          </div>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="section-shell">
            <div className="work-heading reveal">
              <div>
                <span className="eyebrow"><span className="eyebrow-number">03</span> حقيبتي المهنية</span>
                <h2 id="work-title">من الفكرة،<br /><span>إلى ملفاتٍ تُرى وتُسمع.</span></h2>
              </div>
              <div className="work-heading-side">
                <p>معرض من ملفات الحقيبة المهنية الأصلية، مرتب وفق المجلدات كما وردت في Google Drive. افتحي أي بطاقة للمعاينة أو تنزيل الملف.</p>
                <div className="archive-count"><strong>{portfolioAssets.length}</strong><span>ملفًا<br />من 10 أقسام</span></div>
              </div>
            </div>

            <div className="category-scroller reveal" role="group" aria-label="تصنيف الأعمال حسب مجلد Drive">
              <button
                type="button"
                className={`category-filter${selectedCategory === "all" ? " is-active" : ""}`}
                aria-pressed={selectedCategory === "all"}
                onClick={() => chooseCategory("all")}
              >
                كل الملفات <span>{portfolioAssets.length}</span>
              </button>
              {portfolioCategories.map((category) => {
                const count = portfolioAssets.filter((asset) => asset.categoryId === category.id).length;
                return (
                  <button
                    type="button"
                    key={category.id}
                    className={`category-filter${selectedCategory === category.id ? " is-active" : ""}`}
                    aria-pressed={selectedCategory === category.id}
                    onClick={() => chooseCategory(category.id)}
                  >
                    {category.name} <span>{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="current-category-line">
              <span>{selectedCategory === "all" ? "جميع ملفات الحقيبة المهنية" : portfolioCategories.find((category) => category.id === selectedCategory)?.driveFolderName}</span>
              <span>{currentItems.length} {currentItems.length === 1 ? "ملف" : "ملفًا"}</span>
            </div>

            {visibleItems.length > 0 ? (
              <div className="asset-grid" aria-live="polite">
                {visibleItems.map((asset, index) => (
                  <div className="reveal is-visible" key={asset.id} style={{ "--reveal-delay": `${Math.min(index % 6, 5) * 55}ms` } as CSSProperties}>
                    <AssetCard asset={asset} onOpen={setActiveAsset} onCue={() => playCue("tap")} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="gallery-empty">
                <Sparkles size={22} aria-hidden="true" />
                <p>يجري تجهيز هذا القسم من ملفات الحقيبة الأصلية.</p>
              </div>
            )}

            {currentItems.length > INITIAL_ITEMS ? (
              <div className="show-more-wrap">
                <button className="show-more-button" type="button" onClick={() => { setShowAll((value) => !value); playCue("soft"); }}>
                  {showAll ? "عرض عدد أقل" : `عرض كل ملفات هذا القسم (${currentItems.length})`}
                  <ArrowDown className={showAll ? "arrow-up" : ""} size={16} aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </div>
        </section>

        <section className="contact-section section-shell" id="contact" aria-labelledby="contact-title">
          <div className="contact-panel reveal">
            <div className="contact-copy">
              <span className="eyebrow"><span className="eyebrow-number">04</span> مساحة للتعاون</span>
              <h2 id="contact-title">لديك فكرة؟<br /><span>لنجعلها مرئية.</span></h2>
              <p>أرحّب بالفرص والمشاريع التي تتيح لي ابتكار محتوى بصري وتعليمي يحمل رسالة واضحة.</p>
              <p className="contact-signoff">{profile.closingTagline}</p>
            </div>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${profile.email}`} onClick={() => playCue("soft")}>
                <span className="contact-link-icon"><Mail size={19} /></span>
                <span><small>البريد الإلكتروني</small><strong dir="ltr">{profile.email}</strong></span>
                <ArrowUpLeft className="contact-arrow" size={18} aria-hidden="true" />
              </a>
              <a className="contact-link" href={`tel:${profile.phone}`} onClick={() => playCue("soft")}>
                <span className="contact-link-icon"><Phone size={19} /></span>
                <span><small>الهاتف</small><strong dir="ltr">{profile.phone}</strong></span>
                <ArrowUpLeft className="contact-arrow" size={18} aria-hidden="true" />
              </a>
              <span className="contact-availability"><i /> بيانات التواصل كما وردت في ملف CV PDF.</span>
            </div>
            <span className="contact-decoration" aria-hidden="true"><Sparkles size={30} /></span>
          </div>
        </section>
      </main>

      <footer className="site-footer section-shell">
        <a className="footer-brand" href="#home" onClick={handleNavClick}>
          <BrandMark className="brand-mark" />
          <span>بيان<span className="brand-period">.</span></span>
        </a>
        <p>بيان ابراهيم مراشدة <i /> إعلام · محتوى · إبداع</p>
        <span className="footer-note">الموسيقى مولّدة خصيصًا للموقع؛ يُرجى مراجعة شروط الأداة قبل أي استخدام تجاري. العنصر التجريدي في الواجهة زخرفي وليس ضمن المعرض.</span>
        <a className="back-to-top" href="#home" aria-label="العودة إلى أعلى الصفحة" onClick={() => playCue("soft")}>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </footer>

      <AssetPreviewDialog asset={activeAsset} onClose={() => setActiveAsset(null)} />
    </div>
  );
}
