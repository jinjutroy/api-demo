import { delDataById, getListData, getDatabyId, setListData } from './../../src/listData';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next' 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  const method = req.method; 
    
  let result;

  switch (method) {
      case 'GET':
        res.status(200).json({   
          data:{  
            value:[ getListData()]||[],}
         })
          break;

      case 'DELETE':
          const {idDel} = req.body;
          const search = getDatabyId(idDel);
         if (search){
          result = await delDataById(idDel);
         }
          res.status(200).json({result, message: `customer with id: ${idDel} deleted`});
          break; 
      case 'POST':
            const {idReq,message, text,type} = req.body; 
            result = await setListData({ 
                "id": idReq,
                "message": message,
                "text": text,
                "type": type
            });  
            res.status(200).json({result, message: `customer with id: ${idReq} created`});
            break;
      default:
        res.status(405).end(`Method ${method} Not Allowed`);
    }
 
} 

