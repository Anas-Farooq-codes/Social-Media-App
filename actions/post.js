"use server";
import { currentUser } from "@clerk/nextjs"; 
import { db } from "@/lib/db";
import { uploadFile } from "./uploadFile";

export const createPost = async (post) => {
    try {
        const { postText, media } = post;

        const user = await currentUser();

        let cld_id;
        let assetUrl;
        if(media)
        {
            const res = await uploadFile(media,  `/posts/${user?.id}`)
            const {public_id, secure_url} = res;
            cld_id = public_id
            assetUrl = secure_url
        }

        const newPost = await db.post.create({
            data: {
                postText,
                media: assetUrl,
                cld_id,
                author: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        });
console.log(newPost);

        return {
            data: newPost
        }
    } catch (e) {
        console.log(e?.message);
        throw new Error("Failed to create Post");
    }
};
