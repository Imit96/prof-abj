'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const mockEvents = [
  { id: 1, title: 'ICGEB Conference', caption: 'Delivering the keynote address on Drosophila models for toxicological screening.', src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80' },
  { id: 2, title: 'DRTC Lab Workshop', caption: 'Capacity building seminar with postgraduate students.', src: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&q=80' },
  { id: 3, title: 'Research Excellence Award', caption: 'Receiving the research excellence award.', src: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&q=80' },
];

export default function GalleryPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof mockEvents[0] | null>(null);

  return (
    <main className="pt-32 pb-32 min-h-[100svh] px-6 md:px-12 lg:px-24 bg-background">
      <h1 className="font-serif text-5xl md:text-6xl text-primary tracking-tight mb-16">Gallery & Events</h1>
      
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {mockEvents.map((item) => (
          <motion.div 
            layoutId={`card-${item.id}`}
            key={item.id} 
            className="break-inside-avoid cursor-pointer group relative rounded-2xl overflow-hidden border border-primary/10 shadow-sm"
            onClick={() => setSelectedEvent(item)}
          >
            <Image src={item.src} alt={item.title} width={800} height={600} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent p-6 pt-24 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-secondary font-serif text-xl md:text-2xl drop-shadow-md">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-primary/95 backdrop-blur-md cursor-pointer"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div 
              layoutId={`card-${selectedEvent.id}`}
              className="bg-background rounded-2xl overflow-hidden max-w-5xl w-full cursor-default shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-video bg-primary/10">
                <Image src={selectedEvent.src} alt={selectedEvent.title} fill className="object-cover" />
              </div>
              <div className="p-8 md:p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-serif text-primary mb-3">{selectedEvent.title}</h3>
                  <p className="text-ink/80 text-lg md:text-xl font-light leading-relaxed">{selectedEvent.caption}</p>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="shrink-0 px-8 py-3 text-sm uppercase tracking-widest font-bold border-2 border-primary/20 hover:border-secondary text-primary hover:bg-secondary rounded-full transition-all duration-300">
                  Close X
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
