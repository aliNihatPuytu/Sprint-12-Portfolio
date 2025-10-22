import React from "react";

export default function Profile({ t }) {
  const P = t?.profile ?? {};
  const L = P.labels ?? {};
  const lines = (x) => (Array.isArray(x) ? x : [x]);

  const rows = [
    { label: lines(L.birthDate ?? "Doğum tarihi"), value: P.birthDate },
    { label: lines(L.city ?? "İkamet Şehri"), value: P.city },
    { label: lines(L.education ?? ["Eğitim", "Durumu"]), value: P.education },
    { label: lines(L.role      ?? ["Tercih Ettiği", "Rol"]), value: P.role },
  ];

  const sectionTitle = P.sectionTitle ?? "Profile";
  const basicTitle   = P.basicTitle   ?? "Temel Bilgiler";
  const aboutTitle   = P.aboutTitle   ?? "Hakkımda";

  const imgUrl = new URL("../assets/images/profile-section.jpg", import.meta.url).toString();

  return (
    <section className="w-full">
      <div className="container-outer">
        <h2
          className="font-bold mb-6"
          style={{ fontSize: 48, lineHeight: 1.1, color: "#CBF281" }}
        >
          {sectionTitle}
        </h2>

        <div
          className="
            grid grid-cols-1
            md:[grid-template-columns:1fr_auto_1fr]
            md:gap-[30px] gap-y-10
            items-start md:h-[292px]
          "
        >
          <div className="w-full md:h-[292px] overflow-hidden">
            <h3 className="text-white text-2xl font-semibold text-soft-mobile">
              {basicTitle}
            </h3>

            <dl className="mt-6 grid grid-cols-[120px_1fr] gap-y-4 profile-rows-gap text-sm">
              {rows.map((r, i) => (
                <React.Fragment key={i}>
                  <dt className="text-[#CBF281] font-semibold leading-tight">
                    {r.label.map((ln, k) => (
                      <span key={k} className="block">
                        {ln}
                      </span>
                    ))}
                  </dt>
                  <dd className="text-white leading-tight whitespace-pre-line text-soft-mobile">
                    {r.value}
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </div>

          <div className="w-full md:h-[292px] profile-mobile-gap flex md:justify-center">
            <div className="w-full h-[240px] md:w-[300px] md:h-[292px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
              <img src={imgUrl} alt="workspace" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="w-full md:h-[292px] overflow-hidden px-4 sm:px-6 md:px-0">
            <h3 className="text-white text-2xl font-semibold text-soft-mobile">
              {aboutTitle}
            </h3>

            <div className="mt-4 space-y-4 md:max-h-[240px]">
              <p
                className="text-white/90 text-soft-mobile leading-relaxed text-left md:text-justify break-words overflow-hidden"
                style={{ display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical" }}
              >
                {P.aboutText1}
              </p>
              <p
                className="text-white/90 text-soft-mobile leading-relaxed text-left md:text-justify break-words overflow-hidden"
                style={{ display: "-webkit-box", WebkitLineClamp: 5, WebkitBoxOrient: "vertical" }}
              >
                {P.aboutText2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
