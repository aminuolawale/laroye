import React, {useState} from 'react'
import { useImportDataMutation } from '../features/user/userApiSlice'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const SocialAccount = ({account:{username, provider, account_created_date, id}}:any) => {
    const navigate = useNavigate();
  return (
    <div>
        <p>{id}</p>
        <p>{username}</p>
        <p>{provider}</p>
        <p>{account_created_date}</p>
        <Link to={`/social/social-data/${id}`}>Import Data</Link>
    </div>
  )
}

export default SocialAccount