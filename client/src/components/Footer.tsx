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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--gfg-green)] to-[var(--gfg-green-bright)] flex items-center justify-center font-bold text-[#04150a]">
                G
              </div>
              <div>
                <div className="font-display font-bold text-foreground">GeeksforGeeks</div>
                <div className="text-xs font-mono text-muted-foreground">Student Chapter</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Geeks on Fleek. Code → Connect → Conquer. GeeksforGeeks Student Chapter, Chandigarh University.
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
              © {currentYear} GeeksforGeeks Student Chapter - CU. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors">
                Status
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors">
                Sitemap
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors">
                Feedback
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
