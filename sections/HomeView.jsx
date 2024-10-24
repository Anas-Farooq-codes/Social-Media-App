import React from 'react'
import css from "@/styles/homeView.module.css"
import PostGenerator from '@/components/PostGenerator'
import Posts from '@/components/Posts'
import PopularTrends from '@/components/PopularTrends'
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
        <span>Follow suggestions</span>
    </div>
    </div>
  )
}

export default HomeView