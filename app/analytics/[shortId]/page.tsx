"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Analytics = ({ params }: any) => {
    const { shortId } = params;
    const [clicks, setClicks] = useState();
    useEffect(() => {
        axios.get(`/api/analytics/${shortId}`)
            .then((res) => {
                setClicks(res.data?.visitHistory?.length)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [shortId])
    return (
        <div className='flex flex-col h-full justify-center items-center bg-gray-300 rounded-lg p-5'>
            <p className='text-xl font-bold'>{clicks} Clicks</p>
        </div >
    )
}

export default Analytics