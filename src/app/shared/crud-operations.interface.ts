import { Observable } from "rxjs";

export interface CrudOperations<T, ID, Response> {
    save(t: T): Observable<Response>;
    update(id: ID, t: T): Observable<Response>;
    findOne(id: ID): Observable<T>;
    findAll(): Observable<T[]>;
    delete(id: ID): Observable<Response>;
}
