import axios from "axios"
import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const LoginForm = () => {

    const [error, setError] = useState(false)
    const [, setLogged] = useState('')
    const navigate = useNavigate()

    const handleSubmitClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.currentTarget as typeof e.currentTarget & {
            name: { value: string }
        }
        if (target.name.value) {
            axios.get(`http://localhost:8080/user/get?name=${target.name.value}`).then((res) => {
                if (res.data.userId) {
                    setError(false)
                    setLogged(res.data.userId)
                    localStorage.setItem("userId", res.data.userId)
                    window.dispatchEvent(new Event("storage"))
                    redirectToHome()
                } else {
                    setError(true)
                }

            })
        }
    }

    const displayError = () => {
        if (error) {
            return (
                <div>ERROR! Unknown user!</div>
            )
        }
    }

    const redirectToHome = () => {
        navigate('/')
    }

    return (
        <form defaultValue="" onSubmit={handleSubmitClick}>
            <h6>Login</h6>
            {displayError()}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="user_name" />
            <button type="submit">Submit</button>
            <div>Don't have an account ?</div>
            <Link to="/register">Register</Link>
        </form>
    )
}