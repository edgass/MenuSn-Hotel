import React, { Component,useEffect } from 'react';
import { InputText } from "primereact/inputtext";
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { addFoodSlice } from '../store/food-store';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {useDispatch} from "react-redux"
import { useAppSelector } from '../hook';
import { classNames } from 'primereact/utils';
import './FormDemo.css';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { postNewFood } from '../store/food-store';
import { fetchCategory } from '../store/fetch-category-store';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'firebase/storage';
import { CategoryModel } from '../models/category';


export default function UpdateFood(props){


    const dispatch = useDispatch();
    const state = useAppSelector(state=>state.addFoodSlice);
    const categoryState = useAppSelector(state=>state.fetchCategorySlice);
    const authState = useAppSelector(state=>state.authSlice);
    const [files, setFiles] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
  //  var message,hideModal = props;


    useEffect(() =>{
       // console.log("Food to control is "+props.foodToUpdate.name)
         dispatch(fetchCategory());

      }, [dispatch]);

   
    const defaultValues = {
        categoryId : props.foodToUpdate.categoryId,
        description: props.foodToUpdate.description,
        hotelId: props.foodToUpdate.hotelId,
        image: props.foodToUpdate.image,
        name: props.foodToUpdate.name,
        prix: props.foodToUpdate.prix
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data) => {
        console.log(data)
        console.log(files)
        await dispatch(postNewFood({ categoryId: data.categoryId.id, description: data.description,hotelId:authState.hotel.id,image:data.image,name:data.name,prix:data.prix,file:files }));
        if(state.loading === 'failed'){
          props.message("error","Echec","Veuillez réassayer s'il vous plait",3000)
        }else if(state.loading === 'succeded'){
           props.hideModal(false)
           props.message("error","Parfait !","Votre élément a été ajoutée",3000)
        }else if(state.loading === 'rejected'){
        
            props.message("warn","Cette action a été rejetée, veuillez réasseyer ou contacter MenuSn",3000)
        }
           
     //  reset();
     };


    return(
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-2 md:grid-cols-2 gap-4'>
            
            <div className="grid-cols-12">
            <Controller name="name" control={control}
                               //     rules={{ required: 'Email requis.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <div className="p-inputgroup">
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Nom de la nourriture" />    
                                        
                                </div>    
                                     
                                )} />
                          
            </div>

            <div className="grid-cols-12">
            <Controller name="prix" control={control}
                              //      rules={{ required: 'Email requis.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <div className="p-inputgroup">
                                        <InputText id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder="Prix" />
                                        <span className="p-inputgroup-addon">FCFA</span>
                                    </div>
                                     
                                )} />
                
            </div>
        
            <div className="grid-cols-12">
            <FileUpload onSelect={(event)=>setFiles(event.files[0])} multiple={false} chooseLabel='Choisir une image principale' mode='basic' name="demo" url="./upload"
            
            ></FileUpload>
            </div>

            <div className="grid-cols-12">
            <Controller name="categoryId" control={control}
                                 //   rules={{ required: 'Email requis.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <Dropdown optionLabel="nom" id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })}
                                        // value={category} onChange={(e) => {this.setCategory({categoryList: e.value})}} placeholder="Selectionner une categorie"
                                        // value={category} onChange={(e) => {setCategory(e.value)}}
                                        value={control.id}
                                         placeholder="Selectionner une categorie"
                                         options={categoryState.entities?.length === 0 ? [{ name: "Liste Vide" }] :
                                                categoryState.loading == 'pending' ? [{ name: "En cours de chargement" }] :
                                            categoryState.entities} />
                                     
                                )} />
            </div>

            <div className="grid-cols-12">
                <div className="p-inputgroup">
                <Controller name="description" control={control}
                                 //   rules={{ required: 'Email requis.', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: 'Invalid email address. E.g. example@email.com' }}}
                                    render={({ field, fieldState }) => (
                                        <div className="p-inputgroup">
                                        <InputTextarea id={field.name} {...field} className={classNames({ 'p-invalid': fieldState.invalid })} placeholder='Rediger une description' rows={5} cols={30}/>     
                                        
                                </div>    
                                     
                                )} />
                
     
                
             
                    
                </div>
            </div>
            <div className="grid-cols-12 place-content-center">
            {state.loading === "pending" ? <ProgressSpinner style={{width: '50px', height: '50px'}}></ProgressSpinner> : 
                          <Button type='submit' label="Enregistrer" className="p-button-success" />}
                
            </div>    
            
        </div>
        </form>

    );
}