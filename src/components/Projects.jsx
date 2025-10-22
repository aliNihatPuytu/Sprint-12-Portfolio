import React from "react";
import ProjectCard from "./ProjectCard";

export default function Projects({ t }) {
  const title = t?.projects?.title ?? "Projects";
  const items = t?.projects?.items ?? [];

  return (
    <section className="w-full">
      <div className="container-outer">
        <h2 className="h1-48 mb-10 text-[#4731D3] dark:text-[#CBF281]">
          {title}
        </h2>

        <div className="flex flex-col gap-8 sm:gap-10 items-center">
          {items.map((p, i) => (
            <ProjectCard key={p?.id ?? i} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
