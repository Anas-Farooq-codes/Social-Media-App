import React from 'react'
import css from "@/styles/homeView.module.css"
import PostGenerator from '@/components/PostGenerator'
import Posts from '@/components/Posts'
import PopularTrends from '@/components/PopularTrends'
import FollowSuggestions from '@/components/FollowSuggestions'
const HomeView = () => {
  return (
    <div className={css.wrapper}>
    {/* Post Area  */}

    <div className={css.postsArea}>
        <PostGenerator/>
        <Posts></Posts>
    </div>

    <div className={css.right}>
      <PopularTrends/>
       <FollowSuggestions/>
    </div>
    </div>
  )
}

export default HomeView