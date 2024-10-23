"use client"
import { getMyFeedPosts } from '@/actions/post'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { Flex, Spin, Typography } from 'antd'
import React from 'react'

const Posts = () => {
    
    const {data, isLoading, isError, isSuccess} = useInfiniteQuery({
        queryKey: "posts",
        queryFn: ({pageParam = ""}) => getMyFeedPosts(pageParam),
        getNextPageParam: (lastPage) => {
        return lastPage?.metadata?.lastCursor
        }
    })

    if(isError) {
        return <Typography>Something went wrong</Typography>
    }

    if (isLoading) {
        return (
            <Flex vertical align='center' gap="large">
                <Spin/>
                <Typography>Loading...</Typography>
            </Flex>
        )
    }
    
  return (
    <div>Posts</div>
  )
}

export default Posts