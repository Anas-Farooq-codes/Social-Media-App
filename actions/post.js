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

export const getMyFeedPosts = async (lastCursor) => {

try {
    const take = 5
    const posts = await db.post.findMany({
        include: {
            author: true,
            likes: true,
            comments: true
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

export const updatePostLike = async (postId, type) => {
    // type is either "like" or "unlike"
    try {
      const { id: userId } = await currentUser();
  
      // find the post in db
      const post = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          likes: true,
        },
      });
      if (!post) {
        return {
          error: "Post not found",
        };
      }
  
      // check if user has already liked the post
      const like = post.likes.find((like) => like.authorId === userId);
  
      // if user has already liked the post,
      if (like) {
        // if user is trying to like the post again, return the post
        if (type === "like") {
          return {
            data: post,
          };
        }
        // otherwise, delete the like
        else {
          await db.like.delete({
            where: {
              id: like.id,
            },
          });
          console.log("like deleted");
        }
      }
      // if user has not already liked the post
      else {
        // if user is trying to unlike the post, return the post
        if (type === "unlike") {
          return {
            data: post,
          };
        }
        // if user is trying to like the post, create a new like
        else {
          await db.like.create({
            data: {
              post: {
                connect: {
                  id: postId,
                },
              },
              author: {
                connect: {
                  id: userId,
                },
              },
            },
          });
          console.log("like created");
        }
      }
      const updatedPost = await db.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          likes: true,
        },
      });
  
      console.log("updated post", updatedPost);
      return {
        data: updatedPost,
      };
    } catch (e) {
      console.log(e);
      throw Error("Failed to update post like");
    }
  };