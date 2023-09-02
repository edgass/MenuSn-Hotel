

export class SessionCaisseModel {
    id : string;
    hotelId : string;
     active : boolean;
     fermetureTimestamp: number;
     ouvertureTimestamp: number;
     fondDeCaisse: number;
     userId: string;
   
  
    
  
  
    constructor(id:string,active:boolean,fermetureTimestamp:number,ouvertureTimestamp: number,fondDeCaisse:number,userId:string,hotelId:string) {
      this.id = id;
 
      this.active = active;
      this.fermetureTimestamp = fermetureTimestamp;
      this.ouvertureTimestamp = ouvertureTimestamp;
      this.fondDeCaisse = fondDeCaisse;
      this.userId = userId;
      this.hotelId = hotelId;
      
  
     


    }
}

//export default Element;