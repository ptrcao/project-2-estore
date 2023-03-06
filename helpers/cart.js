

// Initialize the cart object can parse a previous cart object to initialize the new cart object
function Cart(prevCart = null) {
    this.items =  prevCart?.items || [];
    this.total = prevCart?.total || 0;
    this.numItems = prevCart?.numItems || 0;
  

}
// Add methods to the cart object prototype to add and remove items
Cart.prototype = {
    // Remove item from cart maps through the items array and returns a new array with the item removed
    removeItem: function (id) {
        const foundItem = this.items.find(i => i.id === id);
        if (foundItem) {
            foundItem.amount--;
            this.total -= foundItem.price;
            this.numItems--;
            if (foundItem.amount <= 0) {
                this.items = this.items.filter(i => i.id !== foundItem.id);
            } else {
                this.items = this.items.map(i=>{
                    if (i.id === foundItem.id) {
                        return foundItem;
                    }
                    return i;
                })
            }
        }
    },
    // Add item to cart checks if the item is already in the cart and if so updates the amount, otherwise it adds the item to the cart
    addItem: function (item, amount) {
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
    },
    // Get cart returns the cart object
    getCart: function () {
        return {items: this.items, total: `$${this.total}`, numItems: this.numItems}
    }
};

module.exports = Cart;