

export class FoodModel {
     categoryId : string;
     description: string;
     hotelId: string;
     image: string;
     name: string;
     prix: number;
     imagepath : string;
  
    
  
  
    constructor(categoryId:string,description:string,hotelId: string,image:string,name:string,prix:number,imagepath:string) {
      this.categoryId = categoryId;
      this.description = description;
      this.hotelId = hotelId;
      this.image = image;
      this.name = name;
      this.prix = prix;
      this.imagepath = imagepath;
     


    }
}

//export default Element;