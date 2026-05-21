import { NextResponse } from 'next/server';
import { auth } from './lib/auth';
import { headers } from 'next/headers';

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: await headers() 
    });

    // সেশন না থাকলে লগইন পেজে রিডাইরেক্ট করুন
    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // সেশন থাকলে রিকোয়েস্টটি এগিয়ে দিন (এটি অবশ্যই প্রয়োজন)
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/my-tutor', 
        '/booked-session', 
        '/add-tutor', 
        '/tutor/:path' 
    ],
};