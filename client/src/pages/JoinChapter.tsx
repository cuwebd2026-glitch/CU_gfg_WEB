import { FormEvent, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';

export default function JoinChapter() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    year: '',
    interest: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12">
      <div className="container max-w-3xl">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--gfg-green)] transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Home
        </a>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="surface-card p-8 md:p-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={16} className="text-[var(--gfg-green)]" />
            <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">Join Chapter</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-display font-bold mb-3">Application Form</h1>
          <p className="text-muted-foreground mb-8">
            This is separate from the contact page. Fill this form to apply for chapter membership.
          </p>

          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label htmlFor="join-name" className="block text-sm mb-2">
                  Full Name
                </label>
                <input
                  id="join-name"
                  required
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="join-email" className="block text-sm mb-2">
                  Email
                </label>
                <input
                  id="join-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="join-year" className="block text-sm mb-2">
                  Academic Year
                </label>
                <select
                  id="join-year"
                  required
                  value={form.year}
                  onChange={(e) => setForm((prev) => ({ ...prev, year: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                >
                  <option value="">Select year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>

              <div>
                <label htmlFor="join-interest" className="block text-sm mb-2">
                  Area of Interest
                </label>
                <textarea
                  id="join-interest"
                  required
                  value={form.interest}
                  onChange={(e) => setForm((prev) => ({ ...prev, interest: e.target.value }))}
                  className="w-full h-28 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none resize-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="Web development, DSA, AI/ML, design, community..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-lg px-4 py-3 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-bold transition-colors"
              >
                Submit Application
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-[var(--gfg-green)]/40 bg-[var(--gfg-green)]/10 p-5">
              <div className="flex items-center gap-2 text-[var(--gfg-green)] font-semibold">
                <CheckCircle2 size={18} />
                Application received
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Thanks, {form.name}. Our chapter team will contact you on {form.email} with next steps.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
