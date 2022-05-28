import { delDataById, updateListData } from './../../../src/listData';
import { getDatabyId, setListData } from '../../../src/listData'; 
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id:number = Number(req.query.id);

    const method = req.method;
    
    let result;
 
    switch (method) {
        case 'GET':
            result = await getDatabyId(id);
            res.status(200).json(result);
            break; 
        case 'PUT':
            const {idDel} = req.body;
            result = await delDataById(idDel);
            res.status(200).json({result, message: `customer with id: ${id} updated`});
            break;  
        case 'PUT':
            const {message,text,type} = req.body;
            result = await updateListData({
                id,message,text,type    
            });
            res.status(200).json({result, message: `customer with id: ${id} updated`});
            break;  
        default:
          res.status(405).end(`Method ${method} Not Allowed`);
      }
}
 