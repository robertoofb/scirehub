'use client';

import { useState } from "react";
import { OnboardingForm } from "./OnboardingForm"; // Asegúrate de que la ruta sea correcta

export default function OnboardingPage() {
  const [showForm, setShowForm] = useState(true);

  const handleComplete = () => {
    setShowForm(false);
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      {showForm && <OnboardingForm isOpen={showForm} onComplete={handleComplete} />}
    </main>
  );
}
