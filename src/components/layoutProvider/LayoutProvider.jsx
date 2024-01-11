// Use the client directive for using usePathname hook.
'use client'

// Use usePathname for catching route name.
import { usePathname } from 'next/navigation';
import Footer from '../footer/Footer';
import Navbar from '../navbar/Navbar';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { useEffect } from 'react';

export const LayoutProvider = ({
    children
}) => {
    const pathname = usePathname();
    const queryClient = new QueryClient()

    // I don't want /city to be on the top when I change the params
    useEffect(() => {
        if (!pathname.includes("catalog")) {
            window.scrollTo(0, 0)
        }
    }, [pathname])

    return (
        <>
            <QueryClientProvider client={queryClient}>
                {pathname !== '/login' && pathname !== '/signup' && <Navbar />}
                {children}
                {pathname !== '/login' && pathname !== '/signup' && <Footer />}
            </QueryClientProvider>
        </>
    )
};