import React from 'react'
import css from "@/styles/profileView.module.css"
import FollowInfoBox from '@/components/FollowInfoBox'
import PostGenerator from '@/components/PostGenerator'
import { useUser } from '@clerk/nextjs'
import Posts from '@/components/Posts'
import FollowSuggestions from '@/components/FollowSuggestions'
import FollowButton from '@/components/FollowButton'

const ProfileBody = ({userId}) => {
    const { user: currentUser } = useUser();
    const isCurrentUser = currentUser?.id === userId;

  return (
    <div className={css.profileBody}>
        <div className={css.left}>
            <div className={css.sticky}>
            {!isCurrentUser && <FollowButton id={userId} />}
<FollowInfoBox id={userId}/>
<FollowSuggestions/>
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