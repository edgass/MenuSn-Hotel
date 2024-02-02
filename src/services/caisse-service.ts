import db, { auth } from "../firebase.config";
import { getFirestore, collection, addDoc,query, where, getDocs, deleteDoc, doc, getDoc  } from "firebase/firestore";
import { HotelModel } from "../models/hotel-model";
import { CategoryModel } from "../models/category";
import { SessionCaisseModel } from "../models/session-caisse-model";
import Swal from "sweetalert2";


//const elementsCollectionRef = collection(db, "elements");


export class CaisseService{

  
 
 // async getAllElements(catId:string) : Promise<Element[]>{
    async getAllElements() : Promise<Element[]>{
       
    var elements : Element[] = [];
    try{
        const resp = db.collection('elements');
        // var data= await resp.get();
         var data= await resp.where('hotelId' ,'==', 'HOnjOpu9qarlYU1SZzny').get();
     
             data.docs.forEach(item=>{
             
               elements = [...elements,[item.data(),item.id]] as Element[];
               
          //  var element : Element = new Element(item.id,item.data().name,item.data().userId,item.data().name,item.data().prix,item.data().image,item.data().description);
            //   elements = [...elements,element] as Element[];
                })
           //  console.log(elements)
                         return elements;  
    }catch(e){
        console.log(e);
        return elements
    }
}

async getActiveSession() : Promise<SessionCaisseModel | undefined>{
       
  
  try{
      const resp = db.collection('session');
      // var data= await resp.get();
       var data= await resp.where('active' ,'==', true).get();
      
          if(!data.empty){
            var activeSession = data.docs[0].data();
            
            return new SessionCaisseModel(data.docs[0].id, activeSession.active,activeSession.fermetureTimestamp,activeSession.ouvertureTimestamp,activeSession.fondDeCaisse,activeSession.userId,activeSession.hotelId)
            
          }else{
            return undefined;
          }
        
        
  }catch(e){
      console.log(e);
     
  }
}

async getSingleElementVisibility(id:string) : Promise<Boolean | null>{
       
  var elements : Element;
  let visibility = null;
  const docRef = doc(db, "elements", id);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        console.log(docSnap.data());
        visibility = docSnap.data().visibility;
    } else {
        console.log("Document does not exist")
    }
} catch(error) {
    console.log(error)
}
return visibility;
}
    
   // async postNewCommand(hotelId:string,tableId:String,) : Promise<Element[]>{
        async postNewFood(categoryId:string,description:string,hotelId: string,image:string,name:string,prix:number,imagepath:string){
       
        try{
             // Ajouter un nouveau document à la collection "commandes"
    const docRef = await addDoc(collection(db, "elements"), {
        categoryId : categoryId,
        description : description,
        hotelId : hotelId,
        image : image,
        name : name,
        prix : prix,
        imagepath:imagepath
        
      });
  
      console.log("Food créée avec succès !", docRef.id);
      return docRef.id;
        }catch(e){
            console.log(e);
        
        }
    }

    async updateFood(foodId:string, categoryId:string,description:string,hotelId: string,image:string,name:string,prix:number,imagepath:string){
     console.log(foodId, categoryId,description,hotelId,image,name,prix,imagepath);
       
      try{
           // Ajouter un nouveau document à la collection "commandes"
           var docRef = await db.collection("elements").doc(foodId);
           

           docRef.update({
            categoryId : categoryId,
            description : description,
            hotelId : hotelId,
            image : image,
            name : name,
            prix : prix,
            imagepath:imagepath
        })
        .then((e) => {
            console.log("Document successfully updated!", e);
        
        })
        .catch((error) => {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
        });

    return docRef.id;
      }catch(e){
          console.log(e);
      
      }
  }

  async closeSessionCaisse(caisseId:string){
     
     try{
      console.log(caisseId);
          // Ajouter un nouveau document à la collection "commandes"
          let docSnap = db.collection("session").doc(caisseId);
          console.log(docSnap.id)
        
          const timestamp = new Date().getTime();
          docSnap.update({
           active : false,
           fermetureTimestamp : timestamp
       })
       .then((e) => {
           console.log("Document successfully updated!", e);
       
       })
       .catch((error) => {
           // The document probably doesn't exist.
           console.error("Error updating document: ", error);
       });

  
     }catch(e){
         console.log(e);
     
     }
 }

 async changeCommandState(commandId:string, state:string):Promise<boolean>{
  var success = false;
  try{
   console.log(commandId);
       // Ajouter un nouveau document à la collection "commandes"
       let docSnap = db.collection("commande").doc(commandId);
       console.log(docSnap.id)
     

       docSnap.update({
        state : state,
    })
    .then((e) => {
        console.log("Document successfully updated!", e);
    success = true;
    })
    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
        
    });

   
  }catch(e){
      console.log(e);
      return false;
  
  }
  return success;
}

    async deleteFood(foodId:string){
       
      db.collection("elements").doc(foodId).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
  }

    async postNewCaisse(hotelId:string,userId:string,fondCaisse:number){
       
      try{

        this.getActiveSession().then(async(session)=>{
         if(session !== null && session !== undefined){
          if(session.userId !== auth.currentUser?.uid){
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: "Impossible d'ouvrir une caisse car l'utilisateur précedent n'a pas encore fermé sa caisse",
              showConfirmButton: false,
              timer: 5000
            })
            return ;

          }else{
            return;
          }
         }else{
          const timestamp = new Date().getTime();
          const docRef = await addDoc(collection(db, "session"), {
            
            ouvertureTimestamp : timestamp,
            fermetureTimestamp : -1,
            active : true,
            userId : userId,
            fondDeCaisse : fondCaisse,
            hotelId:hotelId
              
            });
        
            console.log("Session créée avec succès !", docRef.id);
            return docRef.id;
         }
        })
        
      
      }catch(e){
          console.log(e);
      
      }
  }

    async searchAccount(userId :string): Promise<HotelModel>{
   

      const q = await query(collection(db, "accounts"), where("userId", "==", userId));
     // const querySnapshot = await getDocs(q);
      const hot = await getDocs(q)
        const hotelData = await db.collection('hotel').doc(hot.docs[0]?.data().hotelId).get()
        const hotel = new HotelModel(hotelData?.id,hotelData.data()?.nom,hotelData.data()?.tel);

  
      console.log(hotel)
    //  console.log(querySnapshot.docs[0]?.data().hotelId);
    // hotel = (querySnapshot.docs[0]?.id,querySnapshot.docs[0]?.data().name,querySnapshot.docs[0]?.data().tel)
      return hotel ;
    }

    async fetchCategorys() : Promise<CategoryModel[]>{
       
      var elements : CategoryModel[] = [];
      try{
          const resp = db.collection('category');
          // var data= await resp.get();
           var data= await resp.get();
       
               data.docs.forEach(item=>{
                   console.log(item.id)
                  elements = [...elements,new CategoryModel(item.id,item.data().name,item.data().position)] as CategoryModel[];
            //  var element : Element = new Element(item.id,item.data().name,item.data().userId,item.data().name,item.data().prix,item.data().image,item.data().description);
              //   elements = [...elements,element] as Element[];
                  })
             //  console.log(elements)
                           return elements;  
      }catch(e){
          console.log(e);
          return elements
      }
  }



    
/*     async getAllCategory(): Promise<Category[]>{
        var categorys : Category[] = [];
        const resp = db.collection('category');
        const elemResp = db.collection('elements');
        var data= await resp.get();
            data.docs.forEach (async(item)=>{
            
               var listElement = await db.collection('elements').where('userId' ,'==', 'jqbkvhqd').where('categoryId' ,'==', item.id).get();
             //  console.log("doc lengt "+listElement  )   
               if(1==1) {
                categorys = [...categorys,item.data()] as Category[];   
               }     
               })
           console.log(categorys)
                        return categorys;   
    } */

}

const caisseService = new CaisseService();
export default caisseService;