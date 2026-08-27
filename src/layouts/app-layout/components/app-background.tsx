export function AppBackground() {
    return (
        <>
            {/* Global ambient background */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#020617]"
            >
                {/* Blue glow */}
                <div
                    className="
                        absolute
                        left-[-12%]
                        top-[-10%]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-blue-600/15
                        blur-[150px]
                    "
                />

                {/* Violet glow */}
                <div
                    className="
                        absolute
                        right-[-12%]
                        top-[15%]
                        h-[520px]
                        w-[520px]
                        rounded-full
                        bg-violet-600/10
                        blur-[160px]
                    "
                />

                {/* Cyan glow */}
                <div
                    className="
                        absolute
                        bottom-[-15%]
                        left-[30%]
                        h-[480px]
                        w-[480px]
                        rounded-full
                        bg-cyan-500/10
                        blur-[150px]
                    "
                />

                {/* Subtle grid */}
                <div
                    className="
                        absolute
                        inset-0
                        opacity-[0.025]
                        [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)]
                        [background-size:40px_40px]
                    "
                />
            </div>
        </>
    );
}