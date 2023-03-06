

// Initialize the cart object can parse a previous cart object to initialize the new cart object
class Cart {
    items =   [];
    total =  0;
    numItems =  0;

    constructor(prevCart) {
        if (prevCart) {
            this.items = prevCart.items;
            this.total = prevCart.total;
            this.numItems = prevCart.numItems;
        }
    }
    addItem(item, amount) {
        const foundItems = this.items.find(i => i.id === item.id);
        if (foundItems) {
            this.items = this.items.map(i=>{
                if (i.id === foundItems.id) {
                    return {...i, amount: i.amount + amount}
                }
                return i
            })
            this.total += parseInt(item.price);
            this.numItems++;
        } else {
            this.items.push({...item, amount: amount});
            this.total += parseInt(item.price);
            this.numItems++;
        }
    }
    removeItem() {
        const foundItems = this.items.find(i => i.id === item.id);
        if (foundItems) {
            this.items = this.items.map(i=>{
                if (i.id === foundItems.id) {
                    return {...i, amount: i.amount + amount}
                }
                return i
            })
            this.total += parseInt(item.price);
            this.numItems++;
        } else {
            this.items.push({...item, amount: amount});
            this.total += parseInt(item.price);
            this.numItems++;
        }
    }

}

// Add methods to the cart object prototype to add and remove items




module.exports = Cart;