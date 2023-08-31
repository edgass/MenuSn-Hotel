

export class SessionCaisseModel {
     active : boolean;
     fermetureTimestamp: bigint;
     ouvertureTimestamp: bigint;
     fondDeCaisse: number;
     userId: string;
   
  
    
  
  
    constructor(active:boolean,fermetureTimestamp:bigint,ouvertureTimestamp: bigint,fondDeCaisse:number,userId:string) {
      this.active = active;
      this.fermetureTimestamp = fermetureTimestamp;
      this.ouvertureTimestamp = ouvertureTimestamp;
      this.fondDeCaisse = fondDeCaisse;
      this.userId = userId;
  
     


    }
}

//export default Element;