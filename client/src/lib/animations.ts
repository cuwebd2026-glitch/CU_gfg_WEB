import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initGSAP() {
  // ScrollTrigger is already registered at module load
}

/** Check OS-level reduced motion preference */
const reducedMotion = (): boolean =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Fades + slides elements up when they enter the viewport.
 * Uses gsap.context() for proper React cleanup.
 * @returns gsap.Context — call .revert() to clean up
 */
export function fadeUpOnScroll(
  selector: string | HTMLElement | Element[] | NodeListOf<Element>,
  stagger: number = 0,
  triggerSelector?: string | HTMLElement | Element
): gsap.Context {
  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    if (!elements.length) return;

    if (reducedMotion()) {
      gsap.set(elements, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    gsap.set(elements, { opacity: 0, y: 30 });

    if (stagger > 0 && triggerSelector) {
      // Group animation with stagger
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 85%',
          once: true,
        },
      });
    } else {
      // Individual trigger for each element
      elements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }
  });

  return ctx;
}

/**
 * Fades + slides elements in from the right when they enter the viewport.
 */
export function slideFromRightOnScroll(
  selector: string | HTMLElement | Element[] | NodeListOf<Element>,
  stagger: number = 0,
  triggerSelector?: string | HTMLElement | Element
): gsap.Context {
  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray<HTMLElement>(selector);
    if (!elements.length) return;

    if (reducedMotion()) {
      gsap.set(elements, { opacity: 1, x: 0, clearProps: 'all' });
      return;
    }

    gsap.set(elements, { opacity: 0, x: 50 });

    if (stagger > 0 && triggerSelector) {
      gsap.to(elements, {
        opacity: 1,
        x: 0,
        duration: 0.65,
        stagger: stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: triggerSelector,
          start: 'top 85%',
          once: true,
        },
      });
    } else {
      elements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }
  });

  return ctx;
}

/**
 * Animates a number counter when it enters the viewport.
 * @returns gsap.Context — call .revert() to clean up
 */
export function animateCounter(
  el: string | HTMLElement | Element,
  targetValue: number,
  suffix: string = ''
): gsap.Context {
  const ctx = gsap.context(() => {
    const targetElement = typeof el === 'string' ? document.querySelector(el) : el;
    if (!targetElement) return;
    
    if (reducedMotion()) {
      targetElement.textContent = targetValue + suffix;
      return;
    }

    const proxy = { val: 0 };
    gsap.to(proxy, {
      val: targetValue,
      duration: 1.5,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: targetElement,
        start: 'top 90%',
        once: true,
      },
      onUpdate() {
        targetElement.textContent = Math.round(proxy.val) + suffix;
      },
      onComplete() {
        targetElement.textContent = targetValue + suffix;
      },
    });
  });

  return ctx;
}

/**
 * Hero section entrance animation (runs on page load, no scroll trigger).
 * @returns gsap.Context — call .revert() to clean up
 */
export function animateHero(): gsap.Context {
  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray<HTMLElement>('.hero-anim');
    if (!elements.length) return;

    if (reducedMotion()) {
      gsap.set(elements, { opacity: 1, y: 0, clearProps: 'all' });
      return;
    }

    gsap.set(elements, { opacity: 0, y: 28 });
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.15,
    });
  });

  return ctx;
}
