import React from 'react';
import { HeroSection } from './HeroSection';
import { StoryOfAnIdea } from '../../components/storytelling/StoryOfAnIdea';

export const HomePage: React.FC = () => {
  return (
    <div className="relative">
      {/* SCENE 01 — CINEMATIC HERO */}
      <HeroSection />

      {/* SCENE 02 & 03 — THE STORY OF AN IDEA (PINNED STORYTELLING SCENE) */}
      <StoryOfAnIdea />
    </div>
  );
};
