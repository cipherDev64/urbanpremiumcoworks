import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'motion/react';
import manifest from '../data/imageManifest.json';
import Img from './Img.jsx';
import { Stagger, StaggerItem, ease } from '../lib/motion.jsx';

function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  const dialogRef = useRef(null);
  const item = items[index];
  useEffect(() => {
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onStep(1);
      else if (e.key === 'ArrowLeft') onStep(-1);
      else if (e.key === 'Tab' && dialogRef.current) {
        // Keep focus inside the dialog: cycle through its buttons.
        const f = [...dialogRef.current.querySelectorAll('button')];
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose, onStep]);
  return (
    <m.div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={onClose}>
      <button ref={closeRef} type="button" className="lightbox__btn lightbox__close" onClick={onClose} aria-label="Close photo viewer">✕</button>
      <button type="button" className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); onStep(-1); }} aria-label="Previous photo">←</button>
      <button type="button" className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); onStep(1); }} aria-label="Next photo">→</button>
      <AnimatePresence mode="wait" initial={false}>
        <m.figure key={item.name} className="lightbox__figure" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }} onClick={(e) => e.stopPropagation()}>
          <Img name={item.name} alt={item.alt} sizes="92vw" eager defaultWidth={2000} />
          <figcaption>{item.alt} <span>{index + 1} / {items.length}</span></figcaption>
        </m.figure>
      </AnimatePresence>
    </m.div>
  );
}

export default function Gallery({ items }) {
  const [open, setOpen] = useState(null);
  const trigger = useRef(null);
  const close = useCallback(() => {
    setOpen(null);
    trigger.current?.focus();
  }, []);
  const step = useCallback((d) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length]);
  return (
    <>
      <Stagger className="gallery">
        {items.map((it, i) => {
          const meta = manifest[it.name];
          return (
            <StaggerItem key={it.name} className="gallery__item">
              <button
                type="button"
                className="gallery__btn"
                style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
                onClick={(e) => { trigger.current = e.currentTarget; setOpen(i); }}
                aria-label={`View larger: ${it.alt}`}
              >
                <Img name={it.name} alt="" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
      <AnimatePresence>{open !== null && <Lightbox items={items} index={open} onClose={close} onStep={step} />}</AnimatePresence>
    </>
  );
}
