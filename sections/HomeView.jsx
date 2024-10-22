import React from 'react'
import css from "@/styles/homeView.module.css"
import PostGenerator from '@/components/PostGenerator'
const HomeView = () => {
  return (
    <div className={css.wrapper}>
    {/* Post Area  */}

    <div className={css.postsArea}>
        <PostGenerator/>
        <span>Posts</span>
    </div>

    <div className={css.right}>
        <span>Tending Sections</span>
        <span>Follow suggestions</span>
    </div>
    </div>
  )
}

export default HomeView