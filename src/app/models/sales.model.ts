import { DatePipe } from "@angular/common/src/pipes";
import { DateAdapter } from "@angular/material";
import { StringLike } from "@firebase/util/dist/esm/src/errors";

export class Sales{
    name: string;
    product: string;
   weight: number;
    price: number;
     custid: string;
     date:Date;
     prodnum:number;
     quantity:number;
}