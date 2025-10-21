import React from "react";
import { FaTwitter, FaGithub, FaDribbble, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section className="w-full">
      <div className="container-outer">
        <div className="mx-auto w-[483px] h-[290px] flex flex-col justify-between items-center text-center">
          <h2 className="font-bold text-[42px] leading-[1.1] text-[#4731D3] dark:text-[#8F88FF]">
            Send me a message!
          </h2>

          <p className="text-[18px] opacity-80">
            Got a question or proposal, or just want <br /> to say hello? Go ahead.
          </p>

          <a
            href="mailto:alinihatpuytu@gmail.com"
            className="underline font-medium hover:opacity-80 text-[#4731D3] dark:text-[#8F88FF]"
          >
            alinihatpuytu@gmail.com
          </a>

          <div className="flex gap-6">
            <a
              href="#"
              aria-label="Twitter"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-[#4731D3] dark:text-[#8F88FF]"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              aria-label="Github"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-[#4731D3] dark:text-[#8F88FF]"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="#"
              aria-label="Dribbble"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-[#4731D3] dark:text-[#8F88FF]"
            >
              <FaDribbble size={20} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              rel="noopener noreferrer"
              className="hover:opacity-80 text-[#4731D3] dark:text-[#8F88FF]"
            >
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
