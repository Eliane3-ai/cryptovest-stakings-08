
import React from 'react';
import { cn } from "@/lib/utils";

interface TabButtonProps {
  active: boolean;
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  className?: string;
}

const TabButton: React.FC<TabButtonProps> = ({
  active,
  label,
  icon,
  onClick,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2.5 rounded-lg text-sm font-medium transition-all",
        active 
          ? "bg-primary text-primary-foreground" 
          : "bg-transparent text-muted-foreground hover:bg-muted",
        className
      )}
    >
      <div className="flex items-center">
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </div>
    </button>
  );
};

export default TabButton;
