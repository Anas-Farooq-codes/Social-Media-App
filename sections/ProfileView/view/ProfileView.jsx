"use client"
import { getUser } from '@/actions/user'
import ProfileHead from '@/components/ProfileHead'
import css from "@/styles/profileView.module.css"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import ProfileBody from './ProfileBody'
import FollowPersonsBody from '@/components/FollowPersonsBody'

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

                      {/* body */}
        {selectedTab === "1" && (
          <ProfileBody
            userId={userId}
            data={data}
            isLoading={isLoading}
            isError={isError}
          />
        )}

        {selectedTab === "2" && (
          <FollowPersonsBody type={"followers"} id={userId} />
        )}

        {
          selectedTab === "3" && (
            <FollowPersonsBody type={"following"} id={userId} />
          )
        }


        </div>
    </div>
  )
}

export default ProfileView