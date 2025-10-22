import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

export default function Hero({ t }) {
  return (
    <section className="w-full mt-8 md:mt-12 desk:mt-16 lg:mt-16">
      <div
        className="
          container-outer grid grid-cols-1
          desk:[grid-template-columns:minmax(0,955px)_350px]
          lg:[grid-template-columns:minmax(0,955px)_350px]
          gap-8 desk:gap-10 lg:gap-10 items-center
        "
      >
        <div
          className="
            h-auto desk:h-[375.89px] lg:h-[375.89px]
            flex flex-col justify-center
            text-center desk:text-left lg:text-left
          "
        >
          <h1 className="h1-48 shadow-hero-mobile" style={{ color: "#CBF281" }}>
            {t.hero.titleLine1}
            <br />
            {t.hero.titleLine2}
          </h1>

          <p className="mt-6 max-w-md text-[18px] leading-relaxed opacity-90 text-justify mx-auto desk:mx-0 lg:mx-0 light-on-lime-mobile">
            {t.hero.subtitle}
          </p>

          <div className="mt-6 flex gap-4 justify-center desk:justify-start lg:justify-start">
            <a
              href={t.hero.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[120px] h-10 rounded-md bg-white text-[#4731D3]
                         border border-black/10 shadow-sm hover:opacity-90 dark:bg-[#252128] dark:text-white dark:border-white/10"
            >
              <FaGithub /> Github
            </a>
            <a
              href={t.hero.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-[120px] h-10 rounded-md bg-white text-[#4731D3]
                         border border-black/10 shadow-sm hover:opacity-90 dark:bg-[#252128] dark:text-white dark:border-white/10"
            >
              <FaLinkedin /> LinkedIn
            </a>
          </div>
        </div>

        <div
          className="
            justify-self-center desk:justify-self-end lg:justify-self-end
            rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)]
            w-full max-w-[420px]
            h-[320px] sm:h-[360px]
            desk:w-[350px] desk:h-[375.89px]
            lg:w-[350px]  lg:h-[375.89px]
            profile-mobile-gap
          "
        >
          <img src={t.hero.image} alt="profile" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}
