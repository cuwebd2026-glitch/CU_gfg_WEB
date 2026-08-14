import { FormEvent, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Sparkles, Upload, FileText, X, AlertCircle, Loader2 } from 'lucide-react';

export default function JoinChapter() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    year: '',
    interest: '',
  });
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage('File size exceeds 5MB limit. Please upload a smaller file.');
        return;
      }
      setResume(file);
      setErrorMessage('');
    }
  };

  const removeFile = () => {
    setResume(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedYear = form.year.trim();
    const trimmedInterest = form.interest.trim();

    if (!trimmedName || !trimmedEmail || !trimmedYear || !trimmedInterest) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('name', trimmedName);
      formData.append('email', trimmedEmail);
      formData.append('year', trimmedYear);
      formData.append('interest', trimmedInterest);
      if (resume) {
        formData.append('resume', resume);
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        body: formData,
      });

      let data: any = {};
      try {
        data = await response.json();
      } catch {
        throw new Error(`Server returned status ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Apply for chapter membership and join our technical teams.
          </p>

          {!submitted ? (
            <form onSubmit={onSubmit} className="space-y-5">
              {errorMessage && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div>
                <label htmlFor="join-name" className="block text-sm mb-2 font-medium">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="join-name"
                  required
                  value={form.name}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, name: e.target.value }));
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="join-email" className="block text-sm mb-2 font-medium">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="join-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, email: e.target.value }));
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label htmlFor="join-year" className="block text-sm mb-2 font-medium">
                  Academic Year <span className="text-red-500">*</span>
                </label>
                <select
                  id="join-year"
                  required
                  value={form.year}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, year: e.target.value }));
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] cursor-pointer"
                >
                  <option value="">Select year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>

              <div>
                <label htmlFor="join-interest" className="block text-sm mb-2 font-medium">
                  Area of Interest & Why you want to join <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="join-interest"
                  required
                  value={form.interest}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, interest: e.target.value }));
                    if (errorMessage) setErrorMessage('');
                  }}
                  className="w-full h-28 rounded-lg border border-border bg-secondary/50 px-3 py-2.5 outline-none resize-none focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)]"
                  placeholder="Web development, Backend/Java, DSA, AI/ML, Design, Event Management..."
                />
              </div>

              {/* Resume Upload (Optional) */}
              <div>
                <label className="block text-sm mb-2 font-medium">
                  Resume / CV <span className="text-xs text-muted-foreground">(Optional, PDF/DOC max 5MB)</span>
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  id="join-resume"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                {!resume ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full border-2 border-dashed border-border hover:border-[var(--gfg-green)]/60 bg-secondary/20 rounded-lg p-4 flex flex-col items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Upload size={20} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Click to upload your resume</span>
                    <span className="text-xs text-muted-foreground">PDF, DOC, or DOCX</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border">
                    <div className="flex items-center gap-2 truncate">
                      <FileText size={18} className="text-[var(--gfg-green)] shrink-0" />
                      <span className="text-sm truncate font-medium">{resume.name}</span>
                      <span className="text-xs text-muted-foreground">({(resume.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="p-1 rounded-md text-muted-foreground hover:text-red-500 transition-colors"
                      aria-label="Remove resume"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg px-4 py-3 bg-[var(--gfg-green)] hover:bg-[var(--gfg-green-bright)] text-[#04150a] font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <span>Submit Application</span>
                )}
              </button>
            </form>
          ) : (
            <div className="rounded-lg border border-[var(--gfg-green)]/40 bg-[var(--gfg-green)]/10 p-5">
              <div className="flex items-center gap-2 text-[var(--gfg-green)] font-semibold text-lg">
                <CheckCircle2 size={20} />
                Application received successfully!
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Thanks, {form.name}. We have received your details and attached resume. Our chapter team will reach out to you at {form.email}.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}