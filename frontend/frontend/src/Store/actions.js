function convertActionToName(actionName) {
    return actionName.replace(/([A-Z])/g, "_$1").toUpperCase();
}
export const actions =new Proxy(
    
    {},
    {
        
    get:function (target,prop){

    debugger;
    if(target[prop]===undefined)
    return function(args){
        return{
            type: convertActionToName(prop),
        payload:args
        } ;
    };
   
    else return target[prop];
}

});
