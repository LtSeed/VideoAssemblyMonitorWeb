//
// LanguageContext.tsx
//
// 提供一个上下文，用于在全局范围管理当前语言
//

import React, { createContext, useContext, useState, ReactNode } from "react";
import { TextInterface, ChineseText, EnglishText } from "./language.ts";

interface LanguageContextProps {
    language: TextInterface;
    currentLangKey: string;
    changeLanguage: (langKey: string) => void;
}

const defaultContextValue: LanguageContextProps = {
    language: ChineseText,
    currentLangKey: "zh",
    changeLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextProps>(defaultContextValue);

export const useLanguage = (): LanguageContextProps => {
    return useContext(LanguageContext);
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [langKey, setLangKey] = useState<string>("zh");

    const language = langKey === "zh" ? ChineseText : EnglishText;

    const changeLanguage = (newLangKey: string) => {
        setLangKey(newLangKey);
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                currentLangKey: langKey,
                changeLanguage,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};
