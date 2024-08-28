
import { prisma } from "@/util/prisma";
import { error } from "console";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST (req: NextRequest){
  
    const body = await req.json()
    const {name, email } = body
  
        const newUser = await prisma.user.create({
            data: {name, email}
        });
        
       return NextResponse.json({newUser})
    
}

export async function GET(req: NextRequest) {    

    //console.log(req.nextUrl.searchParams.get("id"))
   const id= req.nextUrl.searchParams.get("id")
   if(id==='-1')
   {    
    const users = await prisma.user.findMany()
    return NextResponse.json({users})
   }else{
    const getUser = await prisma.user.findMany({
        where: {id: String(id)}       
    })
    return NextResponse.json({user: getUser})
   }
    
}

export async function DELETE(req: NextRequest){
    
    const body = await req.json() 
    const {id} = body
    const removeUser = await prisma.user.delete({
        where:{id:id}
    })

    return NextResponse.json({removeUser})

}

export async function PUT(req: NextRequest) {

    const body = await req.json()
    const {id,name,email}= body
    
    const editUser= await prisma.user.update({
        where:{id:id},
        data:{
            name: name,
            email: email
        }
    })

        return NextResponse.json({editUser})
}