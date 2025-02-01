// 'use server'
import { cookies } from "next/headers"

const Cookies=async ()=>{
    return await cookies()
}
export default Cookies;