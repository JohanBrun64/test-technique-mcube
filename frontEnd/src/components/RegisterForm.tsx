import { FormControl } from "@mui/material"
import axios from "axios"
import { FormEvent, useState } from "react"
import { redirect } from "react-router-dom"

export const RegisterForm = () => {

    const [error, setError] = useState(false)

    const handleSubmitClick = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (e.currentTarget.name) {
            axios.post(`http://localhost:8080/user/create?name=${e.currentTarget.name}`).then((res) => {
                if (res.status === 201) {
                    setError(false)
                    redirectToLogin()
                } else {
                    setError(true)
                }

            })
        }
    }

    const displayError = () => {
        if (error) {
            return (
                <div>ERROR! User already exists!</div>
            )
        }
    }

    const redirectToLogin = () => {
        redirect('/login')
    }

    return (
        <FormControl defaultValue="" required onSubmit={handleSubmitClick}>
            <h6>Register</h6>
            {displayError()}
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="user_name" />
            <button type="submit">Submit</button>
        </FormControl>
    )
}