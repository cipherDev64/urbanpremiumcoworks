import { LazyMotion, MotionConfig, domAnimation, m, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export const ease = [0.22, 1, 0.36, 1];
const viewport = { once: true, margin: '0px 0px -12% 0px' };

// reducedMotion="user" strips transform animations for people who prefer less motion.
// LazyMotion + `m` keeps the animation bundle small.
export function MotionProvider({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation}>{children}</LazyMotion>
    </MotionConfig>
  );
}

export function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, delay, ease }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const group = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease } } };

export function Stagger({ as = 'div', className, children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={group} initial="hidden" whileInView="show" viewport={viewport} {...rest}>
      {children}
    </Tag>
  );
}
export function StaggerItem({ as = 'div', className, children, ...rest }) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={item} {...rest}>
      {children}
    </Tag>
  );
}

// Masked line-by-line headline entrance. `lines` is an array of strings.
export function Lines({ lines, delay = 0.15, className, as = 'h1' }) {
  const Tag = as;
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span className="line-mask" key={line}>
          <m.span
            className="line-mask__inner"
            initial={{ y: '112%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.05, delay: delay + i * 0.11, ease }}
          >
            {line}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}

// Image frame: clip-path reveal on entry plus a restrained parallax drift tied to scroll progress.
// useTransform produces a MotionValue, so scrolling never re-renders React.
export function ImageFrame({ className = '', parallax = 7, children, reveal = true, style }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);
  return (
    <m.div
      ref={ref}
      className={`frame ${className}`}
      style={style}
      initial={reveal ? { clipPath: 'inset(0 0 100% 0)' } : false}
      whileInView={reveal ? { clipPath: 'inset(0 0 0% 0)' } : undefined}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduce ? 0 : 1.15, ease }}
    >
      <m.div className="frame__inner" style={reduce || !parallax ? undefined : { y, scale: 1 + (parallax * 2) / 100 + 0.02 }}>
        {children}
      </m.div>
    </m.div>
  );
}
export { m, useReducedMotion };
