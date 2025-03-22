import { useState } from 'react'
import './signin-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import { 
  createUserDocumentFromAuth, 
  signInWithGooglePopup,
  signinAuthUserWithEmailAndPassword
} from '../../utils/firebase/firebase.utils'

const defaultFromFields = {
  email: '',
  password: ''
}

const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFromFields)
  const { email, password } = formFields

  console.log(formFields)

  const resetFormFields = () => {
    setFormFields(defaultFromFields)
  }

  const signinWithGoogle = async () => {
      const { user } = await signInWithGooglePopup()
      await createUserDocumentFromAuth(user)
    }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signinAuthUserWithEmailAndPassword(
        email, 
        password
      )
      console.log(response)
      resetFormFields()
    } catch (error) {
      switch(error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password for email')
          break;
        case 'auth/user-not-found':
          alert('Incorrect user associated with this email')
          break;
        default:
          console.log(error) 
      }
    }
  }

  const changeHandler = (event) => {
    const {name, value} = event.target
    
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className='sign-up-container'>
      <h2>Already have an account?</h2>
      <span>Signin with your email and password</span>
      <form onSubmit={handleSubmit}>
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

        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button type='button' buttonType='google' onClick={signinWithGoogle}>Google Sign In</Button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm