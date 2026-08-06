import { motion } from 'motion/react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { teamMembers } from '@/data/content';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function TeamSection() {
  const [selectedMember, setSelectedMember] = useState<(typeof teamMembers)[number] | null>(null);

  return (
    <section id="team" className="py-20 md:py-32 bg-secondary/40">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
              Our Team
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-6">
            Meet Our Team
          </h2>

          <p className="text-muted-foreground max-w-2xl">
            Meet the passionate students and mentors driving the GFG CU Community forward. Our team is dedicated to building a community where everyone can learn, grow, and lead.
          </p>
        </motion.div>

        {/* Team Grid with 3D Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="w-full"
            >
              <CardContainer className="inter-var w-full">
                <CardBody className="bg-card hover:shadow-2xl hover:shadow-[var(--gfg-green)]/[0.08] border-border w-full sm:w-full max-w-full h-auto rounded-xl p-6 border overflow-hidden">
                  {/* Member Image */}
                  <CardItem
                    translateZ={0}
                    className="w-full mb-4"
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedMember(member)}
                      className="w-full text-left rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--gfg-green)] cursor-zoom-in"
                      aria-label={`View full image of ${member.name}`}
                    >
                      <div className="h-52 w-full rounded-lg overflow-hidden bg-secondary/50">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          className="h-full w-full object-contain object-center group-hover/card:shadow-xl transition-shadow"
                        />
                      </div>
                    </button>
                  </CardItem>

                  {/* Member Name */}
                  <CardItem
                    translateZ={50}
                    className="text-lg font-bold text-foreground"
                  >
                    {member.name}
                  </CardItem>

                  {/* Member Role */}
                  <CardItem
                    translateZ={40}
                    className="text-sm font-semibold text-[var(--gfg-green)] mb-2"
                  >
                    {member.role}
                  </CardItem>

                  {/* Member Bio */}
                  <CardItem
                    as="p"
                    translateZ={30}
                    className="text-muted-foreground text-xs max-w-sm mb-4"
                  >
                    {member.bio}
                  </CardItem>

                  {/* Social Links */}
                  <CardItem
                    translateZ={20}
                    className="flex gap-3 mt-4"
                  >
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="w-8 h-8 bg-secondary hover:bg-[var(--gfg-green)] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${member.name} on GitHub`}
                      >
                        <Github size={16} className="text-muted-foreground" />
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="w-8 h-8 bg-secondary hover:bg-[var(--gfg-green)] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${member.name} on LinkedIn`}
                      >
                        <Linkedin size={16} className="text-muted-foreground" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="w-8 h-8 bg-secondary hover:bg-[var(--gfg-green)] rounded-full flex items-center justify-center transition-colors"
                        aria-label={`${member.name} on Twitter`}
                      >
                        <Twitter size={16} className="text-muted-foreground" />
                      </a>
                    )}
                  </CardItem>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">Want to join our leadership team?</p>
          <button className="px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-all transform hover:scale-105">
            Apply Now
          </button>
        </motion.div>

        <Dialog
          open={selectedMember !== null}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              setSelectedMember(null);
            }
          }}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedMember ? `${selectedMember.name} photo` : 'Team member photo'}</DialogTitle>
            <DialogDescription>Full image preview for selected team member.</DialogDescription>
          </DialogHeader>
          <DialogContent className="max-w-4xl p-2 bg-card" showCloseButton={true}>
            {selectedMember && (
              <figure className="w-full">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full max-h-[80vh] object-contain rounded-md"
                />
                <figcaption className="text-center text-sm text-muted-foreground py-2">
                  {selectedMember.name}
                </figcaption>
              </figure>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
