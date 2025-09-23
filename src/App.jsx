import {useEffect, useState} from "react";
import DesktopPage from "./pages/DesktopPage.jsx";
import MobilePage from "./pages/MobilePage.jsx";
import {buildConfigFromData} from "./adapter/buildConfigFromData.jsx";
import {ConfigProvider} from "./config/configContext.jsx";

export default function App() {
    const [isMobile, setIsMobile] = useState(false);
    const [config, setConfig] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const check = () => setIsMobile(window.matchMedia("(max-width: 600px)").matches);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        const el = document.getElementById("lp-root");
        const api = el?.getAttribute("data-api");
        if (!api) return setError("Missing data-api on #lp-root");
        (async () => {
            try {
                const res = await fetch(api, {headers: {Accept: "application/json"}});
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const payload = await res.json();
                setConfig(buildConfigFromData(payload.data || {}));
            } catch (e) {
                console.error(e);
                setError("Não foi possível carregar a landing.");
            }
        })();
    }, []);

    if (error) return <div style={{padding: 16, color: "#b91c1c"}}>{error}</div>;
    if (!config) return <div style={{padding: 16}}>A carregar…</div>;

    return (
        <ConfigProvider config={config}>
            {isMobile ? <MobilePage/> : <DesktopPage/>}
        </ConfigProvider>
    );
}
