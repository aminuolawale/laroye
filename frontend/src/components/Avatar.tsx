import React from 'react'
const Avatar = ({user}:{user:any}) => {
    console.log(user)
    return (
        <div>{user.email}</div>
    )
}

export default Avatar