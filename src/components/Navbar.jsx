import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/slices/themeSlice.js";
import { switchLanguage } from "../store/slices/languageSlice.js";

export default function Navbar() {
  const dispatch = useDispatch();
  const mode = useSelector((s) => s.theme.mode);
  const lang = useSelector((s) => s.language.current);

  const logoColor    = "text-[#CBF281] dark:text-[#CBF281]";
  const navLinkColor = "text-[#CBF281] dark:text-[#8F88FF] nav-safe";
  const linkBase     = "text-[14px] font-medium hover:opacity-90 transition-colors";

  const langLabel  = lang === "tr" ? "SWITCH TO ENGLISH" : "TÜRKÇE'YE GEÇ";
  const themeLabel = mode === "dark" ? "LIGHT MODE" : "DARK MODE";

  return (
    <nav className="pt-6">
      <div className="container-outer grid grid-cols-1 gap-y-3 md:[grid-template-columns:1fr_auto_1fr] items-center">
        <div className="justify-self-start">
          <Link to="/" className={`text-[28px] font-bold ${logoColor}`}>ali nihat</Link>
        </div>

        <div className="justify-self-center">
          <ul className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
            <li><NavLink to="/"         className={`${linkBase} ${navLinkColor} shadow-contrast`}>Home</NavLink></li>
            <li><NavLink to="/projects" className={`${linkBase} ${navLinkColor} shadow-contrast`}>Projects</NavLink></li>
            <li><NavLink to="/contact"  className={`${linkBase} ${navLinkColor} shadow-contrast`}>Contact</NavLink></li>
          </ul>
        </div>

        <div className="justify-self-end flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => dispatch(switchLanguage())}
            className={`hover:opacity-90 transition-colors ${navLinkColor} text-[12px] font-bold`}
          >
            {langLabel}
          </button>

          <div className="flex items-center ml-1 gap-1">
            <button
              type="button"
              onClick={() => dispatch(toggleTheme())}
              aria-label="Toggle dark mode"
              className="relative w-14 h-7 rounded-full transition-colors ring-1 ring-black/10 dark:ring-white/10"
              style={{ background: "#4731D3" }}
            >
              <span
                className="absolute top-1 left-1 w-5 h-5 rounded-full transition-all shadow"
                style={{
                  background: "#CBF281",
                  transform: mode === "dark" ? "translateX(28px)" : "translateX(0)",
                }}
              />
            </button>
            <span className="text-[12px] font-bold text-[#4731D3] dark:text-[#CBF281]">
              {themeLabel}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
