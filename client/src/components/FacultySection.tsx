import { useEffect, useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { facultyMembers, FacultyMember } from '@/data/content';
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

export default function FacultySection() {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  useEffect(() => {
    let ctxHeader = fadeUpOnScroll('.faculty-header', 0.15, '#faculty');
    let ctxCards = fadeUpOnScroll('.faculty-card', 0.1, '#faculty');
    return () => {
      if (ctxHeader) ctxHeader.revert();
      if (ctxCards) ctxCards.revert();
    };
  }, []);

  return (
    <section id="faculty" className="py-20 md:py-32 bg-secondary/30">
      <div className="container px-4 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 text-center md:text-left faculty-header opacity-0">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-widest">
              Academic Leadership
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Faculty Mentors & Advisors
          </h2>

          <p className="text-muted-foreground max-w-2xl text-base">
            Distinguished faculty members driving our vision, bridging academics with practical engineering, and mentoring students to lead and innovate.
          </p>
        </div>

        {/* 3 Large Featured Faculty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {facultyMembers.map((member) => (
            <div
              key={member.id}
              className="bg-card border-2 border-border/80 hover:border-[var(--gfg-green)]/60 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group faculty-card opacity-0"
            >
              <div>
                {/* Faculty Photo */}
                <button
                  type="button"
                  onClick={() => setSelectedFaculty(member)}
                  className="w-full cursor-zoom-in mb-6 group/img"
                  aria-label={`View full image of ${member.name}`}
                >
                  <div className="h-64 md:h-72 w-full rounded-xl overflow-hidden bg-secondary/50 border border-border">
                    <img
                      src={formatImageUrl(member.image)}
                      alt={member.name}
                      loading="lazy"
                      className="h-full w-full object-contain object-center group-hover/img:scale-105 transition-transform duration-300"
                    />
                  </div>
                </button>

                {/* Badge / Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <GraduationCap size={16} className="text-[var(--gfg-green)]" />
                  <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider font-semibold">
                    {member.role}
                  </span>
                </div>

                {/* Faculty Name */}
                <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">
                  {member.name}
                </h3>

                {/* Designation */}
                <p className="text-sm font-semibold text-foreground/80 mb-1">
                  {member.designation}
                </p>

                {/* Department */}
                <p className="text-xs font-mono text-muted-foreground mb-4">
                  {member.department}
                </p>

                {/* Bio */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Preview */}
        <Dialog open={selectedFaculty !== null} onOpenChange={(open) => !open && setSelectedFaculty(null)}>
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedFaculty?.name || 'Faculty Member'}</DialogTitle>
            <DialogDescription>Faculty image preview</DialogDescription>
          </DialogHeader>
          <DialogContent className="max-w-4xl p-2 bg-card" showCloseButton={true}>
            {selectedFaculty && (
              <figure className="w-full">
                <img
                  src={formatImageUrl(selectedFaculty.image)}
                  alt={selectedFaculty.name}
                  className="w-full max-h-[80vh] object-contain rounded-md"
                />
                <figcaption className="text-center text-sm text-muted-foreground py-2 font-bold">
                  {selectedFaculty.name} — {selectedFaculty.role}
                </figcaption>
              </figure>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}