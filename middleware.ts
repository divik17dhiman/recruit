import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const { data: { session } } = await supabase.auth.getSession()

  // Protect authenticated routes
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Check role-based access
  if (session) {
    const { data: recruiter } = await supabase
      .from('recruiter_departments')
      .select('*')
      .eq('user_id', user?.id)
      .single()

    const isRecruiter = !!recruiter

    // Redirect recruiters to recruiter dashboard
    if (isRecruiter && request.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard/recruiter', request.url))
    }

    // Redirect applicants to applicant dashboard
    if (!isRecruiter && request.nextUrl.pathname === '/dashboard') {
      return NextResponse.redirect(new URL('/dashboard/applicant', request.url))
    }

    // Protect recruiter routes
    if (!isRecruiter && request.nextUrl.pathname.startsWith('/dashboard/recruiter')) {
      return NextResponse.redirect(new URL('/dashboard/applicant', request.url))
    }

    // Protect applicant routes
    if (isRecruiter && request.nextUrl.pathname.startsWith('/dashboard/applicant')) {
      return NextResponse.redirect(new URL('/dashboard/recruiter', request.url))
    }
  }

  return response
}