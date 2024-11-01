"use client"
import { getUser } from '@/actions/user'
import ProfileHead from '@/components/ProfileHead'
import css from "@/styles/profileView.module.css"
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const ProfileView = ({userId}) => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser(userId)
    })
    const [selectedTab, setSelectedTab] = React.useState("1");

    
  return (
    <div className={css.wrapper}>
        <div className={css.container}>
            {/* Head  */}
                <ProfileHead userId={userId} data={data} isLoading={isLoading} isError={isError} selectedTab={selectedTab} setSelectedTab={setSelectedTab}></ProfileHead>
        </div>
    </div>
  )
}

export default ProfileView