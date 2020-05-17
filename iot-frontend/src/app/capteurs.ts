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
    value?:string;
    etat?:number;
}