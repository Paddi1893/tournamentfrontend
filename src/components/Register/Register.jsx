import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = ({loginUser}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checkPassword, setCheckPassword] = useState("");
    const [name, setName] = useState("");
    let navigate = useNavigate();


    const onSubmitRegister = () => {
        if(email !== "" && password !== "" && name !== ""){
            if(password === checkPassword)
            {
                fetch("http://localhost:3000/register", {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        name: name
                    })
                })
                .then(response => response.json())  //{user_email_address: user_email_address}
                .then(user => {
                    if(user.user_name){    
                        localStorage.setItem("id", user.user_id);
                        localStorage.setItem("name", user.user_name);  
                        loginUser();
                        navigate("/dashboard");             
                    }
                    else{
                        setEmail("");
                        setPassword("");
                        setName("");
                        return alert("Could not register, please try again.")
                    }
                })
            }
            else{
                alert("Passwords do not match!");
            }

            
        }
    }   

    return(
        <>
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>                            
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input value={name} onChange={(event) => setName(event.target.value)} className="pa2 input-reset ba bg-transparent hover-black w-100" type="text" name="name"  id="name"/>
                            </div>
                            
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-adress">Email</label>
                                <input value={email} onChange={(event) => setEmail(event.target.value)} className="pa2 input-reset ba bg-transparent hover-black w-100" type="email" name="email-address"  id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input value={password} onChange={(event) => setPassword(event.target.value)} className="b pa2 input-reset ba bg-transparent hover-black w-100" type="password" name="password"  id="password"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Repeat Password</label>
                                <input value={checkPassword} onChange={(event) => setCheckPassword(event.target.value)} className="b pa2 input-reset ba bg-transparent hover-black w-100" type="password" name="password"  id="password"/>
                            </div>
                        </fieldset>                            
                            <div className="center">
                                    <input 
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    onClick={onSubmitRegister} 
                                    value="Register"/>    
                            </div>                            
                        </div>
                    </main>
            </article>
        
        </>
    );
}

export default Register;