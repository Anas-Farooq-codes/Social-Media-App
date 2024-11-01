import ProfileView from '@/sections/ProfileView/view/ProfileView'
import React from 'react'


export const generateMetadata = (params) => {
    return {
        title: `${params?.searchParams?.person?.charAt(0).toUpperCase() + params?.searchParams?.person?.slice(1)}'s Profile`,
        description: `Profile page of user ${params?.params?.id}`,
}
}

const ProfilePage = (params) => {
  return (
<ProfileView userId={params?.params?.id}></ProfileView>
  )
}

export default ProfilePage