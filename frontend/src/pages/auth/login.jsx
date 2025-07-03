import CommonForm from "@/components/common/form";
import { LoginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const initialState={
    email:'',
    password:'',
}



function AuthLogin(){
    const dispatch=useDispatch();

    const [formData,setFormData]=useState(initialState);

    function onSubmit(e){
        e.preventDefault();
        dispatch(loginUser(formData)).then((data)=>{
            if(data?.payload?.success){
                toast.success(data?.payload?.message)
            }
            else{
                toast.error(data?.payload?.message)
            }
            
        })
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