"use client";
import React, { useState } from 'react'
import css from "@/styles/postGenerator.module.css"
import Box from './Box/Box'
import { Avatar, Button, Flex, Input, Typography } from 'antd'
import { useUser } from '@clerk/nextjs'
import { Icon } from '@iconify/react';
import Image from 'next/image';

const PostGenerator = () => {

    const {user} = useUser()
    const {postText, setPostText} = useState("")
    const imgInputRef = React.useRef(null);
    const videoInputRef = React.useRef(null);
const [fileType, setFileType] = useState(null)
const [selectedFile, setSelectedFile] = useState(null)




const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Limit of 10MB
    if (file && file.size > 10 * 1024 * 1024) {
        alert("File size should be less than 10MB");
        return;
    }

    if (file && (file.type.startsWith("image/") || file.type.startsWith("video/"))) {  
        setFileType(file.type.split("/")[0]);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setSelectedFile(reader.result)
        }
    }
};

const handleRemoveFile = () => {
    setSelectedFile(null);
    setFileType(null);
}

  return (
    <>
    <div className={css.postGenWrapper}>
        <Box className={css.container}>

<Flex vertical gap={"1rem"} align='flex-start'>



{/* Generate Post  */}

<Flex style={{width: "100%"}} gap={"1rem"}>
<Avatar
src={user?.imageUrl}
style={{
    width: "2.6rem",
    height: "2.6rem",
    boxShadow: "var(--avatar-shadow)"
}}
/>

<Input.TextArea
placeholder = "Share what you are thinking..."
style={{height: 80, resize: "none", Flex: 1}}
value={postText}
onChange ={(e) => setPostText(e.target.value)}
/>

</Flex>

{
    fileType && (
        <div className={css.previewContainer}>

            {/* Remove button  */}
            <Button type='default' className={css.remove} style={{position: "absolute"}} >
                <Typography className='typoCaption'
                onClick={handleRemoveFile}>
                Remove
                </Typography>
            </Button>
            {
                fileType === "image" && (
                    <img
                        src={selectedFile}
                        className={css.preview}
                        alt="preview of post"
                        style={{ height: "100%", width: "100%" }}
                    />
                )
            }
            {
                fileType === "video" && (
                    <video
                        src={selectedFile}
                        className={css.preview}
                        alt="preview of post"
                        style={{ height: "350px"}}
                        controls
                    />
                )
            }
        </div>
    )
}


{/* Bottom Buttons  */}

<Flex
className={css.bottom}
align='center'
justify='space-between'
>

    {/* Image upload button  */}
    <Button
    type='text'
    style={{background: "borderColor"}}
    onClick={() => imgInputRef.current.click()}
    >
        <Flex
        align='center'
        gap={"0.5rem"}>
            <Icon
            icon={"solar:camera-linear"}
            width={"1.2rem"}
            color='var(--primary)'
            />

            <Typography className='typoSubtitle2'>Image</Typography>
        </Flex>

    </Button>

    {/* Video Upload Button  */}

    <Button
    type='text'
    style={{background: "borderColor"}}
    onClick={() => videoInputRef.current.click()}
    >
        <Flex
        align='center'
        gap={"0.5rem"}>
            <Icon
            icon={"gridicons:video"}
            width={"1.2rem"}
            color="#5856D6"
            />

            <Typography className='typoSubtitle2'>Video</Typography>
        </Flex>

    </Button>

    {/* Post Button  */}

    <Button
    type='primary'
    style={{marginLeft: "auto"}}
    >
        <Flex
        align='center'
        gap={"0.5rem"}>
            <Icon
            icon="iconamoon:send-fill"
            width={"1.2rem"}
            />

            <Typography className='typoSubtitle2' style={{color: "white"}}>Post</Typography>
        </Flex>

    </Button>

</Flex>

</Flex>

        </Box>
    </div>

    {/* Button to accept the images files  */}

    <input type="file"
    accept='image/*'
    multiple={false}
    style={{ display: "none"}}
    ref={imgInputRef} 
    onChange={(e) => handleFileChange(e)}
/>
    {/* Button to accept the video files  */}

    <input type="file"
    accept='video'
    multiple={false}
    style={{ display: "none"}}
    ref={videoInputRef} 
    onChange={(e) => handleFileChange(e)}
/>

    </>
  )
}

export default PostGenerator