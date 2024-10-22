"use client";
import React from 'react'
import css from "@/styles/postGenerator.module.css"
import Box from './Box/Box'
import { Avatar, Flex } from 'antd'
import { useUser } from '@clerk/nextjs'

const PostGenerator = () => {

    const {user} = useUser()
  return (
    <div className={css.postGenWrapper}>
        <Box className={css.container}>

{/* Generate Post  */}

<Flex style={{width: "100"}} gap={"1rem"}>
<Avatar
src={user?.imageUrl}
style={{
    width: "2.6rem",
    height: "2.6rem",
    boxShadow: "var(--avatar-shadow)"
}}
/>
</Flex>

        </Box>
    </div>
  )
}

export default PostGenerator