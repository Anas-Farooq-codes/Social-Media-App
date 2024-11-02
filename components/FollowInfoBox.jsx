import { getAllFollowersAndFollowingsInfo } from '@/actions/user';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Box from './Box/Box';
import { Space, Typography } from 'antd';
import css from "@/styles/FollowInfoBox.module.css"

const FollowInfoBox = ({id}) => {

    const { data, isLoading, isError } = useQuery({
        queryKey: ["user", id, "followInfo"],
        queryFn: () => getAllFollowersAndFollowingsInfo(id),
        enabled: !!id,
        // 20 mins stale time
        staleTime: 1000 * 60 * 20,
      });

      return (
        <Box className={css.container}>
          <Space direction="vertical" align="center">
            <Typography className={"typoH5"}>{data?.followers?.length}</Typography>
            <Typography className={"typoSubtitle2"}>Followers</Typography>
          </Space>
    
          <Space direction="vertical" align="center">
            <Typography className={"typoH5"}>{data?.following?.length}</Typography>
            <Typography className={"typoSubtitle2"}>Following</Typography>
          </Space>
        </Box>
      );
    };
    

export default FollowInfoBox