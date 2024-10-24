"use client";
import React from 'react'
import css from "@/styles/header.module.css"
import Box from './Box/Box'
import Image from 'next/image'
import { Flex } from 'antd'
import ModeButton from './ModeButton'
import { UserButton } from '@clerk/nextjs';
import SidebarButton from './SidebarButton';

const Header = () => {
  return (
    <div className={css.wrapper}>
        <Box style={{height: "100%"}}>
<div className={css.container}>

  {/* Sidebar Button  */}

  <div className={css.sidebarButton}>
    <SidebarButton/>
  </div>
    
{/* Logo left side */}

<Image
 src={"/images/logo.png"}
width={200}
height={30}
alt='logo'
className={css.logo}
/>

{/* right side */}

<Flex gap={25} align='center'>

    {/* Mode button  */}

<ModeButton/>

    {/* User Button  */}

<UserButton afterSignOutUrl='/sign-in'/>

</Flex>

</div>
        </Box>
    </div>
  )
}

export default Header