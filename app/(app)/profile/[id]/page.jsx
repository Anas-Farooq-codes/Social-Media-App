import React from 'react'

export const generateMetadata = (params) => {
    return {
    title: `${params?.searchParams?.person}'s Profile`,
    description: `Profile page of user ${params?.params?.id}`,
}
}

const ProfilePage = () => {
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage