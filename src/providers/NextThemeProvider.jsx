
"use client";

import { ThemeProvider } from "next-themes";

const NextThemeProvider = ({children}) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            {children}
        </ThemeProvider>

    );
};

export default NextThemeProvider;


// // app/providers.tsx
//

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//
//   );
// }