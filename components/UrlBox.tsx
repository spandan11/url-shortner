"use client"

import React, { useState } from 'react'
import axios from 'axios'
import copy from 'copy-to-clipboard'
import isUrl from "is-url"
import { Clipboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const UrlBox = () => {
    const siteUrl: string = process.env.SITE_URL || "https://url-shortner-zeta-mauve.vercel.app/";
    const [url, setUrl] = useState("");
    const [showLink, setShowLink] = useState(false);
    const [shortLink, setShortLink] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);
    const [error, setError] = useState("");
    const makeShorter = async () => {
        const isitvalid: boolean = isUrl(url);
        if (isitvalid) {
            setIsDisabled(true);
            await axios.post('/api/url', { url })
                .then((res) => {
                    setShortLink(res.data.shortId)
                })
                .catch((err) => {
                    setError(err.message)
                })
            setUrl("")
            setError("")
            setShowLink(true)
            setIsDisabled(false);
        } else {
            setError("Invaid Url")
        }
    }

    return (
        <div className='flex flex-col shadow-xl p-4 gap-6 rounded-lg text-center'>
            {error}
            <div className='flex flex-col gap-4 md:flex-row w-96'>
                <Input type="text" placeholder='Enter valid Url' onChange={(e) => setUrl(e.target.value)} value={url} />
                <Button disabled={isDisabled} className={isDisabled ? "bg-gray-400" : ""} onClick={makeShorter}>Shorten</Button>
            </div>
            {
                showLink && (
                    <div className='p-2 bg-gray-100 rounded-lg flex flex-row gap-4 items-center justify-center'>
                        <Label htmlFor='shortened-url'>{siteUrl + shortLink}</Label>
                        <Clipboard onClick={() => copy(siteUrl + shortLink)} className='text-gray-400 hover:text-black cursor-pointer' />
                    </div>
                )
            }
        </div>
    )
}

export default UrlBox;