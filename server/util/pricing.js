// Create a pricing module that should calculate the price per gallon based on this formula.
// Suggested Price = Current Price + Margin

// Current price per gallon = $1.50 
// Margin =  Current Price * (Location Factor - Rate History Factor + Gallons Requested Factor + Company Profit Factor)

// Location Factor = 2% for Texas, 4% for out of state.
// Rate History Factor = 1% if client requested fuel before, 0% if no history (you can query fuel quote table to check if there are any rows for the client)
// Gallons Requested Factor = 2% if more than 1000 Gallons, 3% if less
// Company Profit Factor = 10% always


class Pricing {
    static state;
    static previousPurchase;


    constructor(state, previousPurchase) {
        this.state = state;
        this.previousPurchase = previousPurchase;
    }

    
    

    predictPrice(galonsRequested) {
        const locationFactor = this.state === "TX" ? 0.02 : 0.04;
        const rateHistoryFactor = this.previousPurchase ? 0.01 : 0;
        const galRequestFactor = (galonsRequested > 1000) ? .02 : .03;

        const margin = 1.5 * (locationFactor - rateHistoryFactor + galRequestFactor + .1);

        const suggestedPrice = 1.5 + margin;
        const totalPrice = suggestedPrice*galonsRequested;

        return [suggestedPrice, totalPrice];
    }
}

module.exports = Pricing;