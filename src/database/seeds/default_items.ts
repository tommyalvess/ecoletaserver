import Knex from 'knex';
//Cirando um list de item já precadastrados

export async function seed(knex: Knex){
   await knex('items').insert([
        { image: 'lampadas.svg', title: 'Lãmpada' },
        { image: 'baterias.svg', title: 'Pilhas e Baterias' },
        { image: 'papeis-papelao.svg', title: 'Papéis e Papelão'},
        { image: 'eletronicos.svg', title: 'Resíduos Eletronicos'},
        { image: 'organicos.svg', title: 'Resíduos Organicos'},
        { image: 'oleo.svg', title: 'Óleo de Cozinha'}
    ]);
}