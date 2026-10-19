import React, { useRef, useEffect, useState } from 'react';

interface ScrollSection3DProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

/**
 * IntersectionObserver-based 3D fade-in and slide-up wrapper for page sections.
 * Enhances the 3D depth and tactile perspective as users scroll down.
 */
export const ScrollSection3D: React.FC<ScrollSection3DProps> = ({ children, id, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Check if element is already in viewport on mount (e.g. Hero section)
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      id={id}
      ref={ref}
      className={`transition-all duration-800 ease-out transform ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-0 translate-y-12 scale-[0.98]'
      } ${className}`}
      style={{
        perspective: '1200px',
        transform: isVisible
          ? 'perspective(1200px) rotateX(0deg) translateY(0px) scale(1)'
          : 'perspective(1200px) rotateX(4deg) translateY(45px) scale(0.98)',
        transition: 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};
