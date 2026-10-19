import { useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'motion/react';
import { ease } from '../lib/motion.jsx';

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div className={`faq__item ${isOpen ? 'is-open' : ''}`} key={it.q}>
            <h3>
              <button type="button" id={`faq-q-${i}`} className="faq__q" aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span>{it.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduce ? 0 : 0.45, ease }}>
                  <p>{it.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
