import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpUtilsService } from './_base/crud';
 
@NgModule({
    imports:[
        HttpClientModule
    ],
    exports:[
        HttpClientModule
    ],
    providers:[
        HttpUtilsService
    ]
})
export class SharedModule{}