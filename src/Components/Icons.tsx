const Icons = ({
    name,
    className = "w-5 h-5",
}: {
    name:
    | "search"
    | "filter"
    | "chevDown"
    | "edit"
    | "trash"
    | "eye"
    | "home"
    | "users"
    | "heart"
    | "store"
    | "sparkles"
    | "folder"
    | "logout"
    | "sort";
    className?: string;
}) => {
    const common = { className, fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
    switch (name) {
        case "search":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <circle cx="11" cy="11" r="7" />
                    <path d="M20 20l-3.5-3.5" />
                </svg>
            );
        case "filter":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M4 5h16" />
                    <path d="M7 12h10" />
                    <path d="M10 19h4" />
                </svg>
            );
        case "chevDown":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M6 9l6 6 6-6" />
                </svg>
            );
        case "edit":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z" />
                </svg>
            );
        case "trash":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M19 6l-1 14H6L5 6" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                </svg>
            );
        case "eye":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                    <circle cx="12" cy="12" r="2.5" />
                </svg>
            );
        case "home":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M3 10.5L12 3l9 7.5" />
                    <path d="M5 10v11h14V10" />
                </svg>
            );
        case "users":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9.5" cy="8" r="3" />
                    <path d="M22 21v-2a3.5 3.5 0 0 0-2.6-3.4" />
                    <path d="M16.5 3.8A3 3 0 0 1 18 6.5a3 3 0 0 1-1.6 2.7" />
                </svg>
            );
        case "heart":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M20.8 4.6a5 5 0 0 0-7.1 0L12 6.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21l8.8-9.3a5 5 0 0 0 0-7.1z" />
                </svg>
            );
        case "store":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M3 7l1-3h16l1 3" />
                    <path d="M4 10h16v10H4z" />
                    <path d="M9 21V14h6v7" />
                </svg>
            );
        case "sparkles":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M12 2l1.2 4.2L17 7.5l-3.8 1.3L12 13l-1.2-4.2L7 7.5l3.8-1.3L12 2z" />
                    <path d="M19 13l.7 2.4L22 16l-2.3.6L19 19l-.7-2.4L16 16l2.3-.6L19 13z" />
                    <path d="M5 14l.9 3L9 18l-3.1.8L5 22l-.9-3L1 18l3.1-1L5 14z" />
                </svg>
            );
        case "folder":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M3 6h7l2 2h9v12H3z" />
                </svg>
            );
        case "logout":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M10 17l5-5-5-5" />
                    <path d="M15 12H3" />
                    <path d="M21 21V3" />
                </svg>
            );
        case "sort":
            return (
                <svg viewBox="0 0 24 24" {...common}>
                    <path d="M8 7h8" />
                    <path d="M10 11h6" />
                    <path d="M12 15h4" />
                </svg>
            );
        default:
            return null;
    }
}

export default Icons