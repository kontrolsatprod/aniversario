import {useState} from "react";
import {NewsletterBlockConfig} from "../../../api/config.jsx";

const Newsletter = () => {
    const [formData, setFormData] = useState({
        FNAME: "",
        EMAIL: "",
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    return (
        <div className="w-100 flex flex-col items-center justify-between py-2 mt-6"
             style={{backgroundColor: NewsletterBlockConfig.bgColor}}>
            <h1 className="text-xl uppercase font-black pb-1 px-2 text-center text-white">
                Subscreve a <span className="">newsletter</span>{" "}
            </h1>
            <h1 className="text-xl uppercase font-black pb-1 px-2 text-center text-white">
                Para não peder ofertas
            </h1>
            <form
                action="https://kontrolsat.us14.list-manage.com/subscribe/post?u=9c2c13a48978e3a75c02338dd&amp;id=4fcb3b857a&amp;f_id=00b92ae1f0"
                id="mc-embedded-subscribe-form"
                method="post"
                target="_blank"
                className="flex flex-col w-100 gap-1 justify-center h-auto mt-2"
            >
                <input
                    type="text"
                    name="FNAME"
                    value={formData.FNAME}
                    onChange={handleChange}
                    className="text-sm py-1 ps-3 rounded-sm uppercase text-black mx-3 text-center active:border-none focus:border-none"
                    placeholder="Nome"
                />
                <input
                    type="email"
                    name="EMAIL"
                    value={formData.EMAIL}
                    onChange={handleChange}
                    className="text-sm py-1 ps-3 rounded-sm uppercase text-black mx-3 text-center active:border-none focus:border-none"
                    placeholder="Endereço Email"
                    required
                />
                <input
                    type="hidden"
                    name="b_9c2c13a48978e3a75c02338dd_4fcb3b857a"
                    value=""
                />
                <input
                    type="submit"
                    value="Enviar"
                    className="py-1 mx-3 uppercase font-black text-sm rounded-sm "
                    style={{
                        backgroundColor: NewsletterBlockConfig.btnBgColor,
                        color: NewsletterBlockConfig.btnTextColor
                    }}
                />
            </form>
        </div>
    );
};

export default Newsletter;
