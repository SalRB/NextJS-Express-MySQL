"use client"

import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";

export default function HomePage() {

    const [form, setform] = useState(true);

    return (
        <>
            {form
                ? <>
                    <LoginForm />
                    <span>Don't have an account? <b onClick={() => setform(!form)} className="pointer">Sign up</b></span>
                </>
                : <>
                    <RegisterForm setform={setform} />
                    <span>Already have an account? <b onClick={() => setform(!form)} className="pointer">Log in</b></span>
                </>
            }
        </>
    )
}