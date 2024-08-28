
"use client"
import axios from "axios"
import React, { FormEvent, useEffect, useState } from "react"

interface userId {
  params: {
    id: string
  }
}


const UserEdit = ({params: {id}}: userId) => {
  
  const [name, setName] = useState()
  const [email, setEmail] = useState()

  useEffect(()=>{
    if (id){
      axios.get('/pages/api/users?id='+id).then(
        res => {
           setName(res.data.user[0].name)
           setEmail(res.data.user[0].email) 
          })      
    }

  },[id])

  async function handleSubmit(e: FormEvent<HTMLFormElement>){
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const name = formData.get("name")
    const email = formData.get("email")

    
    axios.put('/pages/api/users', {id,name,email})
  }

  return (

      <form onSubmit={handleSubmit}>
    <div>
      <div><label className="mb-4">your name</label></div>
    <input name="name"className=""type="text" defaultValue={name}
    ></input>
    </div>
    <div>

    <div><label className="">your email</label></div>
    <input name="email"className=""type="text" defaultValue={email}></input>
    
    </div>
    <button type="submit" className="border-red-100 bg-slate-400" >send edit</button>

    </form>
    
  )
}

export default UserEdit