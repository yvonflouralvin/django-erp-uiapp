'use sever'

import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";


const test = async (cookies: ReadonlyRequestCookies)=>{ 
    cookies.set("MonTroisime", "123");
}

export default {
    test
}