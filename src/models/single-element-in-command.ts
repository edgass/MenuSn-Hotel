import { FoodModel } from "./food-model";

export class SingleElementInCommande {
     element : FoodModel;
     qtt : number;
    
  
  
    constructor(element:FoodModel,qtt:number) {
      this.element = element;
       this.qtt = qtt;


    }
}

export default SingleElementInCommande;