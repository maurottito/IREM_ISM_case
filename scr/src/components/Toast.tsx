import { useEffect } from 'react';

interface ToastProps {
  message: string;
  onDismiss: () => void;
}

export function Toast({ message, onDismiss }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2800);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <div className="toast">
      <div className="toast-icon">✓</div>
      {message}
    </div>
  );
}
