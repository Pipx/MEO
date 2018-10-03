import { Category } from './../../../ionic-template/src/models/category';
import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";


@Injectable()
export class ServerService {

    constructor(private https: Http) { }

    storeCategories(servers: any) {
        return this.https.post('https://meo-db.firebaseio.com/products/categories.json', servers);
    }

    getCategories() {
        return this.https.get('https://meo-db.firebaseio.com/products/categories.json')
            .map((response: Response) => {
                const categories: Category[] = response.json();
                return categories;
            })
    }


    getServers() {
        return this.https.get('https://meo-db.firebaseio.com/products.json');
    }

}