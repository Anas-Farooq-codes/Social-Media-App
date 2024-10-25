import React from 'react'

export const generateMetaData =  (params) => {
return {
    title: `${params?.searchParams?.person}'s profile`,
    description: `Profile page of user ${params?.params?.id}`,
};
};

const ProfilePage = () => {
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage