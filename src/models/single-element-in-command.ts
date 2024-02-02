import { FoodModel } from "./food-model";

export class SingleElementInCommande {
     element : FoodModel;
     quantity : number;
     isSimpleAdd : boolean;
    
  
  
    constructor(element:FoodModel,qtt:number,isSimpleAdd:boolean) {
      this.element = element;
       this.quantity = qtt;
       this.isSimpleAdd = isSimpleAdd;


    }
}

export default SingleElementInCommande;