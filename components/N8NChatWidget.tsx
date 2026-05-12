import { useEffect } from "react";

export default function N8NChatWidget() {
  useEffect(() => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href =
      "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
    document.head.appendChild(style);

    const script = document.createElement("script");
    script.type = "module";

    script.innerHTML = `
      import { createChat } from "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js";

      createChat({
        webhookUrl: "https://recolor-hardcopy-curtly.ngrok-free.dev/webhook/024fb15e-9ab3-45f2-8095-1a33ad8d469d/chat",

        defaultLanguage: "ar",

        initialMessages: [
          "👋 مرحبًا بك في شركة الرواد للعقارات",
          "معك أحمد، كيف ممكن أساعدك؟"
        ],

        i18n: {
          ar: {
            title: "👋 أهلاً وسهلاً",
            subtitle: "ابدأ المحادثة، متواجدين لخدمتكم.",
            footer: "",
            getStarted: "ابدأ الآن",
            inputPlaceholder: "اكتب رسالتك هنا..."
          }
        }
      });
    `;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}