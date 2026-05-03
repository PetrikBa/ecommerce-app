"use client";
import { useAuth } from "@clerk/nextjs";

const Page = () => {

  const {signOut} = useAuth();
  return (
    <div className="flex h-screen items-center justify-center"> 
        <h1 className="text-4xl font-bold text-red-500">Unauthorized Access</h1>
        <button onClick={()=>signOut()}>Sign out</button>
    </div>
  );
}

export default Page;