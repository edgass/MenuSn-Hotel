import SingleElementInCommande from "./single-element-in-command";

export class CommandModel {
    private hotelId : string;
    private element: SingleElementInCommande[];
    private emplacement: string;
    private date: Date;
    
  
  
    constructor(hotelId:string,command:SingleElementInCommande[],emplacement: string,date:Date) {
      this.hotelId = hotelId;
      this.element = command;
      this.emplacement = emplacement;
      this.date = date;


    }
}

export default CommandModel;