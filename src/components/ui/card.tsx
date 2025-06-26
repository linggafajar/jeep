import React from 'react';
import clsx from 'clsx'; // opsional untuk gabungkan className

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx("rounded-xl shadow-md bg-white", className)}>
      {children}
    </div>
  );
}
