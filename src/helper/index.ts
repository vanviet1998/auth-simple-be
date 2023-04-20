import { UserEntity } from './../shared/dto/user/user.dto';
import * as  fs from "fs";
import { join } from 'path';


const PATH_USER_JSON_FILE = join(process.cwd(), '/src/asset/users.json')


export function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

export const writeUserToJSon = async (data: UserEntity):Promise<void> => {
    const userExited = JSON.parse(await readFile(PATH_USER_JSON_FILE) || "[]")
    if(!userExited.length){
        await writeFile(PATH_USER_JSON_FILE,Buffer.from(JSON.stringify([data])))

    }else{
        userExited.push(data)
        await writeFile(PATH_USER_JSON_FILE,Buffer.from(JSON.stringify(userExited)))
    }
   
}
export const readUserToJSon =  ():UserEntity[] => {
    const userExited =  JSON.parse(readFile(PATH_USER_JSON_FILE) || "[]")
    return userExited
}




async function writeFile(filename:string, data: Buffer):Promise<void> {
      fs.writeFileSync(filename, data)
        
  }

   function readFile(path:string):any {
    return fs.readFileSync(path, 'utf-8')
  }
