import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll,
            );
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!visible) {
        return null;
    }

    return (
        <Button
            size="icon"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="
                fixed
                bottom-6
                right-6
                z-50
                h-11
                w-11
                rounded-full
                border
                border-white/10
                bg-blue-600
                text-white
                shadow-xl
                shadow-blue-600/20
                transition-all
                duration-300
                hover:scale-110
                hover:bg-blue-500
                hover:shadow-blue-500/30
                md:bottom-8
                md:right-8
            "
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    );
}