import { Navigate, useLocation } from "react-router-dom";


export default function CheckAuth({isAuthenticated,user, children}){

    const location=useLocation();

    //if user is not authenticted and trying to access other page then redirect to login page
    if(!isAuthenticated && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
        return <Navigate to='/auth/login'/>
    }

    //if user is Authenticated and trying to access login or register page then based on user role (if "admin" => navigate to admin dashboard or if "user"=>navigate to shopping home page)
    if(isAuthenticated && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
        if(user?.role==='admin'){
            return <Navigate to="/admin/dashboard"/>
        }
        else{
            return <Navigate to="/shop/home"/>
        }
    }

    //if user Authenticated and role not equal to admin and trying to access admin page then redirect to unAuthorized page
    if(isAuthenticated && user?.role !== 'admin' && location.pathname.includes('/admin')){
        return <Navigate to='/unauth-page'/>
    }

    //if user Authenticated and role is admin and if trying to access shopping page then redirect to admin dashboard bcz he not have access to normal user page
    if(isAuthenticated && user?.role==='admin' && location.pathname.includes('/shop')){
        return <Navigate to='/admin/dashboard'/>
    }

    //or else return the children
    return <>{children}</>

}