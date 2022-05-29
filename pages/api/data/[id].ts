import { delDataById, updateListData } from './../../../src/listData';
import { getDatabyId, setListData } from '../../../src/listData'; 
import type { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
     });
    const id:number = Number(req.query.id);

    const method = req.method;
    
    let result;
 
    switch (method) {
        case 'GET':
            result = await getDatabyId(id);
            res.status(200).json(result);
            break; 
        case 'DELETE': 
            result = await delDataById(id);
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
 