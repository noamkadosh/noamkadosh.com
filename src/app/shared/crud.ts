import { HttpClient } from "@angular/common/http";
import { CrudOperations } from "./crud-operations.interface";
import { Response } from "./response.model";

export abstract class Crud<T, ID> implements CrudOperations<T, ID, Response> {
    constructor(protected http: HttpClient, private base: string) {}

    save(t: T) {
        return this.http.post<Response>(this.base, t);
    }

    update(id: ID, t: T) {
        return this.http.put<Response>(this.base + '/' + id, t, {});
    }

    findOne(id: ID) {
        return this.http.get<T>(this.base + '/' + id);
    }

    findAll() {
        return this.http.get<T[]>(this.base);
    }

    delete(id: ID) {
        return this.http.delete<Response>(this.base + '/' + id);
    }
}
