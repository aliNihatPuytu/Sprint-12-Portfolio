import React from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm"; 
import { useSelector } from "react-redux";
import { useDataQuery } from "../hooks/useDataQuery"; 
import { FaTwitter, FaGithub, FaDribbble, FaInstagram } from "react-icons/fa"; 

const socialIcons = {
  Twitter: <FaTwitter size={20} />,
  Github: <FaGithub size={20} />,
  Dribbble: <FaDribbble size={20} />,
  Instagram: <FaInstagram size={20} />,
};

export default function ContactPage() {
  const theme = useSelector(s => s.theme.mode);
  const lang = useSelector(s => s.language.current); 
  const { data, isLoading, error } = useDataQuery(lang); 

  const light = "linear-gradient(90deg, #4731D3 0 66.666%, #CBF281 66.666%)";
  const dark  = "linear-gradient(90deg, #171043 0 66.666%, #1A210B 66.666%)";

  if (isLoading) return <div className="container-outer py-20">Loading...</div>;
  if (error) return <div className="container-outer py-20 text-red-600">Data error</div>;

  const t = data.contact; 
  const contactColor = "text-[#CBF281] dark:text-[#CBF281]"; 
  const dividerText = lang === 'tr' ? 'Veya Diğer Platformlardan Ulaşın' : 'Or Connect Via';

  return (
    <div className="bg-white text-gray-900 dark:bg-[#0F1020] dark:text-white min-h-screen flex flex-col">
      
      <header style={{ backgroundImage: theme === "dark" ? dark : light }} className="text-white">
        <Navbar />
      </header>

      <main 
        className="flex-grow flex items-center justify-center py-16 md:py-24"
        style={{ backgroundImage: theme === "dark" ? dark : light }}
      >
        <div className="container-outer max-w-xl mx-auto">

          <div className="text-center">
            <h2 className={`font-bold ${contactColor}`} style={{ fontSize: 48, lineHeight: 1.1 }}>
              {t.title}
            </h2>
            <p className="text-[18px] opacity-80 mt-6 max-w-lg mx-auto text-[#CBF281]">
              {t.subtitle}
            </p>
          </div>

          <div className="bg-white dark:bg-[#1E1E1E] p-8 md:p-12 rounded-2xl shadow-2xl mt-12">
            <ContactForm />
          </div>
          
          <div className="text-center my-8 text-sm uppercase font-medium text-[#CBF281]/60">
            {dividerText}
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex gap-6 justify-center">
                {t.socials.map((social) => (
                  <a 
                      key={social.label} 
                      href={social.href} 
                      aria-label={social.label} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`hover:opacity-80 ${contactColor}`} 
                    >
                    {socialIcons[social.label] || social.label}
                  </a>
                ))}
              </div>
            <a
                  href={`mailto:${t.email}`}
                  className={`underline font-medium hover:opacity-80 ${contactColor} text-lg`} 
                >
                  {t.email}
                </a>
          </div>
        </div>
      </main>
    </div>
  );
}