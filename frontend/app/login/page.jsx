"use client"

import { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterForm";

export default function HomePage() {

    const [form, setform] = useState(true);

    return (
        <>
            <div className="authFormContainer">
                {form
                    ? <>
                        <div className="authFormContainer2">
                            <LoginForm />
                            <span className="text">Don't have an account? <b onClick={() => setform(!form)} className="pointer highlightText">Create one!</b></span>
                        </div>
                    </>
                    : <>
                        <div className="authFormContainer2">
                            <RegisterForm setform={setform} />
                            <span className="text">Already have an account? <b onClick={() => setform(!form)} className="pointer highlightText">Log in</b></span>
                        </div>
                    </>
                }
            </div >
        </>
    )
}