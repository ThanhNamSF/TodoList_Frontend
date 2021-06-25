import { BaseService } from "./BaseService";
import { Item } from "../models/Item";
import { AppConfig } from '../config/config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ToDoListService extends BaseService{
    private pathAPI = this.config.setting['PathAPI'];
    constructor(private http: HttpClient, private config: AppConfig) { super(); }

    getItems (): Observable<Item[]> {
        return this.http.get<Item[]>(this.pathAPI + 'ToDoList')
                        .pipe(map((res: Item[]) => {
                            return res;
                        }));
    }

    addItem (item: Item): Observable<Item> {
        return this.http.post(this.pathAPI + 'ToDoList', item)
                        .pipe(map((res: Item) => {
                            return res;
                        }));
    }

    deleteItem(id: string): Observable<any>{
        return this.http.delete(this.pathAPI + 'ToDoList?id=' + id);
    }
}