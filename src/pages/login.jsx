
import React, { useEffect, useState,useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {useSelector,useDispatch} from "react-redux"
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import { authSlice,signIn } from '../store/auth-store';
import './FormDemo.css';
import { useAppSelector } from '../hook';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';

export const Login = () => {


    const toast = useRef(null);

    const displayMessage = (severity,summary,details,life) => {
      toast.current.show({ severity: severity, summary: summary, detail: details, life: life });
  
  }


    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({email:"",password:""});
    const state = useAppSelector(state=>state.authSlice);
    const dispatch = useDispatch();

    const defaultValues = {
        email: '',
        password: '',
    }

    useEffect(() => {
        
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {
         await dispatch(signIn({ email: data.email, password: data.password }));
         if(state.error && state.error.toString().includes("auth/wrong-password")){
            displayMessage("error","Mot de passe Incorrect","Nous reconnaissons cet adresse email mais le mot de passe que vous avez saisie est incorrect",3000)
         }else if(state.error && state.error.toString().includes("auth/user-not-found")){
            displayMessage("warn","Utilisateur introuvable","Nous ne retrouvons pas un utilisateur avec cet email, veuillez revoir votre adresse mail",3000)
         }else if(state.error && state.error.toString().includes("auth/too-many-requests")){
            displayMessage("error","Une Erreur est survenue","Veuillez réessayer plus tard Svp",3000)
         }
            
      //  reset();
      };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };


    return (
        <div className="form-demo">
            <Dialog visible={showMessage} onHide={() => setShowMessage(false)} position="top" showHeader={false} breakpoints={{ '960px': '80vw' }} style={{ width: '30vw' }}>
                <div className="flex justify-content-center flex-column pt-6 px-3">
                    <i className="pi pi-check-circle" style={{ fontSize: '5rem', color: 'var(--green-500)' }}></i>
                    <h5>Registration Successful!</h5>
                    <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
                        Your account is registered under name <b>{formData.name}</b> ; it'll be valid next 30 days without activation. Please check <b>{formData.email}</b> for activation instructions.
                    </p>
                </div>
            </Dialog>

            <Toast ref={toast} position="top-left" className="cssclassname"></Toast>


            <div className="flex justify-content-center m-12">
                <div className="card">
                    <h5 className="text-center">Connexion</h5>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
                        <div className="field">
                            <span className="p-float-label p-input-icon-right">
                                <i className="pi pi-envelope" />
                                <Controller name="email" control={control}
                                    rules={{ required: 'Email requis.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} 
                                        />
                                )} />
                                <label htmlFor="email" className={classNames({ 'p-error': !!errors.email })}>Email*</label>
                            </span>
                            {getFormErrorMessage('email')}
                        </div>
                        <div className="field">
                            <span className="p-float-label">
                                <Controller name="password" control={control} rules={{ required: 'Password is required.' }} render={({ field }) => (
                                    <Password id={field.name} {...field} feedback={false}/>
                                )} />
                                <label htmlFor="password" className={classNames({ 'p-error': errors.password })}>Mot de passe*</label>
                            </span>
                            {getFormErrorMessage('password')}
                        </div>
                      
                          <div className='mt-4 flex items-center'>
                            {state.loading == true ? <ProgressSpinner style={{width: '50px', height: '50px'}}></ProgressSpinner> : 
                          <Button type="submit" label="Se Connecter" className="mt-2"/> }
                          </div>     
                       
                             
                       
                    </form>
                </div>
            </div>
        </div>
    );
}
                 