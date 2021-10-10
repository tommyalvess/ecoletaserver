import {Request, Response} from 'express';
import knex from '../database/connection';
import Knex, { KnexTimeoutError } from 'knex';


class PointsControllers {

    async index(req: Request, res: Response){
        const { city, uf, items } = req.query;

        //transformando em um array e serparando por ',' e se tiver espaço faz um map trim. 
        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points  = await knex('points')
            .join('points_has_items', 'points.id', 'points_has_items.point_id')
            .whereIn('points_has_items.item_id', parsedItems)//se tem no banco pelomenos um dos valores passados 
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct() //para não retornar algo que ja veio, nao retornar duas vezes.
            .select('points.*');

        const serializedPoint = points.map(point => {
           return{
            ...point,
            image_url: `http://192.168.0.115:3000/uploads/${point.image}`
           }
        });    

        res.json(points);
    };

    async show(req: Request, res: Response){
        const { id } = req.params;

        const point = await knex('points').where('id', id).first();

        if(!point){
            return res.status(400).json({message: 'Point not found.'});
        }

        const items = await knex('items')
            .join('points_has_items', 'items.id', 'points_has_items.item_id')
            .where('points_has_items.point_id', id)
            .select('items.title');

        const serializedPoint = {
            ...point,
            image_url: `http://192.168.0.115:3000/uploads/${point.image}`
            
        }   

        return res.json({point: serializedPoint, items});
    };

    async create(req: Request, res: Response) {

        const {
            name, 
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = req.body;

        //evitando que um query seja execurtado se um outra não foi executado.
        //usado quando tem dois inserts
        const trx = await knex.transaction();

        const point = {
            image: req.file.filename,  
            name, 
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        }
    
        const insertedIds = await trx('points').insert(point);
    
        const point_id = insertedIds[0];
        
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id,
            };
        })
    
        await trx('points_has_items').insert(pointItems);

        await trx.commit();
    
        return res.json({
            id: point_id,
            ... point,
        });

    };

}

export default PointsControllers;