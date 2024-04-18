


export function userFreeTrialDaysRemain(user:User|null|undefined):number{
    if(user==null) return -1
    let endDate = new Date(user.created)
    endDate.setDate(endDate.getDate() + 7)
    const differenceInMs: number = endDate.getTime() - new Date().getTime();
    return Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
}
export function isUserPremium(customer:Customer|null|undefined):boolean{
    return customer != null && customer.tier > 0
}