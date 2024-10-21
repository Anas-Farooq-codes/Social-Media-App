import useWindowDimensions from '@/hooks/useWindowsDimensions'
import { Drawer } from 'antd'
import React, { useState, useEffect } from 'react'
import css from "@/styles/siderbar.module.css"

const SidebarContainer = ({ 
    isDrawerOpen,
    setIsDrawerOpen,
    children,
    ...other
}) => {

    const { width } = useWindowDimensions();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true); // Component is now mounted
    }, []);

    if (!mounted) {
        return null; // Don't render anything during SSR
    }

    if (width <= 1268) {
        return (
            <Drawer
                open={isDrawerOpen}
                placement='left'
                onClose={() => setIsDrawerOpen(false)}
                {...other}
                height={"100%"}
                className={css.sidebarContainer}
            >
                <div className={css.drawerContainer}>
                    {children}
                </div>
            </Drawer>
        );
    } else {
        return children;
    }
}

export default SidebarContainer;
