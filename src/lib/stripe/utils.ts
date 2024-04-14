

export function isCustomerFreeTrial(customer:Customer|null|undefined):boolean{
    return customer != null &&  customer.tier == 1
}
export function isCustomerPremium(customer:Customer|null|undefined):boolean{
    return customer != null && customer.tier > 0
}