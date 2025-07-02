import CommonForm from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState={
    email:'',
    password:'',
}



function AuthLogin(){

    const [formData,setFormData]=useState(initialState);

    function onSubmit(){

    }

    return(
        <div className="mx-auto w-full max-w-md space-y-6">
            <div className="text-center">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">Sign in to your account</h1>
                <p>Don't have account    
                    <Link  className="font-medium text-primary hover:underline ml-2" to='/auth/register'>Register</Link>
                </p>
            </div>
           <CommonForm
                formControls={LoginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
           />
        </div>
    )
}

export default AuthLogin;