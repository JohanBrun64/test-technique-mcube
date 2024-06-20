import { FormControl } from "@mui/material"
import axios from "axios"
import { FormEvent, useState } from "react"
import { Link, redirect } from "react-router-dom"
import useLocalStorage from "../hooks/useLocalStorage"

export const LoginForm = () => {

    const [error, setError] = useState(false)
    const [, setLogged] = useLocalStorage('userId', '')

    const handleSubmitClick = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.currentTarget.name) {
            axios.get(`http://localhost:8080/user/get?name=${e.currentTarget.name}`).then((res) => {
                if (res.data.userId) {
                    setError(false)
                    setLogged(res.data.userId)
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
        redirect('/')
    }

    return (
        <FormControl defaultValue="" required onSubmit={handleSubmitClick}>
            <h6>Login</h6>
            {displayError()}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="user_name" />
            <button type="submit">Submit</button>
            <div>Don't have an account ?</div>
            <Link to="/register">Register</Link>
        </FormControl>
    )
}