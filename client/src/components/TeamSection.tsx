import { useEffect, useState } from 'react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useLocation } from 'wouter';
import { teamMembers, TeamMember } from '@/data/content';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { fadeUpOnScroll } from '@/lib/animations';

function formatImageUrl(url: string): string {
  if (!url) return '/team/placeholder.jpg';
  if (url.includes('drive.google.com')) {
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      return `https://drive.google.com/uc?export=view&id=${match[1]}`;
    }
  }
  return url;
}

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [, setLocation] = useLocation();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, name: string) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1a3b2b&color=2fa84f&size=256`;
    e.currentTarget.onerror = null;
  };

  const executives = teamMembers.filter((m) => m.level === 'executive');
  const managers = teamMembers.filter((m) => m.level === 'manager');
  const leads = teamMembers.filter((m) => m.level === 'lead');
  const coreMembers = teamMembers.filter((m) => m.level === 'core');

  const president = executives[0];
  const executiveOfficers = executives.slice(1);

  useEffect(() => {
    let ctxHeader = fadeUpOnScroll('.team-header', 0.15, '#team');
    let ctxCards = fadeUpOnScroll('.team-anim', 0);
    return () => {
      if (ctxHeader) ctxHeader.revert();
      if (ctxCards) ctxCards.revert();
    };
  }, []);

  return (
    <section id="team" className="py-20 md:py-32 bg-secondary/40">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          className="mb-20 text-center md:text-left team-header opacity-0"
        >
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-widest">
              Leadership & Structure
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            The driving force behind GeeksforGeeks Student Chapter — Chandigarh University.
          </p>
        </div>

        <div className="space-y-28">
          {/* LEVEL 1: EXECUTIVE BOARD */}
          {executives.length > 0 && (
            <div className="space-y-12">
              <div className="border-b border-border/80 pb-4 text-center team-anim opacity-0">
                <h3 className="text-3xl font-display font-bold text-foreground">
                  Chapter Leadership
                </h3>
              </div>

              {/* President Spotlight Card */}
              {president && (
                <div className="flex justify-center mb-8 team-anim opacity-0">
                  <div className="w-full max-w-md">
                    <CardContainer className="w-full">
                      <CardBody className="bg-card border-2 border-[var(--gfg-green)]/40 hover:border-[var(--gfg-green)] shadow-xl hover:shadow-2xl hover:shadow-[var(--gfg-green)]/20 rounded-2xl p-6">
                        <CardItem translateZ={0} className="w-full mb-4">
                          <button
                            type="button"
                            onClick={() => setSelectedMember(president)}
                            className="w-full cursor-zoom-in"
                          >
                            <div className="h-72 md:h-80 w-full rounded-xl overflow-hidden bg-secondary/50 border border-border">
                              <img
                                src={formatImageUrl(president.image)}
                                alt={president.name}
                                className="h-full w-full object-contain object-center"
                                onError={(e) => handleImageError(e, president.name)}
                              />
                            </div>
                          </button>
                        </CardItem>
                        <CardItem translateZ={30} className="text-2xl font-bold text-foreground">
                          {president.name}
                        </CardItem>
                        <CardItem translateZ={20} className="text-sm font-bold text-[var(--gfg-green)] mb-2">
                          {president.role}
                        </CardItem>
                        {president.bio && (
                          <CardItem translateZ={10} className="text-muted-foreground text-xs mb-4">
                            {president.bio}
                          </CardItem>
                        )}
                        <SocialsRow socials={president.socials} name={president.name} />
                      </CardBody>
                    </CardContainer>
                  </div>
                </div>
              )}

              {/* Other Officers Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {executiveOfficers.map((member) => (
                  <div key={member.id} className="w-full team-anim opacity-0">
                  <CardContainer className="w-full">
                    <CardBody className="bg-card border-border hover:border-[var(--gfg-green)]/60 rounded-xl p-5 w-full">
                      <CardItem translateZ={0} className="w-full mb-4">
                        <button
                          type="button"
                          onClick={() => setSelectedMember(member)}
                          className="w-full cursor-zoom-in"
                        >
                          <div className="h-64 md:h-72 w-full rounded-lg overflow-hidden bg-secondary/50">
                            <img
                              src={formatImageUrl(member.image)}
                              alt={member.name}
                              className="h-full w-full object-contain object-center"
                              onError={(e) => handleImageError(e, member.name)}
                            />
                          </div>
                        </button>
                      </CardItem>
                      <CardItem translateZ={30} className="text-lg font-bold text-foreground">
                        {member.name}
                      </CardItem>
                      <CardItem translateZ={20} className="text-xs font-semibold text-[var(--gfg-green)] mb-2">
                        {member.role}
                      </CardItem>
                      <SocialsRow socials={member.socials} name={member.name} />
                    </CardBody>
                  </CardContainer>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 2: MANAGERS */}
          {managers.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-border/60 pb-4 team-anim opacity-0">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Leads
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {managers.map((member) => (
                  <div key={member.id} className="w-full team-anim opacity-0">
                  <CardContainer className="w-full">
                    <CardBody className="bg-card border-border rounded-xl p-4 w-full">
                      <CardItem translateZ={0} className="w-full mb-3">
                        <button
                          type="button"
                          onClick={() => setSelectedMember(member)}
                          className="w-full cursor-zoom-in"
                        >
                          <div className="h-56 w-full rounded-lg overflow-hidden bg-secondary/50">
                            <img
                              src={formatImageUrl(member.image)}
                              alt={member.name}
                              className="h-full w-full object-contain object-center"
                              onError={(e) => handleImageError(e, member.name)}
                            />
                          </div>
                        </button>
                      </CardItem>
                      <CardItem translateZ={20} className="text-base font-bold text-foreground">
                        {member.name}
                      </CardItem>
                      <CardItem translateZ={10} className="text-xs font-medium text-[var(--gfg-green)] mb-2">
                        {member.role}
                      </CardItem>
                      <SocialsRow socials={member.socials} name={member.name} />
                    </CardBody>
                  </CardContainer>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 3: WEB DEVELOPERS */}
          {leads.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-border/60 pb-4 team-anim opacity-0">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Web Developers
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {leads.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card border border-border/80 hover:border-[var(--gfg-green)]/60 rounded-xl p-4 flex flex-col justify-between hover:shadow-lg transition-all group team-anim opacity-0"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        className="w-full cursor-zoom-in mb-3"
                      >
                        <div className="h-48 w-full rounded-lg overflow-hidden bg-secondary/50 border border-border">
                          <img
                            src={formatImageUrl(member.image)}
                            alt={member.name}
                            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform"
                            onError={(e) => handleImageError(e, member.name)}
                          />
                        </div>
                      </button>
                      <h4 className="text-base font-bold text-foreground truncate">{member.name}</h4>
                    </div>
                    <div className="mt-3">
                      <SocialsRow socials={member.socials} name={member.name} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEVEL 4: CORE MEMBERS */}
          {coreMembers.length > 0 && (
            <div className="space-y-8">
              <div className="border-b border-border/60 pb-4 team-anim opacity-0">
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Core Team Members
                </h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {coreMembers.map((member) => (
                  <div
                    key={member.id}
                    className="bg-card border border-border/60 hover:border-[var(--gfg-green)]/50 rounded-xl p-3 flex flex-col justify-between hover:shadow-md transition-all group team-anim opacity-0"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => setSelectedMember(member)}
                        className="w-full cursor-zoom-in mb-2"
                      >
                        <div className="h-36 w-full rounded-lg overflow-hidden bg-secondary/50 border border-border/40">
                          <img
                            src={formatImageUrl(member.image)}
                            alt={member.name}
                            className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform"
                            onError={(e) => handleImageError(e, member.name)}
                          />
                        </div>
                      </button>
                      <p className="text-xs font-bold text-foreground truncate">{member.name}</p>
                      {member.role && (
                        <p className="text-[10px] font-medium text-[var(--gfg-green)] truncate">{member.role}</p>
                      )}
                    </div>
                    <div className="mt-2">
                      <SocialsRow socials={member.socials} name={member.name} compact />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-6">Want to join our leadership team?</p>
          <button
            onClick={() => setLocation('/join')}
            className="px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-all transform hover:scale-105 cursor-pointer"
          >
            Apply Now
          </button>
        </div>

        {/* Preview Modal */}
        <Dialog open={selectedMember !== null} onOpenChange={(open) => !open && setSelectedMember(null)}>
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedMember?.name || 'Member'}</DialogTitle>
            <DialogDescription>Full image preview</DialogDescription>
          </DialogHeader>
          <DialogContent className="max-w-4xl p-2 bg-card" showCloseButton={true}>
            {selectedMember && (
              <figure className="w-full">
                <img
                  src={formatImageUrl(selectedMember.image)}
                  alt={selectedMember.name}
                  className="w-full max-h-[80vh] object-contain rounded-md"
                  onError={(e) => handleImageError(e, selectedMember.name)}
                />
                <figcaption className="text-center text-sm text-muted-foreground py-2">
                  {selectedMember.name} {selectedMember.level !== 'lead' && selectedMember.role ? `— ${selectedMember.role}` : ''}
                </figcaption>
              </figure>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}

function SocialsRow({ socials, name, compact = false }: { socials: TeamMember['socials']; name: string; compact?: boolean }) {
  if (!socials.github && !socials.linkedin && !socials.twitter) return null;
  const iconSize = compact ? 12 : 14;
  const btnSize = compact ? "w-6 h-6" : "w-7 h-7";

  return (
    <div className="flex gap-2 pt-2 border-t border-border/40">
      {socials.github && (
        <a
          href={socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSize} bg-secondary hover:bg-[var(--gfg-green)] hover:text-[#04150a] rounded-full flex items-center justify-center transition-colors text-muted-foreground`}
          aria-label={`${name} on GitHub`}
        >
          <Github size={iconSize} />
        </a>
      )}
      {socials.linkedin && (
        <a
          href={socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSize} bg-secondary hover:bg-[var(--gfg-green)] hover:text-[#04150a] rounded-full flex items-center justify-center transition-colors text-muted-foreground`}
          aria-label={`${name} on LinkedIn`}
        >
          <Linkedin size={iconSize} />
        </a>
      )}
      {socials.twitter && (
        <a
          href={socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnSize} bg-secondary hover:bg-[var(--gfg-green)] hover:text-[#04150a] rounded-full flex items-center justify-center transition-colors text-muted-foreground`}
          aria-label={`${name} on Twitter`}
        >
          <Twitter size={iconSize} />
        </a>
      )}
    </div>
  );
}