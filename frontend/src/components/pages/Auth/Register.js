import { useState, useContext } from 'react'

import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

// contexts
import { Context } from '../../../contexts/UserContext'

function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleOnChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()
        register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input 
                    text="Name" 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    handleOnChange={handleOnChange} 
                    required="required"
                />
                <Input 
                    text="Phone" 
                    type="tel" 
                    name="phone" 
                    placeholder="Enter your phone" 
                    handleOnChange={handleOnChange} 
                    required="required"
                />
                <Input 
                    text="E-mail" 
                    type="email" 
                    name="email" 
                    placeholder="Enter your e-mail" 
                    handleOnChange={handleOnChange} 
                    required="required"
                />
                <Input 
                    text="Password" 
                    type="password" 
                    name="password" 
                    placeholder="Enter your password" 
                    handleOnChange={handleOnChange} 
                    required="required"
                />
                <Input 
                    text="Confirm Password" 
                    type="password" 
                    name="confirmpassword" 
                    placeholder="Confirm your password" 
                    handleOnChange={handleOnChange} 
                    required="required"
                />
                <input type="submit" value="Register" />
            </form>
            <p>
                Already have an account? <Link to="/login">Click here</Link>
            </p>
        </section>
    )
}

export default Register
