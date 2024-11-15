export function getStatusColor(lastTransactionDate) {
    const currentDate = new Date();
    const transactionDate = new Date(lastTransactionDate);
    const differenceInDays = (currentDate - transactionDate) / (1000 * 60 * 60 * 24);
    
    if (differenceInDays <= 7) return "green";
    if (differenceInDays <= 14) return "yellow";
    return "red";
}