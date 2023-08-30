import { FoodModel } from "./food-model";

export class SingleElementInCommande {
     element : FoodModel;
     quantity : number;
    
  
  
    constructor(element:FoodModel,qtt:number) {
      this.element = element;
       this.quantity = qtt;


    }
}

export default SingleElementInCommande;