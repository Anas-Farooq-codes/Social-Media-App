"use client";
import React, { useCallback, useEffect, useState } from "react";
import css from "@/styles/siderbar.module.css";
import Box from "./Box/Box";
import { sidebarRoutes } from "@/lib/sidebarRoutes";
import Link from "next/link";
import { Typography } from "antd";
import { Icon } from "@iconify/react";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import cx from "classnames";
import { useSettingsContext } from "@/context/settings/settings-context";
import SidebarContainer from "./SidebarContainer";

const Sidebar = () => {
  const router = useRouter();
  const { signOut } = useClerk();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  },[])

  const {
    settings: { isSidebarOpen },
    setSettings,
  } = useSettingsContext();

  const handleDrawerClose = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      isSidebarOpen: false
    }));
  }, [setSettings]);


  const isActive = (route) => {
    if (route.route === pathname) return css.active;
  };

  const activeColor = (route) => {
    return isActive(route) && "var(--primary)";
  };
  return mounted && <SidebarContainer
    isDrawerOpen = {isSidebarOpen}
    setIsDrawerOpen = {handleDrawerClose}>
      <div className={css.wrapper}>
        <Box className={css.container}>
          {sidebarRoutes().map((route, index) => (
            <Link
              key={index}
              href={route.route}
              className={cx(css.item, isActive(route))}
            >
              {/* Icon  */}

              <Typography
                style={{
                  color: activeColor(route),
                }}
              >
                <Icon icon={route.icon} width={"20px"} />
              </Typography>

              {/* name  */}

              <Typography
                style={{
                  color: activeColor(route),
                }}
                className="typoSubtitle2"
              >
                {route.name}
              </Typography>
            </Link>
          ))}

          <Link
            href={""}
            onClick={() => {
              signOut(() => router.push("/sign-in"));
            }}
            className={css.item}
          >
            {/* Icon  */}

            <Typography>
              <Icon icon={"solar:logout-2-bold"} width={"20px"} />
            </Typography>

            {/* name  */}

            <Typography className="typoSubtitle2">Sign out</Typography>
          </Link>
        </Box>
      </div>
    </SidebarContainer>
};

export default Sidebar;
