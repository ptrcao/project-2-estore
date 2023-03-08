

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
    removeItem(item, amount) {
      const foundItem = this.items.find(i => i.id === item.id);
        if (foundItem) {
            if (parseInt(amount) === 0) {
                this.items = this.items.filter(i => i.id !== item.id);
                this.total -= foundItem.amount * foundItem.price;
                this.numItems -= foundItem.amount;
                console.log(this.items);
                return;
            }
            this.items = this.items.map(i=>{
                if (i.id === foundItem.id) {
                    console.log(i)  
                    this.total -= i.amount * i.price;
                    this.total += parseInt(amount) * i.price;
                    this.numItems -= i.amount;
                    this.numItems += parseInt(amount); 
                    return {...i, amount: parseInt(amount)}
                }
                return i
            })
        }
    }

}

// Add methods to the cart object prototype to add and remove items




module.exports = Cart;