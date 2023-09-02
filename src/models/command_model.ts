import SingleElementInCommande from "./single-element-in-command";

export class CommandModel {
    private hotelId : string;
    private caisseId : string;
    private element: SingleElementInCommande[];
    private emplacement: string;
    private date: Date;
    
  
  
    constructor(hotelId:string,command:SingleElementInCommande[],emplacement: string,date:Date,caisseId:string) {
      this.hotelId = hotelId;
      this.caisseId = caisseId;
      this.element = command;
      this.emplacement = emplacement;
      this.date = date;


    }
}

export default CommandModel;