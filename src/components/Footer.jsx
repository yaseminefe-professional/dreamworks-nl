import { useLanguage } from "../i18n/LanguageContext.jsx";
import { asset } from "../lib/asset.js";

export default function Footer() {
  const { t } = useLanguage();
  const links = [
    { href: "#garden", label: t.nav.garden },
    { href: "#carpentry", label: t.nav.carpentry },
    { href: "#demolition", label: t.nav.demolition },
    { href: "#development", label: t.nav.development },
    { href: "#signage", label: t.nav.signage },
    { href: "#contact", label: t.nav.cta },
  ];

  return (
    <footer className="footer">
      <div className="footer__brand">
        <img src={asset("assets/images/logo-dreamworks.png")} alt="DreamWorks" className="footer__logo" />
        <p>{t.footer.tagline}</p>
      </div>
      <nav className="footer__links" aria-label="Footer">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <p className="footer__copy">&copy; {new Date().getFullYear()} DreamWorks</p>
    </footer>
  );
}
