"use client";
import React, { useState } from "react";
import { Microscope, Beaker, Users } from "lucide-react";
import { AboutHero } from "./AboutHero";
import { AboutSection } from "./AboutSection";
import { TeamCarousel } from "./TeamCarousel";

const AboutPage: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  const toggleSection = (sectionId: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const sections = [
    {
      id: 1,
      title: "Nuestra Misión",
      content:
        "Nos dedicamos a promover el conocimiento científico a través de investigaciones rigurosas y experimentación innovadora. Nuestro equipo de expertos trabaja incansablemente para ampliar los límites de lo posible, buscando soluciones a algunos de los desafíos más apremiantes del mundo.",
      Icon: Microscope,
    },
    {
      id: 2,
      title: "Nuestro Enfoque",
      content:
        "Utilizando tecnología y metodologías de vanguardia, combinamos principios científicos tradicionales con innovaciones modernas. Nuestro enfoque colaborativo reúne diversas perspectivas, fomentando un entorno donde pueden florecer descubrimientos innovadores.",
      Icon: Beaker,
    },
    {
      id: 3,
      title: "Nuestro Equipo",
      content: "",
      Icon: Users,
      customContent: <TeamCarousel />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C2430]">
      <AboutHero />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((section) => (
            <AboutSection
              key={section.id}
              title={section.title}
              content={section.content}
              Icon={section.Icon}
              isOpen={openSections[section.id]}
              onToggle={() => toggleSection(section.id)}
              customContent={section.customContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { AboutPage };
