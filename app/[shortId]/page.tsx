"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";


const ShortUrl = ({ params }: any) => {
    const router = useRouter()
    const [redirectUrl, setredirectUrl] = useState("");
    const { shortId } = params;
    useEffect(() => {
        axios.put("/api/url", { shortId })
            .then((res) => {
                setredirectUrl(res?.data);
            })
            .catch((err) => {
                console.log(err);
            })
        router?.push(redirectUrl);
    }, [shortId, router, redirectUrl])

    return (<div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
            <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
            <h3 className='font-semibold text-xl'>
                Redirecting...
            </h3>
        </div>
    </div>)
}

export default ShortUrl;