import React, { Component,useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from "primereact/inputtext";
import {Image} from "primereact/image";
import { Avatar } from 'primereact/avatar';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { addFoodSlice } from '../store/food-store';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {useSelector,useDispatch} from "react-redux"
import { useAppSelector } from '../hook';
import { classNames } from 'primereact/utils';
import './FormDemo.css';
import { Column } from 'primereact/column';
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { RadioButton } from "primereact/radiobutton";
import { updateFood } from '../store/update-food-store';
import { fetchCategory } from '../store/fetch-category-store';
import { ProgressSpinner } from 'primereact/progressspinner';
import 'firebase/storage';
import { CategoryModel } from '../models/category';
import { fetchFoods } from '../store/fetch-food-store';


export default function UpdateFood(props){


    const dispatch = useDispatch();
    const state = useAppSelector(state=>state.addFoodSlice);
    const categoryState = useAppSelector(state=>state.fetchCategorySlice);
    const authState = useAppSelector(state=>state.authSlice);
    const [files, setFiles] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [currentCategorie, setCurrentCategorie] = useState([]);
  //  var message,hideModal = props;


    useEffect(() =>{
        setFiles(props.foodToUpdate[0].imagepath);
        
         for(let i=0;i<categoryState.entities.length;i++){
            if(categoryState.entities[i].id == props.foodToUpdate[0].categoryId){
                setCurrentCategorie(categoryState.entities[i]);
            }
         }
         
        

      }, [dispatch]);


      const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Champ obligatoire';
        }

        if (!data.prix) {
            errors.prix = 'Champ obligatoire';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.accept) {
            errors.accept = 'You need to agree to the terms and conditions.';
        }

        return errors;
    };
   
    const defaultValues = {
        categoryId : '',
        description:'',
        hotelId: '',
        image: '',
        name: '',
        prix: 0
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });

    const onSubmit = async (data,form) => {
        console.log(files);
        await dispatch(updateFood({foodIdToUpdate:props.foodToUpdate[1], categoryId: currentCategorie.id, description: data.description,hotelId:authState.hotel.id,image:data.image,name:data.name,prix:data.prix,file : files }));
        if(state.loading === 'failed'){
          props.message("error","Echec","Veuillez réassayer s'il vous plait",3000)
        }else if(state.loading === 'succeded'){
           props.hideModal(false)
           props.message("success","Parfait !","Votre élément a été mis à jour avec succés",3000)
           dispatch(fetchFoods());
        }else if(state.loading === 'rejected'){
        
            props.message("warn","Cette action a été rejetée, veuillez réasseyer ou contacter MenuSn",3000)
        }
           
     //   setShowMessage(true);

        form.restart();
     };


    return(
        <Form onSubmit={onSubmit} initialValues={{ categoryId: props.foodToUpdate[0].categoryId, description: props.foodToUpdate[0].description, hotelId: authState.hotel.id, image: null, name: props.foodToUpdate[0].name, prix: props.foodToUpdate[0].prix }} /*validate={validate}*/ render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
                 <div className='grid gap-4'>

                 <div className="col-12 md:col-6 lg:col-3 ">
                 <Avatar className='' image=  {files.objectURL == "" | files.objectURL == null ? props.foodToUpdate[0].imagepath : files.objectURL } size="xlarge" shape="circle" />  
            
                    </div>

                    <div className="col-12 md:col-6 lg:col-3">
                        <Field name="name" render={({ input, meta }) => (
                            <div className="p-inputgroup">
                                <InputText id="name" {...input} placeholder="Nom de la nourriture" />        
                            </div>    
                        )} />   
                                
                    </div>

                   
                    <div className="col-12 md:col-6 lg:col-3">
                        <Field name="prix" render={({ input, meta }) => (
                            <div className="p-inputgroup">
                            <InputText id="prix" {...input}  placeholder="Prix" />
                            <span className="p-inputgroup-addon">FCFA</span>
                         </div>  
                        )} />   
                                
                    </div>

                    <div className="col-12 md:col-6 lg:col-3">
                        <Field name="name" render={({ input, meta }) => (
                           <FileUpload onSelect={(event)=>
                        
                            {
                                setFiles(event.files[0])
                            }
                        } multiple={false} chooseLabel="Changer l'image principale" mode='basic' name="demo" url="./upload"
                    
                           ></FileUpload>
                        )} />   
                                
                    </div>

                    <div className="col-12 md:col-6 lg:col-3">
                        <Field name="category" render={({ input, meta }) => (
                            <Dropdown  id="categoryId" {...input} optionLabel="nom"
                            // value={category} onChange={(e) => {this.setCategory({categoryList: e.value})}} placeholder="Selectionner une categorie"
                            value={currentCategorie}
                            onChange={({ value }) => setCurrentCategorie(value)}
                          defaultValue={categoryState.entities[0]}
                            placeholder="Selectionner une categorie"
                            options={categoryState.entities?.length === 0 ? [{ name: "Liste Vide" }] :
                                    categoryState.loading == 'pending' ? [{ name: "En cours de chargement" }] :
                                categoryState.entities} />
                        )} />   
                                
                    </div>

                    <div className="col-12 md:col-6 lg:col-3">
                        <Field name="description" render={({ input, meta }) => (
                            <div className="p-inputgroup">
                                 <div className="p-inputgroup">
                                                    <InputTextarea id="description" {...input} placeholder='Rediger une description' rows={5} cols={30}/>     
                                                
                                                </div> 

                            </div>
                        )} />   
                                
                    </div>

            
                    <div className="grid-cols-12 place-content-center">
                    {state.loading === "pending" ? <ProgressSpinner style={{width: '50px', height: '50px'}}></ProgressSpinner> : 
                                <Button type='submit' label="Enregistrer" className="p-button-success" />}
                        
                    </div>    
                    
                </div>
       
            </form>

        )} />
        
           
               

    );
}