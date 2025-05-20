'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';
import { emptyFruitEnum, initialStateTypes, userAccountEnum } from '@/store/appContext/types';



// Create context
const ThemeContext = createContext<initialStateTypes | undefined>(undefined);

export const initialrandomFruits = [emptyFruitEnum, emptyFruitEnum, emptyFruitEnum]

// Create a provider component
export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const stateRandomFruits = useState(initialrandomFruits);
    const stateUserAccount = useState(userAccountEnum);


    return (
        <ThemeContext.Provider value={{ stateRandomFruits, stateUserAccount }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook to use the context
export const useAppContext = () => useContext(ThemeContext);