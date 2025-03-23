import { useState, useContext } from 'react'
import './signup-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'
import { UserContext } from '../../contexts/user.context'

const defaultFromFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields)
  const { displayName, email, password, confirmPassword } = formFields

  const {setCurrentUser}  = useContext(UserContext)

  const resetFormFields = () => {
    setFormFields(defaultFromFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      setCurrentUser(user)
      
      await createUserDocumentFromAuth(user, { displayName })
      resetFormFields()
    } catch (error) {
      if(error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in user')
      }
      else {
        console.log('user creation encoutered an error: ', error.message)
      }
    }
  }

  const changeHandler = (event) => {
    const {name, value} = event.target
    
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Signup with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          name='displayName'
          onChange={changeHandler}
          required
          type='text'
          value={displayName}
        />

        <FormInput
          label='Email'
          name='email'
          onChange={changeHandler}
          required
          type='email'
          value={email}
        />

        <FormInput
          label='Password'
          name='password'
          onChange={changeHandler}
          required
          type='password'
          value={password}
        />

        <FormInput
          label='Confirm Password'
          name='confirmPassword'
          onChange={changeHandler}
          required
          type='password'
          value={confirmPassword}
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignupForm