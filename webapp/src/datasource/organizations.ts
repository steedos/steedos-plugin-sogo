import * as Odata from 'ts-odata-client'
import * as Entitys from '../entitys'

export class Organizations{
    async query(options?: any){
        if(!options){
            options = {top: 10, skip: 0}
        }
        const endpoint = "http://192.168.3.2:5000/api/odata/v4/51ae9b1a8e296a29c9000001/organizations";
        const requestInit = ()=>{
            return {
                headers: {
                    'X-Auth-Token': 'qeY7uk7tiifhDyElCDVKHEKrJndZJ5N1VCF6KZQYgkg',
                    'X-User-Id': '51a842c87046900538000001'
                }
            }
        }
        const baseQuery = Odata.ODataV4QueryProvider.createQuery<Entitys.Organizations>(endpoint, requestInit);

        const query = baseQuery.select('_id', 'name', 'fullname', 'children').top(options.top || 10000).skip(options.skip || 0)

        let results = await query.getManyAsync();

        return results
    }
}