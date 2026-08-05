import { motion } from 'motion/react';
import { GraduationCap } from 'lucide-react';
import { facultyCoordinator } from '@/data/content';

export default function FacultyCoordinatorSection() {
  return (
    <section id="faculty-coordinator" className="py-20 md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="surface-card p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <img
              src={facultyCoordinator.image}
              alt={facultyCoordinator.name}
              loading="lazy"
              className="w-28 h-28 md:w-36 md:h-36 rounded-2xl object-cover border border-[var(--gfg-green)]/30 flex-shrink-0"
            />
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-3">
                <GraduationCap size={16} className="text-[var(--gfg-green)]" />
                <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                  Faculty Coordinator
                </span>
              </div>
              <h3 className="text-2xl font-display font-bold text-foreground">{facultyCoordinator.name}</h3>
              <p className="text-sm text-[var(--gfg-green)] font-medium mt-1 mb-1">{facultyCoordinator.role}</p>
              <p className="text-xs text-muted-foreground mb-4">{facultyCoordinator.department}</p>
              <p className="text-muted-foreground leading-relaxed text-sm">{facultyCoordinator.bio}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
