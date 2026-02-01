'use client';

import RocketLaunchAnimation from '@/components/RocketLaunchAnimation';
import Navigation from '@/components/Navigation';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <RocketLaunchAnimation>
        <Navigation />
        <Hero />
        {/* Spacer for rocket animation */}
        <div className="h-[150vh]" aria-hidden="true" />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </RocketLaunchAnimation>
    </main>
  );
}
