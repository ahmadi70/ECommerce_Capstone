import './authentication.styles.scss'
import SignupForm from '../../components/signup-form/signup-form.component'
import SigninForm from '../../components/signin-form/signin-form.component'

const Authentication = () => {
  return (
    <div className='authentication-container'>
      <SigninForm />
      <SignupForm />
    </div>
  )
}

export default Authentication