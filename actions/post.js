"use server";
import { currentUser } from "@clerk/nextjs"; 
import { db } from "@/lib/db";
import { uploadFile } from "./uploadFile";
import { metadata } from "@/app/layout";
import { skip } from "@prisma/client/runtime/library";

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

export const getMyFeedPosts = async (lastCursor) => {

try {
    const take = 5
    const posts = await db.post.findMany({
        include: {
            author: true
        },
        take,
        ...(lastCursor && {
skip: 1,
cursor: {
    id: lastCursor
}
        }),
        orderBy: {
            createdAt: "desc"
        }
    });

if (posts.length === 0) {
    return {
        data: [],
        metadata: {
            lastCursor: null,
            hasMore: false,
        },
    };
}

const lastPostInResults = posts[posts.length - 1]
const cursor = lastPostInResults.id;
const morePosts = await db.post.findMany({
    skip: 1,
    cursor: {
        id:cursor,
    },
    orderBy: {
        createdAt: "desc",
    },
});
return {
    data: posts,
    metadata: {
        lastCursor: cursor,
        hasMore: morePosts.length > 0
    }
}
}catch(e)
{
    console.log(e);
    throw new Error("Failed to fetch Posts")
    
}

}