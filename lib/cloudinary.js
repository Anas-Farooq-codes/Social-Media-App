import cloudinary from "cloudinary"

cloudinary.v2.config({

    cloud_name: "dx1z5nquq",
    api_key: "194486852293267",
    api_secret: "jphTRtjXUbH_jfrkowBoH4lj73k",
})

export const cld = globalThis.cloudinary || cloudinary

if(process.env.NODE_ENV !== "production") globalThis.cloudinary = cld;