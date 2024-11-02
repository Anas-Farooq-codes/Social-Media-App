import React from 'react'
import css from "@/styles/authLayout.module.css";
import Image from 'next/image';

export const metadata = {

    title: "Authentication"
}


const AuthLayout = ({children}) => {
  return (
    <div className={css.wrapper}>
        <div className={css.container}>
<div className={css.left}>
{children}
</div>
<div className={css.right}>
<Image
alt='Authentication'
src="/images/auth.png"
width={680}
height={780}
quality={100}/>
</div>
        </div>
    </div>
  )
}

export default AuthLayout