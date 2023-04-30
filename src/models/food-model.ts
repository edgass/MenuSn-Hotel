

export class FoodModel {
    private categoryId : string;
    private description: string;
    private hotelId: string;
    private image: string;
    private name: string;
    private prix: number;
  
    
  
  
    constructor(categoryId:string,description:string,hotelId: string,image:string,name:string,prix:number) {
      this.categoryId = categoryId;
      this.description = description;
      this.hotelId = hotelId;
      this.image = image;
      this.name = name;
      this.prix = prix;
     


    }
}

//export default Element;