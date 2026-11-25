import React, { useState } from 'react';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { MembershipDrawer } from './components/MembershipDrawer';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { ProblemValueSection } from './components/ProblemValueSection';
import { SwotSection } from './components/SwotSection';
import { TargetMarketSection } from './components/TargetMarketSection';
import { TIME_SLOTS, TierId, VEHICLE_TYPES } from './data/businessData';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTierId, setSelectedTierId] = useState<TierId>('silver');
  const [selectedVehicle, setSelectedVehicle] = useState<string>(VEHICLE_TYPES[1]);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[0]);

  const handleOpenEstimator = () => {
    setDrawerOpen(true);
  };

  const handleSelectTier = (tierId: TierId) => {
    setSelectedTierId(tierId);
    setDrawerOpen(true);
  };

  const handleSelectPersona = (preset: {
    tierId: TierId;
    vehicle: string;
    slot: string;
  }) => {
    setSelectedTierId(preset.tierId);
    setSelectedVehicle(preset.vehicle);
    setSelectedSlot(preset.slot);
    setDrawerOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2] text-[#111619]">
      <Navbar onOpenEstimator={handleOpenEstimator} />

      <main className="flex-1">
        <HeroSection onOpenEstimator={handleOpenEstimator} />
        <ProblemValueSection />
        <PricingSection onSelectTier={handleSelectTier} />
        <TargetMarketSection onSelectPersona={handleSelectPersona} />
        <SwotSection />
      </main>

      <Footer onOpenEstimator={handleOpenEstimator} />

      <MembershipDrawer
        isOpen={drawerOpen}
        initialTierId={selectedTierId}
        initialVehicle={selectedVehicle}
        initialSlot={selectedSlot}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
