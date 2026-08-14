import { footerLinks, socialLinks } from '@/data/content';
import { getIcon } from '@/lib/icon-map';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="container py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden bg-white flex items-center justify-center shadow-sm border border-border">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqi4ne4JX9xpaNSr95hu9Apn7etCL8P14E0A9dAHMWdYiR5Jqb-lON6Kf8f1MlJBpF&s=10&ec=121902058"
                  alt="Chandigarh University logo"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-display font-bold text-foreground">Chandigarh University x GFG</div>
                <div className="text-xs font-mono text-muted-foreground">CU Community</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Geeks on Fleek. <br/>
              Innovate → Engage → Empower. <br/>
              Built by Chandigarh University students with the GFG spirit.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = getIcon(social.icon);
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-[var(--gfg-green)] hover:border-[var(--gfg-green)] transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Chandigarh University x GFG. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a 
                href="https://www.google.com/maps/place/University+Institute+of+Engineering+(Block-6+CU)/@30.7669221,76.5764093,19.92z/data=!4m14!1m7!3m6!1s0x390ffbf5491a0497:0x6f015c5b1264cfbf!2sKakkar+Mobile+Store!8m2!3d30.7666488!4d76.5761863!16s%2Fg%2F11vlcq8wg0!3m5!1s0x390ffba832919dcf:0xb3aa3619b63078ca!8m2!3d30.7671049!4d76.5761769!16s%2Fg%2F11h51j3p9l?authuser=0&entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors"
              >
              Sitemap
              </a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
