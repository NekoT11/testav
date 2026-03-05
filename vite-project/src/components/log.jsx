import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Log() {

    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [err, setErr] = useState('')
    const [correct, setCorrect] = useState('')

    
    async function auth() {
        try {
            const res = await fetch('http://localhost:5000/log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: login,
                    pass: pass
                })
            })

            const data = await res.json()

            if(res.ok) {
                localStorage.setItem('token', data.token)
                setCorrect(data.message)
            }
            else {
                setErr(data.message)
            }

        } catch(e) {
            console.error(e)
        }
    }

    return (
        <div>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)}/>
            <input type="text" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <button onClick={auth}>Войти</button>
            {err && <p>{err}</p>}
            {correct && <p>{correct}</p>}
        </div>
    )
}