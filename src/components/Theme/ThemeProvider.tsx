import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface ThemeContextProps {
    theme: string;
    updateTheme: (theme: string) => void;
    supportedThemes: typeof supportedThemes;
}

const supportedThemes = ['winter', 'dim', 'pastel', 'luxury'] as const;


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<string>(() => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            return storedTheme && supportedThemes.includes(storedTheme as any) ? storedTheme : supportedThemes[0];
        }
        return supportedThemes[0];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }
    }, [theme]);

    const updateTheme = (newTheme: string) => {
        if (supportedThemes.includes(newTheme as any)) {
            setTheme(newTheme);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme, supportedThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};
