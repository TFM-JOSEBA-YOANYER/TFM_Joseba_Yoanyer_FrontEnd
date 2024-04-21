import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';
import useAuth from '../../hooks/useAuth';

export const Login = () => {

  const { form, changed } = useForm({});
  const [ login, setLogin ] = useState("not_sended");

  const { setAuth } = useAuth();

  const loginUser = async(e) =>{
    e.preventDefault();

    //Datos del formulario
    const userToLogin = form;

    //Peticion al backend
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers:{
        "Content-Type" : "application/json"
      },
    });

    const data = await request.json();
    
    //Persistir los datos en el navegador
    if(data.status === "success" && data.message == 'Te has identificado correctamente'){
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify( data.user ));

      setLogin("exists");

      // Setear datos en el auth
      setAuth(data.user);

      // Redirección
      setTimeout(()=>{
        window.location.reload();
      }, 1000);

    }else if(data.status === "Error" && data.message == 'El password No se ha identificado correctamente'){
      setLogin("password");
    }else{
      setLogin("error");
    }
  }

  return (
    <>
        <header className="content__header">
                    <h1 className="content__title">Login</h1>
        </header>

        <div className="content__posts">

        <strong > { login == "exists" ? <b className='alert alert-success' >Usuario Ingresado Correctamente !!</b> : "" } </strong>
            <strong > { login == "password" ? <b className='alert alert-danger' >El password No coincide !!!</b> : "" } </strong>
            <strong > { login == "error" ? <b className='alert alert-danger' >Usuario no existe!!</b> : "" } </strong>
           

          <form onSubmit={ loginUser } className='form-login' >

            <div className='form-group' >
              <label htmlFor="email">Email</label>
              <input type="email" name="email" onChange={changed} />
            </div>

            <div className='form-group' >
              <label htmlFor="password">Contraseña</label>
              <input type="password" name="password" onChange={changed} />
            </div>
          
            <div>
              <input type="submit" value="Identificate" className='btn btn-success' />
            </div>

          </form>
        </div>
    </>
  )
}
