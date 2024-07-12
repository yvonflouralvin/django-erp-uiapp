export const dynamic = 'force-dynamic' // defaults to auto
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
    cookies().getAll().map(cookie => {
        cookies().delete(cookie.name)
    })
    return redirect("/login")
}