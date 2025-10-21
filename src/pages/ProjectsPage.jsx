import React from "react";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Contact from "../components/Contact"; 
import { useSelector } from "react-redux";
import { useDataQuery } from "../hooks/useDataQuery";

export default function ProjectsPage() {
  const lang = useSelector(s => s.language.current);
  const theme = useSelector(s => s.theme.mode);
  const { data, isLoading, error } = useDataQuery(lang);

  if (isLoading) return <div className="container-outer py-20">Loading...</div>;
  if (error) return <div className="container-outer py-20 text-red-600">Data error</div>;
 

  const lightGradient = "linear-gradient(90deg, #4731D3 0 66.666%, #CBF281 66.666%)";
  const darkGradient  = "linear-gradient(90deg, #171043 0 66.666%, #1A210B 66.666%)";

  return (

    <div className="bg-white text-gray-900 dark:bg-[#0F1020] dark:text-white min-h-screen flex flex-col">
      
      <header style={{ backgroundImage: theme === "dark" ? darkGradient : lightGradient }} className="text-white">
        <Navbar />
      </header>


      <main 
        className="flex-grow content-center py-16 md:py-24"
        style={{ backgroundImage: theme === "dark" ? darkGradient : lightGradient }}
      >
        <Projects t={data} />
      </main>

      <footer className="section-flush minh-contact-454 bg-white dark:bg-[#0F1020] flex items-center">
        <Contact />
      </footer>
    </div>
  );
}