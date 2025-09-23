import {useState} from "react";
import {useConfig} from "../../../config/configContext";

export default function Newsletter() {
    const cfg = useConfig();
    const ncfg = cfg?.NewsletterBlockConfig || {};

    const bg = ncfg.bgColor ?? "#0075cf";
    const btnBg = ncfg.btnBgColor ?? "#fa3a3a";
    const btnText = ncfg.btnTextColor ?? "#ffffff";
    const textColor = ncfg.textColor ?? "#ffffff";

    const title = ncfg.title ?? "Subscreve a Newsletter";
    const subtitle = ncfg.subtitle ?? "para não perder ofertas";
    const formAction = ncfg.formAction || "#";
    const namePh = ncfg.namePlaceholder ?? "Nome";
    const emailPh = ncfg.emailPlaceholder ?? "Email";
    const btnLabel = ncfg.btnLabel ?? "Enviar";
    const honeypotName = ncfg.honeypotName ?? "hp_field";

    const [formData, setFormData] = useState({FNAME: "", EMAIL: ""});

    const onChange = (e) => {
        const {name, value} = e.target;
        setFormData((s) => ({...s, [name]: value}));
    };

    return (
        <section
            className="w-full py-8 my-12 flex flex-col items-center gap-3"
            style={{backgroundColor: bg}}
            aria-labelledby="newsletter-title"
        >
            <h1
                id="newsletter-title"
                className="text-2xl md:text-4xl font-black uppercase text-center leading-tight"
                style={{color: textColor}}
            >
                {title}
            </h1>
            <h2
                className="text-xl md:text-3xl font-black uppercase text-center -mt-1"
                style={{color: textColor}}
            >
                {subtitle}
            </h2>

            <form
                action={formAction}
                method="post"
                target="_blank"
                className="mt-2 w-full max-w-3xl px-4 flex flex-col sm:flex-row gap-2 items-stretch"
            >
                <input
                    className="px-3 py-2 rounded-md uppercase text-black outline-none focus:ring-2 focus:ring-white/50"
                    type="text"
                    name="FNAME"
                    placeholder={namePh}
                    value={formData.FNAME}
                    onChange={onChange}
                    aria-label="Nome"
                />

                <input
                    className="px-3 py-2 rounded-md uppercase text-black outline-none focus:ring-2 focus:ring-white/50 flex-1"
                    type="email"
                    name="EMAIL"
                    placeholder={emailPh}
                    value={formData.EMAIL}
                    onChange={onChange}
                    required
                    aria-label="Email"
                />

                {/* honeypot (Mailchimp ou equivalente) */}
                <input type="hidden" name={honeypotName} value=""/>

                <button
                    type="submit"
                    className="px-4 py-2 rounded-md font-black uppercase shrink-0 hover:scale-105 transition-transform"
                    style={{backgroundColor: btnBg, color: btnText}}
                >
                    {btnLabel}
                </button>
            </form>
        </section>
    );
}
