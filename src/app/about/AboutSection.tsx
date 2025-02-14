import React from "react";
import { LucideIcon } from "lucide-react";

interface AboutSectionProps {
  title: string;
  content: string;
  Icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  customContent?: React.ReactNode;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title,
  content,
  Icon,
  isOpen,
  onToggle,
  customContent,
}) => {
  return (
    <div className="bg-[#1C323D] rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-6 flex items-center justify-between hover:bg-[#D98E04] transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-full">
            <Icon className="w-6 h-6 text-[#4C8CA5]" />
          </div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <svg
          className={`w-6 h-6 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="p-6 pt-0">
          {customContent ? (
            customContent
          ) : (
            <p className="text-white leading-relaxed">{content}</p>
          )}
        </div>
      </div>
    </div>
  );
};
