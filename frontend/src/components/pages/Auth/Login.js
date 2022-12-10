import { useState, useContext } from 'react'
import Input from '../../form/Input'
import { Link } from 'react-router-dom'

import styles from '../../form/Form.module.css'

// contexts
import { Context } from '../../../contexts/UserContext'

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(user)
  }

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          handleOnChange={handleChange}
          required="required"
        />
        <Input
          text="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          handleOnChange={handleChange}
          required="required"
        />
        <input type="submit" value="Login" />
      </form>
      <p>
        Don't have an account yet? <Link to="/register">Click here</Link>
      </p>
    </section>
  )
}

export default Login
