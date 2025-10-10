// app/auth/callback/route.ts
import { createRouteHandlerClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const origin = requestUrl.origin

  if (code) {
    const supabase = await createRouteHandlerClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth callback error:', error)
      return NextResponse.redirect(`${origin}/login?error=${error.message}`)
    }
    
    console.log('✅ Session başarıyla oluşturuldu')
  }

  // Başarılı girişten sonra yönlendir
  return NextResponse.redirect(`${origin}/dashboard/generate-image`)
}