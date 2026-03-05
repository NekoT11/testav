import { useState } from "react"
import { useEffect } from "react"


export function Profile() {
const[data,setData]= useState([])
    useEffect(() => {
        async function render() {
            try{
                const res = await fetch('http://localhost:5000/product')
                const data = await res.json()
                setData(data)
                console.log(data);
                
            }
            catch(e){
                console.error(e)
            }
        }
        render()
    }, [])

    return (
        <div>
            <h1>Добро пожаловать, </h1>
            {data.map((e) => { return (
                <div key={e.id}>
                    <p>{e.name}</p>
                    <p>{e.description}</p>
                </div>
            )})}
        </div>
    )
}