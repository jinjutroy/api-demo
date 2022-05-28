import fs from "fs";
import data from "../data.json";
export interface Quantity {
    value: [Row: any];
}


export interface Row {
    id: number;
    message: string;
    text: string;
    type: string;
}

const getListId = ()=>{
    let listId: Array<number> = [];
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        listId.push(element.id);
    }
    return listId;
} 
const listId = getListId();


export const getListData = () => {
    try {
        return data.filter(value => 
            value.id !== 0
        );;
    } catch (e) {
        console.error(e);
    }
}

export const getDatabyId = (id: number) => {
    if(!listId.includes(id)){
        return [];
    }
    try {
        return data.filter(value => 
            value.id === id
        );
    } catch (e) {
        console.error(e);
    }
}

export const setListData = (obj: Row) => {  
    if(listId.includes(obj.id)){
        return [];
    }
    const temp: Row[] = [
        ...data,
        obj
    ];
    try {
        fs.writeFile("data.json", JSON.stringify(temp), function (err) {
            if (err) throw err;
            console.log('complete');
        });
    } catch (err) {
        console.log('Error writing Metadata.json:' + err)
    }
    return temp;

}
export const updateListData = (obj: Row) => { 
     
    for (let index = 0; index < data.length; index++) {
        if(data[index].id === obj.id) {
            data[index].message = obj.message;
            data[index].type = obj.type;
            data[index].text = obj.text;
        } 
    } 
    try {
        fs.writeFile("data.json", JSON.stringify(data), function (err) {
            if (err) throw err;
            console.log('completed update');
        });
    } catch (err) {
        console.log('Error writing Metadata.json:' + err)
    }
    return data;
}

export const delDataById = (id: number) => {
    var filtered = data.filter(value => value.id === id);
    let i:number;
   for (let index = 0; index < data.length; index++) {
       const element = data[index]; 
       if (element.id === filtered[0].id) { 
           i = index; 
           data.splice(i,1); 
           
           try {
            fs.writeFile("data.json", JSON.stringify(data), function (err) {
                if (err) throw err;
                console.log('complete deleted');
            });
        } catch (err) {
            console.log('Error writing Metadata.json:' + err)
        }
           return data;
       }  
   }
   
   return []; 
}