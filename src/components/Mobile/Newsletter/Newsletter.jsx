import { useState } from "react";
import { useConfig } from "../../../config/configContext.jsx";

export default function Newsletter() {
  const cfg = useConfig() || {};
  const n = cfg.NewsletterBlockConfig || {};

  const [formData, setFormData] = useState({ FNAME: "", EMAIL: "" });
  const onChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  return (
    <section
      className="w-full flex flex-col items-center justify-between py-4 mt-6 px-3"
      style={{ backgroundColor: n.bgColor }}
      aria-labelledby="newsletter-title"
    >
      <h1
        id="newsletter-title"
        className="text-xl uppercase font-black text-center"
        style={{ color: n.textColor }}
      >
        {n.title}
      </h1>
      <h2
        className="text-xl uppercase font-black text-center"
        style={{ color: n.textColor }}
      >
        {n.subtitle}
      </h2>

      <form
        action={n.formAction}
        method="post"
        target="_blank"
        className="mt-2 w-full max-w-md flex flex-col gap-2"
      >
        <input
          type="text"
          name="FNAME"
          value={formData.FNAME}
          onChange={onChange}
          className="px-3 py-2 rounded-sm uppercase text-black text-sm text-center outline-none focus:ring-2 focus:ring-white/60"
          placeholder={n.namePlaceholder}
          aria-label={n.namePlaceholder}
        />

        <input
          type="email"
          name="EMAIL"
          value={formData.EMAIL}
          onChange={onChange}
          className="px-3 py-2 rounded-sm uppercase text-black text-sm text-center outline-none focus:ring-2 focus:ring-white/60"
          placeholder={n.emailPlaceholder}
          required
          aria-label={n.emailPlaceholder}
        />

        {/* Honeypot opcional (Mailchimp) */}
        {n.honeypotName ? (
          <input type="hidden" name={n.honeypotName} value="" />
        ) : null}

        <button
          type="submit"
          className="py-2 mx-3 uppercase font-black text-sm rounded-sm transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: n.btnBgColor, color: n.btnTextColor }}
        >
          {n.btnLabel}
        </button>
      </form>
    </section>
  );
}
