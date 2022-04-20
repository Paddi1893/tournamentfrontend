import React, { useEffect } from "react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SignIn = ({loginUser}) => {
    const [signInEmail, setSignInEmail] = useState("");
    const [signInPW, setSignInPW] = useState("");

    let navigate = useNavigate();
    useEffect(() => {
        const keydownHandler = (e) => {
            if(e.keyCode===13) {
                onSubmitSignIn();
            }
        }
        document.addEventListener('keydown',keydownHandler);
        
        //important in fact substitutes the componentUnmount
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    })
    
    

    const onSubmitSignIn = () => {
        fetch("http://localhost:3000/login", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: signInEmail,
                password: signInPW,
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.user_id){
                localStorage.setItem("id", user.user_id);
                localStorage.setItem("name", user.user_name);
                loginUser();
                navigate("/dashboard");
            }
            else{
                setSignInEmail("");
                setSignInPW("");
                return alert("Could not sign in, please try again.");
            }
        })
        .catch(err => console.log(err));
    }
    
    return(
        <>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input value={signInEmail} onChange={(event) => setSignInEmail(event.target.value)} className="pa2 input-reset ba bg-transparent w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={(event) => setSignInPW(event.target.value)} className="b pa2 input-reset ba bg-transparent w-100" type="password" name="password" id="password" value={signInPW}/>
                            </div>
                        </fieldset>
                            <div className="center">
                                    <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    onClick={onSubmitSignIn}
                                    value="Sign in"/>                                                                   
                            </div>
                    </div>
                </main>
            </article>
        </>
    );
    }




export default SignIn;