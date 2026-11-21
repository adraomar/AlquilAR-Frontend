import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            window.scrollTo({
                top: 0,
                behavior: 'instant'
            });
            return;
        }

        const id = decodeURIComponent(hash.substring(1));

        const desplazamiento = requestAnimationFrame(() => {
            document.getElementById(id)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });

        return () => cancelAnimationFrame(desplazamiento);
    }, [pathname, hash]);

    return null
}

export default ScrollManager