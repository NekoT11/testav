import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function Reg() {

    const[login, setLogin] = useState('')
    const[name, setName] = useState('')
    const[pass, setPass] = useState('')
    const[err, setErr] = useState('')
    const[correct, setCorrect] = useState('')

    const navigate = useNavigate()
    
        const handleClick = async () => {
            try{
            const res = await fetch('http://localhost:5000/reg', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                login: login,
                pass: pass
            })})

            const data = await res.json()

            if(res.ok){
            navigate('/log')
            setErr('')
            setCorrect(data.message)
            }
            else {
            setErr(data.message)
        }

        }
        catch(e){
            console.error(e)
        }
        } 
    return(
        <>
        <input type="text" placeholder="name" value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="text" placeholder="login" value={login} onChange={(e)=>setLogin(e.target.value)}/>
        <input type="text" placeholder="pass" value={pass} onChange={(e)=>setPass(e.target.value)}/>
        <button onClick={handleClick}>Зарегистрироваться</button>
        {err && <p>{err}</p>}
        {correct && <p>{correct}</p>}
        </>
    )
}