export class Capteur {
    type: string;
    src:{
        danger:string;
        warning:string;
        success:string
    };
    text:{
        danger:string;
        warning:string;
        success:string
    };
    who?:string;
    value?:number;
    values?:number[];
    etat?:number;
    seuil?: number;
}