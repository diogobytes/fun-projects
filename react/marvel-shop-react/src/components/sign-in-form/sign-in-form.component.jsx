import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";

import { UserContext } from "../../contexts/user.context";

import { onAuthStateChangedListener } from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';
const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;
    const {setCurrentUser} = useContext(UserContext);
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
       
    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
  
      };
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
           await signInAuthUserWithEmailAndPassword(email,password);
          resetFormFields();

        } catch(e) {
           switch(e.code) {
            case 'auth/wrong-password':
                alert('wrong password');
                break;
            
            case 'auth/user-not-found':
                alert('no user found');
                break;
            default:
                console.log(e);
                
        }
    }
    
    }
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label='Email'
                type="email" required onChange={handleChange} name="email" value={email} />
                
                <FormInput label='password'
                type="password" required onChange={handleChange} name="password" value={password}/>
                <div className="buttons-container">
                <Button type="submit">
                    Sign in
                </Button>
                <Button buttonType='google' onClick={signInWithGoogle}>
                    Google Sign in
                </Button>
                </div>
            </form>
        </div>
    )

}
export default SignInForm;