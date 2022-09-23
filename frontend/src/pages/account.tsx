import React from 'react'
import LinkSocialAccountForm from '../components/LinkSocialAccountForm';
import SocialAccount from '../components/SocialAccount';
import { useGetSocialAccountsQuery, useGetUserQuery } from '../features/user/userApiSlice';

const Account = () => {
  const {data, isSuccess} = useGetSocialAccountsQuery();
  if(!isSuccess) return <p>Loading....</p>
  const {success, errors, data:socialAccounts} =  data;
  console.log(success,errors, socialAccounts)
  return (socialAccounts.length >0) ?<div>{socialAccounts.map((a:any)=><SocialAccount account={a}/>)}</div>: (
    <div>
      <LinkSocialAccountForm/>
    </div>
  )
}

export default Account;