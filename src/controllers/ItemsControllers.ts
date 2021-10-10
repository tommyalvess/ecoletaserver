import {Request, Response} from 'express';
import knex from '../database/connection';

class ItemsControllers {
    async index(req: Request, res: Response){
        const items = await knex('items').select('*');

        //Eu estou tranformando esses dados pra um forma melhor para quem esta requisiando.
        const serializedItems = items.map( item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://192.168.0.115:3000/uploads/${item.image}`
            }
        })
        return res.json(serializedItems);
    }
}

export default ItemsControllers;