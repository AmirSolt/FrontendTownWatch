

export function isUserFreeTrial(user:User|null|undefined):boolean{
    if(user==null) return false
    let endDate = new Date(user.created)
    endDate.setDate(endDate.getDate() + 7)
    return new Date() < endDate
}
export function isUserPremium(customer:Customer|null|undefined):boolean{
    return customer != null && customer.tier > 0
}