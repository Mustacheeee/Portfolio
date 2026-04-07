import React from "react";
import { motion } from "framer-motion";

import github from "../assets/github-brands.svg";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { textVariant, fadeIn } from "../constants/motion.js";

interface Tag {
  name: string;
  color: string;
}

interface ProjectProps {
  index: number;
  name: string;
  description?: string;
  tags: Tag[];
  image: string;
  source_code_link?: string;
  demo_video?: string;
  onOpenDemo?: () => void;
}

function PlayIcon() {
  return (
    <span
      className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/55 text-mywhite ring-2 ring-mywhite/50 shadow-lg group-hover/demo:scale-105 transition-transform duration-300"
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 sm:h-7 sm:w-7 ml-0.5"
        fill="currentColor"
      >
        <path d="M8 5v14l11-7L8 5z" />
      </svg>
    </span>
  );
}

function VideoDemoModal({
  src,
  title,
  onClose,
}: {
  src: string;
  title: string;
  onClose: () => void;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const handleClose = React.useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [handleClose]);

  React.useEffect(() => {
    const v = videoRef.current;
    v?.play().catch(() => {});
    return () => {
      v?.pause();
    };
  }, [src]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-5xl rounded-2xl overflow-hidden border border-mywhite/15 bg-black shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} demo video`}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 rounded-full bg-black/70 text-mywhite w-10 h-10 flex items-center justify-center font-body text-xl leading-none hover:bg-black/90 transition-colors border border-mywhite/20"
          aria-label="Close video"
        >
        </button>
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          className="w-full max-h-[min(85vh,900px)] object-contain bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

function SourceLink({
  href,
  label,
  name,
}: {
  href: string;
  label: string;
  name: string;
}) {
  const safe =
    typeof href === "string" &&
    href.trim().length > 0 &&
    /^https?:\/\//i.test(href.trim());

  if (!safe) return null;

  const url = href.trim();

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="inline-flex items-center gap-2 mt-4 sm:mt-5 font-body text-sm text-secondary hover:text-highlight underline-offset-4 hover:underline transition-colors duration-200 cursor-pointer relative z-20 pointer-events-auto"
      aria-label={`View ${name} source code on GitHub`}
    >
      <img
        src={github}
        alt=""
        className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 opacity-80"
        aria-hidden="true"
      />
      {label}
    </a>
  );
}

const FeaturedProject = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_video,
  onOpenDemo,
}: ProjectProps) => {
  const hasDemo = Boolean(demo_video && onOpenDemo);

  const imageVisual = (
    <>
      <img
        src={image}
        alt={`${name} screenshot`}
        className="hidden"
        loading="lazy"
      />
      {hasDemo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/demo:bg-black/30 transition-colors pointer-events-none">
          <PlayIcon />
        </div>
      )}
    </>
  );

  return (
    <article className="group col-span-full relative z-10">
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-0 rounded-2xl overflow-hidden border border-mywhite/10 bg-surface hover:border-mywhite/20 transition-colors duration-500">
        {hasDemo ? (
          <button
            type="button"
            onClick={onOpenDemo}
            className="group/demo relative aspect-[4/3] md:aspect-auto md:min-h-[280px] bg-primary bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.02] cursor-pointer border-0 p-0 text-left w-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
            aria-label={`Play ${name} demo video`}
          >
            {imageVisual}
          </button>
        ) : (
          <div
            className="relative aspect-[4/3] md:aspect-auto md:min-h-[280px] bg-primary bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          >
            <img
              src={image}
              alt={`${name} screenshot`}
              className="hidden"
              loading="lazy"
            />
          </div>
        )}

        <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 relative z-10">
          <div>
            <span className="text-tertiary font-body text-sm tracking-wider uppercase">
              Featured
            </span>
            <h3 className="font-title text-mywhite text-2xl sm:text-3xl lg:text-4xl tracking-wide mt-2 leading-tight">
              {name}
            </h3>
            {description && (
              <p className="font-body text-muted text-base leading-relaxed mt-4 max-w-[55ch]">
                {description}
              </p>
            )}
          </div>

          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="font-body text-sm font-medium text-secondary/90 bg-secondary/10 rounded-full px-3 py-1"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {hasDemo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDemo?.();
                }}
                className="mt-4 font-body text-sm text-highlight hover:underline underline-offset-4 text-left"
              >
                Watch demo
              </button>
            )}

            {source_code_link ? (
              <SourceLink href={source_code_link} label="View source" name={name} />
            ) : (
              <p className="mt-5 font-body text-sm text-mywhite/40">
                {hasDemo ? "Private repo" : "Private repository."}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const ProjectCardItem = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  demo_video,
  onOpenDemo,
}: ProjectProps) => {
  const hasDemo = Boolean(demo_video && onOpenDemo);
  const fullCardDemo = hasDemo && !source_code_link;

  const imageVisual = (
    <>
      <img
        src={image}
        alt={`${name} screenshot`}
        className="hidden"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
      {hasDemo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover/demo:bg-black/25 transition-colors pointer-events-none">
          <PlayIcon />
        </div>
      )}
    </>
  );

  return (
    <article
      className={`group relative z-10 flex h-full ${fullCardDemo ? "cursor-pointer" : ""}`}
      onClick={fullCardDemo ? onOpenDemo : undefined}
    >
      <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden border border-mywhite/10 bg-surface hover:border-mywhite/20 transition-colors duration-500">
        {hasDemo ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDemo?.();
            }}
            className="group/demo relative aspect-[16/10] bg-primary bg-center bg-no-repeat overflow-hidden cursor-pointer border-0 p-0 text-left w-full"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
            aria-label={`Play ${name} demo video`}
          >
            {imageVisual}
          </button>
        ) : (
          <div
            className="relative aspect-[16/10] bg-primary bg-center bg-no-repeat overflow-hidden pointer-events-none"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          >
            <img
              src={image}
              alt={`${name} screenshot`}
              className="hidden"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        )}

        <div className="flex flex-col flex-1 p-5 sm:p-6 relative z-10 min-h-0">
          <span className="font-body text-xs text-tertiary tracking-wider uppercase">
            {String(index + 1).padStart(2, "0")}
          </span>

          <h3 className="font-title text-mywhite text-lg sm:text-xl tracking-wide mt-1.5 leading-snug">
            {name}
          </h3>

          {description && (
            <p className="font-body text-muted/80 text-sm leading-relaxed mt-3 max-w-[50ch]">
              {description}
            </p>
          )}

          <div className="mt-auto pt-5">
            <div className="flex flex-wrap items-center gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className="font-body text-xs font-medium text-secondary/80 bg-secondary/10 rounded-full px-2.5 py-0.5"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {hasDemo && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDemo?.();
                }}
                className="mt-3 font-body text-xs text-highlight hover:underline underline-offset-4"
              >
                Watch demo
              </button>
            )}

            {source_code_link ? (
              <SourceLink href={source_code_link} label="View source" name={name} />
            ) : (
              <p className="mt-4 font-body text-xs text-mywhite/40">
                Private repo
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

const ProjectCard = () => {
  const [featured, ...rest] = projects;
  const [videoDemo, setVideoDemo] = React.useState<{
    src: string;
    title: string;
  } | null>(null);

  const openDemo = (src: string, title: string) => {
    setVideoDemo({ src, title });
  };

  return (
    <>
      <motion.div variants={textVariant()} className="mb-4 relative z-[5]">
        <p className="font-body text-sm text-secondary uppercase tracking-widest">
          What I've built
        </p>
        <h2 className="font-title text-mywhite mt-3 text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none">
          Projects
        </h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 0.6)}
        className="font-body text-muted text-base sm:text-lg leading-relaxed max-w-[60ch] mt-4 mb-12 sm:mb-16 relative z-[5]"
      >
        From web and mobile apps to game development and computer vision — here's a selection of what I've been working on.
      </motion.p>

      <motion.div
        variants={fadeIn("up", "tween", 0.15, 0.55)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-[5] isolate"
      >
        <FeaturedProject
          index={0}
          {...featured}
          onOpenDemo={
            featured.demo_video
              ? () => openDemo(featured.demo_video as string, featured.name)
              : undefined
          }
        />

        {rest.map((project, index) => (
          <ProjectCardItem
            key={project.name}
            index={index + 1}
            {...project}
            onOpenDemo={
              project.demo_video
                ? () => openDemo(project.demo_video as string, project.name)
                : undefined
            }
          />
        ))}
      </motion.div>

      {videoDemo && (
        <VideoDemoModal
          src={videoDemo.src}
          title={videoDemo.title}
          onClose={() => setVideoDemo(null)}
        />
      )}
    </>
  );
};

export default SectionWrapper(ProjectCard, "projectcard");
