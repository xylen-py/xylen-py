export const BadgeSVGs: Record<string, React.FC<{ className?: string }>> = {
    "Discord Employee": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M19.73 4.87l-1.58-1.44a1.47 1.47 0 00-2 0L12 7.02 7.85 3.43a1.47 1.47 0 00-2 0L4.27 4.87a1.47 1.47 0 000 2.12L8.44 11 4.27 15a1.47 1.47 0 000 2.12l1.58 1.45a1.47 1.47 0 002 0L12 14.98l4.15 3.59a1.47 1.47 0 002 0l1.58-1.45a1.47 1.47 0 000-2.12L15.56 11l4.17-4a1.47 1.47 0 000-2.13z" fill="#5865F2" />
        </svg>
    ),
    "Partnered Server Owner": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z" fill="#5865F2" />
            <path d="M15.22 9.33L11.4 16l-2.62-3.33L11.4 9l3.82.33z" fill="#fff" />
        </svg>
    ),
    "HypeSquad Events": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z" fill="#F47B67" />
            <path d="M7 15l5-10 5 10H7z" fill="#fff" />
        </svg>
    ),
    "HypeSquad Bravery": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z" fill="#9B84EE" />
            <path d="M12 5l2.47 5.01L20 10.97l-4 3.9.94 5.5L12 17.77l-4.94 2.6.94-5.5-4-3.9 5.53-.96L12 5z" fill="#fff" />
        </svg>
    ),
    "HypeSquad Brilliance": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z" fill="#F47B67" />
            <path d="M12 5l2.47 5.01L20 10.97l-4 3.9.94 5.5L12 17.77l-4.94 2.6.94-5.5-4-3.9 5.53-.96L12 5z" fill="#fff" />
        </svg>
    ),
    "HypeSquad Balance": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2 12a10 10 0 1020 0 10 10 0 00-20 0z" fill="#45DDC0" />
            <path d="M12 5l2.47 5.01L20 10.97l-4 3.9.94 5.5L12 17.77l-4.94 2.6.94-5.5-4-3.9 5.53-.96L12 5z" fill="#fff" />
        </svg>
    ),
    "Bug Hunter Level 1": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#3BA55D" />
            <path d="M15 8l-1.5 3H15l-3 5 1.5-3H11l3-5z" fill="#fff" />
        </svg>
    ),
    "Bug Hunter Level 2": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#F0B132" />
            <path d="M15 8l-1.5 3H15l-3 5 1.5-3H11l3-5z" fill="#fff" />
        </svg>
    ),
    "Early Supporter": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#F47FFF" />
            <path d="M12 6l1.5 3.5H17l-3 2.5 1 3.5-3-2-3 2 1-3.5-3-2.5h3.5L12 6z" fill="#fff" />
        </svg>
    ),
    "Verified Bot Developer": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M22.25 12c0 2.35-.75 4.38-2.25 6.08A10.07 10.07 0 0112 22.25 10.07 10.07 0 013.75 18.08 9.93 9.93 0 011.75 12 10.08 10.08 0 0112 1.75 10.08 10.08 0 0122.25 12z" fill="#5865F2" />
            <path d="M10.5 15.75l-3.5-3.5 1.5-1.5 2 2 5-5 1.5 1.5-6.5 6.5z" fill="#fff" />
        </svg>
    ),
    "Active Developer": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M6.478 7.825l-.14.17a11.94 11.94 0 00-2.09 4.55c-.05.23-.09.46-.12.69l-.01.08v.13a.96.96 0 001.17.84l1.67-.39a.49.49 0 01.59.36l.39 1.49c.07.27.32.45.6.45h.38a.6.6 0 00.53-.32l1.07-2.14a.49.49 0 01.44-.27h3.66a.49.49 0 01.44.27l1.07 2.14a.6.6 0 00.53.32h.38a.6.6 0 00.6-.45l.39-1.49a.49.49 0 01.59-.36l1.67.39a.96.96 0 001.17-.84v-.13l-.01-.08c-.03-.23-.07-.46-.12-.69a11.94 11.94 0 00-2.09-4.55l-.14-.17a.5.5 0 00-.64-.09L14.59 9.4a.49.49 0 01-.68-.17l-.73-1.26a.5.5 0 00-.43-.25h-1.5a.5.5 0 00-.43.25l-.73 1.26a.49.49 0 01-.68.17L7.118 7.735a.5.5 0 00-.64.09z" fill="#3BA55D" />
        </svg>
    ),
    "Nitro": ({ className }) => (
        <svg className={className} viewBox="0 0 24 24" fill="none" width="20" height="20">
            <path d="M2.01 7.711l9.374-4.57c.38-.185.83-.185 1.21 0l9.374 4.57a.7.7 0 01.4.63v7.51a.7.7 0 01-.4.63l-9.374 4.57c-.38.185-.83.185-1.21 0L2.01 16.481a.7.7 0 01-.4-.63v-7.51a.7.7 0 01.4-.63z" fill="#FF73FA" />
            <path d="M15.61 13.16L12 15.36l-3.61-2.2V8.76L12 6.56l3.61 2.2v4.4z" fill="#fff" />
        </svg>
    ),
};

export const BadgeNames = Object.keys(BadgeSVGs);
