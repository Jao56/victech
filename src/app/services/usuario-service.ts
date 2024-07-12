import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Usuario } from "../model/usuario-model";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{
    urlAPI = "http://localhost:8080/api"

    constructor(private http: HttpClient) {}

    buscarUsuarios(){
        return this.http.get<any>(`${this.urlAPI}/usuario/buscar`);
    }

    salvarUsuarios(usuario:Usuario){
        return this.http.post<any>(`${this.urlAPI}/usuario/salvar`, usuario);
    }
    deletarUsuario(id:Number){
        return this.http.delete(`${this.urlAPI}/usuario/deletar/${id}`)
    }
}