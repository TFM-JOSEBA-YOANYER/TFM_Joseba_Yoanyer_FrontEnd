import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import { Global } from '../../helpers/Global';

export const Register = () => {

    const { form, changed } = useForm({});
    const [ saved, setSaved ] = useState("not_sended");

    const saveUser = async(e) =>{

        e.preventDefault();

        //Recoger los datos del formulario
        let newUser = form;

        //Guardar usuario en el Backend
        const request = await fetch( Global.url + "user/register" , {
            method: "POST",
            body: JSON.stringify(newUser),
            headers:{
                "Content-Type" : "application/json"
            },
        });

        const data = await request.json();

        // if(data.status === "success")
        if(data.status === "success" && data.message == 'usuario ya existe'){
            setSaved("exists");
        }else if(data.status === "success" && data.message == 'Usuario registrado correctamente'){
            setSaved("saved");
        }else{
            setSaved("error");
        }
    }

  return (
    <>
        <header className="content__header">
                    <h1 className="content__title">Registro</h1>
        </header>

        <div className="content__posts">

            <strong > { saved == "saved" ? <b className='alert alert-success' >Usuario Registrado Correctamente !!</b> : "" } </strong>
            <strong > { saved == "error" ? <b className='alert alert-danger' >Usuario no se ha registrado!!</b> : "" } </strong>
            <strong > { saved == "exists" ? <b className='alert alert-oranger' >Usuario ya existe !!</b> : "" } </strong>

            <form className='register-form' onSubmit={saveUser} >

                <div className='form-group' >
                    <label htmlFor='name'>Nombre</label>
                    <input type='text' name='name' onChange={changed} />
                </div>

                <div className='form-group' >
                    <label htmlFor='surname'>Apellidos</label>
                    <input type='text' name='surname' onChange={changed} />
                </div>

                <div className='form-group' >
                    <label htmlFor='nick'>Nick</label>
                    <input type='text' name='nick' onChange={changed} />
                </div>

                <div className='form-group' >
                    <label htmlFor='email'>Correo Eletrónico</label>
                    <input type='email' name='email' onChange={changed} />
                </div>

                <div className='form-group' >
                    <label htmlFor='password'>Contraseña</label>
                    <input type='password' name='password' onChange={changed} />
                </div>

                <input type='submit' value='Registrate' className='btn btn*-success' />

                

            </form>

        </div>
    </>
  )
}
