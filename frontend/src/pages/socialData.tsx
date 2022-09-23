import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useImportDataMutation } from '../features/user/userApiSlice'


const SocialData = () => {
    const [importData, {isLoading}] = useImportDataMutation()
    const [soc, setSoc] = useState([])
    const {id} = useParams();
    console.log(id,"---")
    const importSocialData= async () =>{
        const {success, errors, data} = await importData({id}).unwrap()
        console.log(data)
        if (success){
            console.log(data)
            setSoc(data)
        }
    }
    useEffect(()=>{
        importSocialData()
    },[])
  return (
    <div>
        {soc.map((p:any)=>(<div className='socialData'><p>{p.id}</p><p>{p.text}</p></div>))}
    </div>
  )
}

export default SocialData