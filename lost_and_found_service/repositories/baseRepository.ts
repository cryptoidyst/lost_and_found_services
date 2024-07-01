import { connect } from "http2";
import { object } from "joi";
import { getConnection, getRepository } from "typeorm";

export class BaseRepository {
    model:any
    constructor(model:any){
        this.model = model
    }

    async findOne(filter:any){
        const respository = await getRepository(this.model);
        const result: any = await respository.findOne(filter);
        return result
    }

    async find(){
        const connection = await getConnection();
        const result: any = await connection.manager.find(this.model);
        return result
    }

    async findAll(filter:any){
        const repository = await getRepository(this.model);
        const result: any = await repository.find(filter);
        return result
    }

    async getPagination(currentPage:any = 1, limit:any = 10){
        const offset = (currentPage - 1) * limit;

        return { 
            skip: offset,
            take: limit
        }
    }


    async create(body:object){
        const respository = await getRepository(this.model)
        console.log("calling body", body)
        return await respository.save(body);
    }

    async delete(filter:any){
        const connection = await getConnection();
        const user: any = await connection.manager.delete(this.model, filter);
        return user
    }

    async update(body:any, filter:any){
        const connection = await getConnection();
    
        return await connection.manager.update(this.model, filter, body);
    }

    async insertMany(body:any){
        const connection = await getConnection();
    
        return await connection.manager.save(this.model, body);
    }

}