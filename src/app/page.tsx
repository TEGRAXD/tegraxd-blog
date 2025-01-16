'use client';

import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center bg-white dark:bg-midnight pt-24">
        <section className="max-w-lg px-8 sm:p-0">
          <h1 className="mb-4 text-2xl font-semibold">Heya!</h1>
          <p>I am a Software Engineer who lives under your bed.</p>
          <p>Loves to build open-source libraries for some community or <i>myself</i> and someone who always dedicated to continously learning best practices.</p>
          <p className="pt-6">P.S. Please be gentle to this wandering soul.</p>
        </section>
      </div>
    </main>
  );
}
