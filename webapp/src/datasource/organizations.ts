import * as Odata from 'ts-odata-client'
import * as Entitys from '../entitys'

export class Organizations{
    async getOrganizations(options?: any){
        if(!options){
            options = {top: 10, skip: 0}
        }
        const endpoint = "http://192.168.3.2:5000/api/odata/v4/51ae9b1a8e296a29c9000001/organizations";
        const requestInit = ()=>{
            return {
                headers: {
                    'X-Auth-Token': 'eyrVTOxWM_CHiXlOy6r2zWbGfkbvB6J7cRYC1T2bWQs',
                    'X-User-Id': '51a842c87046900538000001'
                }
            }
        }
        const baseQuery = Odata.ODataV4QueryProvider.createQuery<Entitys.Organization>(endpoint, requestInit);

        const query = baseQuery.select('_id', 'name', 'fullname', 'children').top(options.top || 10).skip(options.skip || 0)

        let results = await query.getManyAsync();

        console.log('results', results);

        return results
    }
}