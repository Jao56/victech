import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ItemService {
    urlAPI = "http://localhost:8080/api"

    constructor(private http: HttpClient) {}

    buscarItens(){
        return this.http.get<any>(`${this.urlAPI}/item/buscar`);
    }
}