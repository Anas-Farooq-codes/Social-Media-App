import React from 'react'
import css from "@/styles/post.module.css"
import Box from './Box/Box'
import { Avatar, Flex, Image, Typography } from 'antd'
import dayjs from 'dayjs'
import { getFileTypeFromUrl } from '@/utils'
import LikeButton from './LikeButton'
import CommentButton from './CommentButton'
import CommentSection from './CommentSection'

const Post = ({data, queryId}) => {
  return (
    <div className={css.wrapper}>
        <Box>
            <div className={css.container}>

                {/* Profile Info  */}

<Flex align='center' justify='space-between'>

    {/* Left Side  */}

    <Flex gap={".5rem"} align='center'>
        <Avatar size={40} src={data?.author?.image_url}/>

        {/* name and post data  */}

<Flex vertical>

<Typography className='typoSubtitle2'>
    {data?.author?.first_name} {data?.author?.last_name}
</Typography>

<Typography.Text
className='typoCaption'
type='secondary'
strong>
    {dayjs(data?.created_at).format("DD MM YYYY")}
</Typography.Text>
</Flex>

    </Flex>

</Flex>

{/* Caption  */}

<Typography.Text>
    <div
        dangerouslySetInnerHTML={{
            __html: data?.postText?.replace(/\n/g, "<br/>")
        }}
    />
</Typography.Text>


{/* Post Media  */}

{getFileTypeFromUrl(data?.media) === "image" && (
            <div className={css.media}>
              <Image
                preview={{ mask: null }}
                src={data?.media}
                alt="post"
                style={{ objectFit: "cover" }}
                fill
              />
            </div>
          )}

{getFileTypeFromUrl(data?.media) === "video" && (
            <div className={css.media}>
              <video
                src={data?.media}
                controls
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}

          {/* Actions  */}

          <Flex>
            <LikeButton
            postId={data?.id}
            likes={data?.likes}
            queryId={queryId}/>

            <CommentButton comments={data?.comments?.length}/>
          </Flex>

          {/* Comment Section  */}

          <CommentSection
          comments={data?.comments}
          expanded={false}
          postId={data?.id}
          queryId={queryId}
          />

            </div>
        </Box>
    </div>
  )
}

export default Post