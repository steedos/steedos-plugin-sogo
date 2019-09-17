export function getEntityState(state: any, entityName: string){
    console.log("getUsersState...", state, entityName)
    return state.entities[entityName]
}