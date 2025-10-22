import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

const SIZES = {
  sm: 'min(100vw - 2rem, 420px)',
  md: 'min(100vw - 2rem, 560px)',
  lg: 'min(100vw - 2rem, 760px)',
};

const modalRootId = 'stayseries-modal-root';

function ensurePortalRoot() {
  let root = document.getElementById(modalRootId);
  if (!root) {
    root = document.createElement('div');
    root.setAttribute('id', modalRootId);
    document.body.appendChild(root);
  }
  return root;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  labelledBy,
  className,
}) {
  const contentRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const portalRoot = ensurePortalRoot();
    portalRoot.setAttribute('aria-hidden', 'false');

    lastFocused.current = document.activeElement;

    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusFirst = () => {
      if (contentRef.current) {
        const firstFocusable = contentRef.current.querySelector(FOCUSABLE);
        if (firstFocusable) {
          firstFocusable.focus();
        } else {
          contentRef.current.focus();
        }
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose?.();
      }

      if (event.key === 'Tab' && contentRef.current) {
        const focusable = Array.from(contentRef.current.querySelectorAll(FOCUSABLE)).filter(
          (node) => !node.hasAttribute('data-modal-ignore'),
        );

        if (!focusable.length) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    const timer = window.setTimeout(focusFirst, 50);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = bodyOverflow;
      portalRoot.setAttribute('aria-hidden', 'true');

      if (lastFocused.current && lastFocused.current.focus) {
        lastFocused.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="modal-overlay"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        ref={contentRef}
        className={clsx('modal-content', className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        style={{ width: SIZES[size] ?? SIZES.md }}
      >
        <div className="modal-header">
          {title ? (
            <h2 id={labelledBy} className="modal-title">
              {title}
            </h2>
          ) : null}
          <button
            type="button"
            className="modal-close"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    ensurePortalRoot(),
  );
}

