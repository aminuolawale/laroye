import React from 'react'
const Avatar = ({user}:{user:any}) => {
    return (
        <div>{user?.email}</div>
    )
}

export default Avatar