import { useState, useEffect } from 'react'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import { auth, userExists } from '../../firebase/firebase';

export const LoginScreen = () => {

  const navigate = useNavigate()

  const [currentUser, setCurrentUser] = useState(null);

  /**
   State:
    0: Initialized
    1: Loading
    2: Login Completed
    3: Login without Register
    4: No one logued
   */

  const [currentState, setCurrentState] = useState(0)

  useEffect( () => {
    setCurrentState(1)
    onAuthStateChanged( auth, async ( user ) => {
      if( user ) {

        const isRegistered = await userExists( user.uid )
  
        if( isRegistered ) {
          // TODO: Redirect to Dashboard 
          navigate('/dashboard')
          setCurrentState(2)
        } else {
          // TODO: Redirect to Choose Username
          navigate('/')
          setCurrentState(3)
        }
  
      } else {
        setCurrentState(4)
        console.log('No one is logged');
      }
    })
  }, [navigate])


  async function handleGoogleLogin() {

    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle( googleProvider )

    async function signInWithGoogle( googleProvider ) {
      try {
        const res = await signInWithPopup( auth, googleProvider );
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    }
  }


  if( currentState === 2 ) {
    return <div>You are authenticated and registered</div>
  }

  if( currentState === 3 ) {
    return <div>You are authenticated but no registered</div>
  }

  if( currentState === 4 ) {
    return (

      <div>
        <button onClick={ handleGoogleLogin }>Login</button>
      </div>

    //   <>
  
    //     <h3 className='auth__title'>Bosti Link-Tree</h3>
  
    //     <form>
    //       <label className='auth__label' htmlFor='username'>Username</label>
    //       <input 
    //           className='auth__input'
    //           type="text"
    //           name='username'
    //           placeholder="Enter Username"
    //       />
    //       <label className='auth__label' htmlFor="password">Password</label>
    //       <input 
    //           className='auth__input'
    //           type="password" 
    //           name='password'
    //           placeholder="Enter Password"
    //       />
    //       <button
    //         type='submit'
    //         className='btn btn-primary btn-block mb-5'
    //       >
    //           Log In
    //       </button>
  
    //       <div className='auth__social-networks'>
    //         <p>Login with Social Networks</p>
  
    //         <div 
    //             className="google-btn"
    //             onClick={ handleGoogleLogin }
    //         >
    //             <div className="google-icon-wrapper">
    //                 <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
    //             </div>
    //             <p className="btn-text">
    //                 <b>Sign in with google</b>
    //             </p>
    //         </div>
    //       </div>
  
    //       <Link 
    //         to="/auth/register"
    //         className='link link-block'
    //       >
    //         Don't have An account?
    //       </Link>
  
    //     </form>
  
    //   </>
    
    )
  }

  return <div>Login</div>

}


