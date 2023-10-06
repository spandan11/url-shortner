"use client"

import React, { useState } from 'react'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import isUrl from "is-url"
import { Clipboard } from 'lucide-react'
import toast from "react-hot-toast";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'

const UrlBox = () => {
    const siteUrl: string = process.env.SITE_URL || "https://shorterurl.vercel.app/";
    const [url, setUrl] = useState("");
    const [showLink, setShowLink] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [shortLink, setShortLink] = useState("");
    const makeShorter = async () => {
        const isitvalid: boolean = isUrl(url);
        if (isitvalid) {
            setIsDisabled(true);
            await axios.post('/api/url', { url })
                .then((res) => {
                    setShortLink(res.data.shortId)
                    toast.success("Short Url Generated")
                })
                .catch((err) => {
                    toast.error(err.message)
                })
            setUrl("")
            setShowLink(true)
            setIsDisabled(false);
        } else {
            toast.error("Invalid Url")
        }
    }

    return (
        <div className='flex flex-col p-4 shadow-xl gap-6 rounded-lg text-center'>
            <div className='flex flex-col gap-4 md:flex-row'>
                <Input type="text" placeholder='Enter valid Url' onChange={(e) => setUrl(e.target.value)} value={url} />
                <Button disabled={isDisabled} className={isDisabled ? "bg-gray-400" : ""} onClick={makeShorter}>Shorten</Button>
            </div>
            {
                showLink && (
                    <div className='flex flex-col w-full gap-0 text-center mx-auto'>
                        {/* For Short Link */}
                        <div className='p-2 bg-gray-100 rounded-lg flex flex-row gap-4 items-center justify-center'>
                            <Label htmlFor='shortened-url'>{siteUrl + shortLink}</Label>
                            <Clipboard onClick={() => {
                                copy(siteUrl + shortLink, {
                                    message: toast.success("Copied to clipboard")
                                })
                            }} className='text-gray-400 hover:text-black cursor-pointer' />
                        </div>
                        {/* For Qr-Code */}
                        <div className='flex flex-col items-center justify-center gap-4 py-5'>
                            <h2 className='text-xl font-semibold'>Scan Here:</h2>
                            <Image alt="qr-code" src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${siteUrl + shortLink}`} width={200} height={200} />
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UrlBox;