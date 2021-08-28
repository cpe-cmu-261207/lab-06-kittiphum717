import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"

type currenttype = {
    time: {
        updated: string
        updatedISO: string
        updateduk: string
        },
        disclaimer: string
        bpi: {
        USD: {
        code: string
        rate: string
        description: string
        rate_float: number
        },
        THB: {
        code: string
        rate: string
        description: string
        rate_float: number
        }
}
}


const Current = () => {
    const [current,setcurrent] = useState<currenttype | null>(null)
    const [loading,setloading] = useState(false)
    const [error,seterror] = useState(false)
    useEffect(()=>{
        setloading(true)
        axios.get('https://api.coindesk.com/v1/bpi/currentprice/thb.json')
        .then(resp => {
            console.log(resp.data)
            setcurrent(resp.data)
            setloading(false)
        })
        .catch(err => {
            console.log(err)
            setloading(false)
            seterror(true)
        })
    },[])

    const render = () => {
        if(loading) return <div className='text-center space-y-3'><p className='text-2xl'>Loading ...</p></div>
        else if(error) return <div className='text-center space-y-3'><p className='text-2xl text-red-500'>There was an error. Please try again later.</p></div>
        else {
            return (<div className='text-center space-y-3'>
            <p className='text-2xl font-semibold'>Current price</p>
            <p className='text-2xl'>{current?.bpi.THB.rate_float.toLocaleString()} THB</p>
            <p> (Last updated {current?.time.updated}) </p>
          </div>
         )
        }
    }
    return (
        <div>{render()}</div>
    )
}

export default Current
