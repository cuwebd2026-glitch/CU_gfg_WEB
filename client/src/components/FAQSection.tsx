import { useEffect } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './ui/accordion';
import { faqs } from '@/data/content';
import { fadeUpOnScroll } from '@/lib/animations';

export default function FAQSection() {
  useEffect(() => {
    let ctx = fadeUpOnScroll('.faq-anim', 0.15, '#faq');
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/40">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12 text-center faq-anim opacity-0">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-[var(--gfg-green)]" />
              <span className="text-xs font-mono text-[var(--gfg-green)] uppercase tracking-wider">
                Questions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know before joining the chapter.
            </p>
          </div>

          <div className="surface-card px-6 faq-anim opacity-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
