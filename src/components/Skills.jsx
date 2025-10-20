import React from 'react'

export default function Skills({ t }) {
  const col2 = t.skills.items.filter(x => ['JAVASCRIPT','REACT','REDUX'].includes(x.name))
  const col3 = t.skills.items.filter(x => ['NODE','VS CODE','FIGMA'].includes(x.name))

  const Row = ({ it }) => (
    <div className="flex items-center gap-5">
      <img src={it.icon} alt={it.name} className="w-16 h-16 rounded-md"/>
      <span className="text-lg">{it.name}</span>
    </div>
  )

  return (
    <section className="section bg-white dark:bg-brand-darkpanel/40">
      <div className="container-outer grid md:grid-cols-3 gap-10 items-start">
        <div>
          <h2 className="h1-48 text-brand-purple dark:text-white">{t.skills.title}</h2>
        </div>

        <div className="flex flex-col gap-8">
          {col2.map((it, i) => <Row key={i} it={it} />)}
        </div>

        <div className="flex flex-col gap-8">
          {col3.map((it, i) => <Row key={i} it={it} />)}
        </div>
      </div>
    </section>
  )
}
