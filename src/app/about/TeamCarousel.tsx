import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TeamMember } from "./team";
import { TeamCard } from "./TeamCard";

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Axel Coutiño Muñoz",
    role: "Lead Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Specializing in quantum physics with over 15 years of research experience.",
  },
  {
    id: 2,
    name: "Roberto Fierro Ballote",
    role: "Backend Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Leading our molecular biology department with groundbreaking research in gene editing.",
  },
  {
    id: 3,
    name: "Fabricio Aguilar Nowel",
    role: "Backend Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description: "Genio de los Login.",
  },
  {
    id: 4,
    name: "Christopher Ramon Chable",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Pioneering new approaches in environmental science and sustainability.",
  },
  {
    id: 5,
    name: "Fernando Flores Prado",
    role: "Frontend Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Pioneering new approaches in environmental science and sustainability.",
  },
  {
    id: 6,
    name: "Roberto Alejando Zetina Izquierdo",
    role: "Full Stack Developer",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Pioneering new approaches in environmental science and sustainability.",
  },
  {
    id: 7,
    name: "Eduardo Hidalgo Diaz Rugama",
    role: "ChanGOD",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
    description:
      "Pioneering new approaches in environmental science and sustainability.",
  },
];

export const TeamCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + teamMembers.length) % teamMembers.length
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {teamMembers.map((member) => (
            <div key={member.id} className="w-full flex-shrink-0">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-[#4C8CA5] p-2 rounded-full shadow-lg hover:bg-[#D98E04] transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-[#4C8CA5] p-2 rounded-full shadow-lg hover:bg-[#D98E04] transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button>

      <div className="flex justify-center mt-4 space-x-2">
        {teamMembers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-[#D98E04]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
