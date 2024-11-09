export const uniqueGeneratorWalletId = () => { 
    const wallet_id = String(Math.floor(Math.pow(10, 6) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1)) + "-wallet_id");
    return wallet_id;
}

export const referenceGenerator = () => {
    const reference = String(Math.floor(Math.pow(10, 6) + Math.random() * (Math.pow(10, 6) - Math.pow(10, 5) - 1)) + "-reference");
    return reference;
}
