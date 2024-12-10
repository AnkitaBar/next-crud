// for login page
export interface IloginProps {
    email: string,
    name: string,
    photo:string,
    password: string,
    token: string,
    message: string,
    status: number
}
export interface loginProps extends IloginProps {
    user: IloginProps
}

////////////////// register //////////////////////////////////////////////////////////////////////
export interface IregisterProps {
    token: string,
    name: string,
    email: string,
    password: string,
    mobile: string,
    photo: File,
    message: string,
    status: number,
    
}
export interface registerProps extends IregisterProps {
    user: IregisterProps
}