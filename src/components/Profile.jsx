import React from 'react'

export default function Profile({ t }) {
  return (
    <section className="section">
      <div className="container-outer grid md:grid-cols-3 gap-10">
        <div>
          <h2 className="h1-48 text-brand-lime mb-6">{t.profile.title}</h2>

          <div className="card bg-brand-purple dark:bg-brand-darkbg text-white">
            <h3 className="font-semibold mb-4">{t.profile.basicInfo}</h3>
            <dl className="grid grid-cols-3 gap-y-3 text-sm">
              {t.profile.rows.map((r, idx) => (
                <React.Fragment key={idx}>
                  <dt className="opacity-80">{r.label}</dt>
                  <dd className="col-span-2">{r.value}</dd>
                </React.Fragment>
              ))}
            </dl>
          </div>
        </div>

        <div className="place-self-center">
          <div className="rounded-xl2 overflow-hidden shadow-soft w-[300px] h-[260px]">
            <img
              src="https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1200&auto=format&fit=crop"
              alt="workspace"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="card bg-brand-purple dark:bg-brand-darkbg text-white">
          <h3 className="font-semibold mb-4">{t.profile.aboutTitle}</h3>
          <p className="text-sm leading-relaxed opacity-90">{t.profile.aboutText1}</p>
          <p className="text-sm leading-relaxed opacity-90 p-gap">{t.profile.aboutText2}</p>
        </div>
      </div>
    </section>
  )
}
