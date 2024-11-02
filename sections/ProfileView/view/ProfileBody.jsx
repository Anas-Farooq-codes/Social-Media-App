import React from 'react'
import css from "@/styles/profileView.module.css"
import FollowInfoBox from '@/components/FollowInfoBox'
import PostGenerator from '@/components/PostGenerator'
import { useUser } from '@clerk/nextjs'
import Posts from '@/components/Posts'

const ProfileBody = ({userId}) => {
    const { user: currentUser } = useUser();
    const isCurrentUser = currentUser?.id === userId;

  return (
    <div className={css.profileBody}>
        <div className={css.left}>
            <div className={css.sticky}>
<FollowInfoBox id={userId}/>
            </div>
        </div>

        <div className={css.right}>
        {isCurrentUser && <PostGenerator />}
        <Posts id={userId} />
      </div>
    </div>

  )
}

export default ProfileBody