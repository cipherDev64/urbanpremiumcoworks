import { Link } from 'react-router-dom';

// variant: primary | light | outline | ghost-light. External (href) or internal (to).
export default function Button({ to, href, variant = 'primary', children, icon = true, className = '', ...rest }) {
  const cls = `btn btn--${variant} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg className="btn__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );
  if (to) return <Link to={to} className={cls} {...rest}>{content}</Link>;
  return <a href={href} className={cls} {...rest}>{content}</a>;
}
