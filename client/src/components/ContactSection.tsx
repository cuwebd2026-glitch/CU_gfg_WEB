import { useState } from 'react';
import { motion } from 'motion/react';
import AnimatedInput from './AnimatedInput';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
import { contactInfoCards } from '@/data/content';
import { getIcon } from '@/lib/icon-map';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="surface-card p-8 md:p-12"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
                role="status"
              >
                <div className="w-16 h-16 bg-[var(--gfg-green)]/15 border border-[var(--gfg-green)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="text-[var(--gfg-green)]" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  <label htmlFor="contact-message" className="sr-only">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    placeholder=" "
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    className="peer w-full rounded-lg border border-border bg-secondary/50 px-3 py-3 text-sm text-foreground outline-none transition focus-visible:ring-2 focus-visible:ring-[var(--gfg-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-background hover:border-muted-foreground/40 resize-none h-32"
                  />
                  <motion.span
                    aria-hidden="true"
                    animate={
                      formData.message
                        ? { y: -24, scale: 0.85, color: 'var(--gfg-green)' }
                        : { y: 0, scale: 1, color: 'var(--muted-foreground)' }
                    }
                    transition={{ duration: 0.28 }}
                    className="pointer-events-none absolute top-1/2 left-3 origin-left -translate-y-1/2 rounded-sm border border-transparent bg-secondary/50 px-1 transition-all"
                    style={{ zIndex: 2 }}
                  >
                    <span className="flex items-center gap-2">
                      <MessageSquare size={18} />
                      <span>Your Message</span>
                    </span>
                  </motion.span>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 bg-[var(--gfg-green)] text-[#04150a] font-bold rounded-lg hover:bg-[var(--gfg-green-bright)] transition-all flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                  <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>

                {/* Form Note */}
                <p className="text-xs text-muted-foreground text-center">
                  We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}
          </motion.div>

          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mt-12"
          >
            {contactInfoCards.map((card) => {
              const Icon = getIcon(card.icon);
              return (
                <div
                  key={card.id}
                  className="surface-card p-6 text-center hover:border-[var(--gfg-green)]/50"
                >
                  <div className="w-12 h-12 bg-[var(--gfg-green)]/15 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="text-[var(--gfg-green)]" size={24} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-sm">{card.detail}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
