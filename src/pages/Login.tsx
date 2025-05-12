import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/services/supabaseClient"

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        // 현재 세션 확인
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (session) {
                navigate('/', { replace: true })
            }
        }

        checkSession()

        // 인증 상태 변경 구독
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                navigate('/', { replace: true })
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [navigate])

    const handleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
    }

    return (
        <div className="p-8">
            <button
                onClick={handleLogin}
                className="bg-white text-black border px-4 py-2 rounded shadow"
            >
                Google로 로그인
            </button>
        </div>
    )
}