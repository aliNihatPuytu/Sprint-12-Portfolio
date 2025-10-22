import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Profile from "../components/Profile";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import { useSelector } from "react-redux";
import { useDataQuery } from "../hooks/useDataQuery";

export default function Home() {
  const lang = useSelector(s => s.language.current);
  const theme = useSelector(s => s.theme.mode);
  const { data, isLoading, error } = useDataQuery(lang);

  if (isLoading) return <div className="container-outer py-20">Loading…</div>;
  if (error) return <div className="container-outer py-20 text-red-600">Data error</div>;

  const light = "linear-gradient(90deg,#4731D3 0 66.666%,#CBF281 66.666%)";
  const dark  = "linear-gradient(90deg,#171043 0 66.666%,#1A210B 66.666%)";

  return (
    <div className="bg-white text-gray-900 dark:bg-[#0F1020] dark:text-white overflow-x-hidden">
      <div className="section-flush section-pad h-hero-671 text-white" style={{ backgroundImage: theme === "dark" ? dark : light }}>
        <Navbar />
        <div className="h-full flex items-start">
          <div className="w-full pt-2">
            <Hero t={data} />
          </div>
        </div>
      </div>

      <div className="section-flush section-pad minh-skills-610 bg-white dark:bg-[#141425] flex items-center">
        <Skills t={data} />
      </div>

      <div className="section-flush section-pad minh-profile-552 bg-[#4731D3] dark:bg-[#171043] flex items-center">
        <Profile t={data} />
      </div>

      <div className="section-flush section-pad minh-projects-1039 flex items-center bg-[rgba(203,242,129,0.40)] dark:bg-[#1A210B]">
        <Projects t={data} />
      </div>

      <div className="section-flush section-pad minh-contact-454 bg-white dark:bg-[#0F1020] flex items-center">
        <Contact />
      </div>
    </div>
  );
}
