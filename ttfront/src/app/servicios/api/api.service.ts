import { Injectable } from '@angular/core';
import { Coment, Query } from '../../modelos/query.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { top25 } from '../../modelos/querysearch.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://127.0.0.1:8000/api/";

  constructor(private http:HttpClient) { }

  //CRUD QUERY
  queryGetList(name: string):Observable<Query[]>{
    let direccion = this.url+"v1/querysbyuser/"+name+"/";
    return this.http.get<Query[]>(direccion);
  }
  queryGet(name: string):Observable<top25[]>{
    let direccion = this.url+"v1/querys/"+name+"/";
    return this.http.get<top25[]>(direccion);
  }

  queryDelete(name: string):Observable<any>{
    let direccion = this.url+"v1/querys/"+name+"/";
    return this.http.delete(direccion);
  }

  queryPost(objeto: Query):Observable<any>{
    let direccion = this.url+"v1/querys";
    return this.http.post(direccion, objeto);
  }

  queryPut(objeto: Query):Observable<any>{
    let direccion = this.url+"v1/querys/"+objeto.id+"/";
    return this.http.put(direccion, objeto);
  }

  //CRUD COMMUNITY
  querycomunityGet(name: string):Observable<Query[]>{
    let direccion = this.url+"v1/querysexuser/"+name+"/";
    return this.http.get<Query[]>(direccion);
  }

  querycomentsGet(name: string):Observable<Coment[]>{
    let direccion = this.url+"v1/combyidquery/"+name+"/";
    return this.http.get<Coment[]>(direccion);
  }

  queryGetTop25(name: string):Observable<top25[]>{
    let direccion = this.url+"bigquery/"+name;
    return this.http.get<top25[]>(direccion);
  }

  comPost(objeto: Coment):Observable<any>{
    let direccion = this.url+"v1/queryscom/";
    return this.http.post(direccion, objeto);
  }

}
