export function usePermission(){


function canManageAtestados(role){

    return [
        "admin",
        "coordinator",
        "secretary"
    ].includes(role);

}


return {

    canManageAtestados

};


}