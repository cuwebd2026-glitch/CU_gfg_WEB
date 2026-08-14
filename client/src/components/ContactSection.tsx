import { useState, useEffect } from 'react';
import AnimatedInput from './AnimatedInput';
import { Mail, Send, User, MessageSquare, AlertCircle, Loader2 } from 'lucide-react';
import { contactInfoCards } from '@/data/content';
import { getIcon } from '@/lib/icon-map';
import { fadeUpOnScroll } from '@/lib/animations';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    // Client-side Validation: Block blank submissions
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setErrorMessage('Please fill in all fields before sending.');
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ctx = fadeUpOnScroll('.contact-anim', 0.15, '#contact');
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-12 text-center contact-anim opacity-0">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                Get in Touch
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Got Questions? Let's Talk.
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Reach out about the chapter, upcoming events, or how to get involved — we usually respond fastest on Instagram.
            </p>
          </div>

          {/* Contact Form Container */}
          <div className="surface-card p-8 md:p-12 contact-anim opacity-0">
            {submitted ? (
              <div className="text-center py-12" role="status">
                <div className="w-16 h-16 bg-[var(--gfg-green)]/15 border border-[var(--gfg-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-[var(--gfg-green)]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 text-sm flex items-center gap-2">
                    <AlertCircle size={18} className="shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name Input */}
                <div>
                  <AnimatedInput
                    label="Full Name"
                    placeholder="John Doe"
                    icon={<User size={18} />}
                    value={formData.name}
                    onChange={(value) => handleChange('name', value)}
                    className="w-full"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <AnimatedInput
                    label="Email Address"
                    placeholder="you@example.com"
                    icon={<Mail size={18} />}
                    value={formData.email}
                    onChange={(value) => handleChange('email', value)}
                    className="w-full"
                  />
                </div>

                {/* Message Textarea */}
                <div className="relative">
                  <div className="absolute top-3.5 left-3.5 pointer-events-none text-muted-foreground z-10 flex items-center justify-center">
                    <MessageSquare size={18} />
                  </div>
                  <textarea
                    id="contact-message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="w-full rounded-lg border border-border bg-secondary/50 pl-11 pr-4 py-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-muted-foreground/40 resize-none h-32"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Form Note */}
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </div>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {contactInfoCards.map((card) => {
              const Icon = getIcon(card.icon);
              return (
                <div
                  key={card.id}
                  className="surface-card p-6 text-center hover:border-[var(--gfg-green)]/50 contact-anim opacity-0"
                >
                  <div className="w-12 h-12 bg-[var(--gfg-green)]/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[var(--gfg-green)]" size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}