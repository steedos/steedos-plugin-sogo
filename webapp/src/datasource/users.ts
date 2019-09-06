import * as Odata from 'ts-odata-client'
import * as Entitys from '../entitys'

export class Users{
    async getUsers(options?: any){
        if(!options){
            options = {top: 10, skip: 0}
        }
        const endpoint = "http://192.168.3.2:5000/api/odata/v4/51ae9b1a8e296a29c9000001/space_users";
        const requestInit = ()=>{
            return {
                headers: {
                    'X-Auth-Token': 'qeY7uk7tiifhDyElCDVKHEKrJndZJ5N1VCF6KZQYgkg',
                    'X-User-Id': '51a842c87046900538000001'
                }
            }
        }
        const baseQuery = Odata.ODataV4QueryProvider.createQuery<Entitys.User>(endpoint, requestInit);
        let query = baseQuery.select('_id', 'name', 'email', 'user', 'username', 'position', 'mobile').top(options.top || 10).skip(options.skip || 0)
        if(options.filters){
            options.filters.forEach((element: any) => {
                query = query.filter(p => p[element.operation](element.columnName, element.value));
            });
        }
        let results = await query.getManyAsync();
        return results
    }
}