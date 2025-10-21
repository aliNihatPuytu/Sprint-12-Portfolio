import React from "react";

export default function Skills({ t }) {
  const col2 = t.skills.items.filter(x => ["JAVASCRIPT", "REACT", "REDUX"].includes(x.name));
  const col3 = t.skills.items.filter(x => ["NODE", "VS CODE", "FIGMA"].includes(x.name));

  const Row = ({ it }) => (
    <div className="flex items-center gap-4" style={{ width: "290px", height: "120px" }}>
      <img src={it.icon} alt={it.name} style={{ width: 120, height: 120 }} className="rounded-md" />
      <span className="text-lg">{it.name}</span>
    </div>
  );

  return (
    <section className="w-full">
      <div className="container-outer grid md:grid-cols-3 gap-10 items-start">
        <div className="self-start">
          <h2 className="h1-48 m-0 text-[#4731D3] dark:text-[#CBF281]">
            {t.skills.title}
          </h2>
        </div>

        <div className="flex flex-col gap-4 self-start">
          {col2.map((it, i) => <Row key={i} it={it} />)}
        </div>

        <div className="flex flex-col gap-4 self-start">
          {col3.map((it, i) => <Row key={i} it={it} />)}
        </div>
      </div>
    </section>
  );
}