'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProjectLink {
  label: string;
  href: string;
}

interface ProjectCardProps {
  title: string;
  period: string;
  description: string;
  tags: string[];
  publication?: boolean;
  link?: string;
  links?: ProjectLink[];
  images?: string[];
  index: number;
}

export default function ProjectCard({
  title,
  period,
  description,
  tags,
  publication,
  link,
  links,
  images,
  index,
}: ProjectCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const useMultiLink = links && links.length > 0;

  const cardClass =
    'group block overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-zinc-700 hover:shadow-lg hover:shadow-zinc-900/50';

  const motionProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4, delay: index * 0.1 },
  };

  const body = (
    <>
      {images && images.length > 0 && (
        <div className="relative aspect-video w-full overflow-hidden bg-zinc-800">
          <Image
            src={images[activeImage]}
            alt={`${title} figure ${activeImage + 1}`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveImage(i);
                  }}
                  className={`h-1.5 w-1.5 rounded-full transition-all ${
                    i === activeImage
                      ? 'bg-white w-3'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-slate-200">
            {title}
          </h3>
          {publication && (
            <span className="flex-shrink-0 rounded-full bg-slate-500/20 px-2 py-0.5 text-xs text-slate-400">
              Publication
            </span>
          )}
        </div>

        <p className="mb-2 text-sm text-slate-500">{period}</p>

        <p className="mb-4 text-sm text-slate-400">{description}</p>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {useMultiLink && (
          <div className="mt-4 flex flex-wrap gap-2">
            {links!.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-xs text-slate-300 transition-colors hover:border-slate-500 hover:bg-slate-800 hover:text-white"
              >
                {l.label}
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (useMultiLink) {
    return (
      <motion.div {...motionProps} className={cardClass}>
        {body}
      </motion.div>
    );
  }

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      {...motionProps}
      className={cardClass}
    >
      {body}
    </motion.a>
  );
}
