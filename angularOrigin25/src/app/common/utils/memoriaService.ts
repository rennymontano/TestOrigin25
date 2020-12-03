import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MemoriaService {
    memoryContext: object;

    constructor() {
        this.memoryContext = {};
    }

    saveDataInMemory(key, data) {
        this.memoryContext[key] = data;
    }

    getDataFromMemory(key) {
        return this.memoryContext[key];
    }
}