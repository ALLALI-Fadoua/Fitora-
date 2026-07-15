import { useEffect, useState } from "react";

// خطاف بسيط لمراقبة نقاط التوقف — جاهز للاستخدام عند بناء تجارب مختلفة للجوال/سطح المكتب
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
