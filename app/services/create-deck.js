

class Card {
    constructor(type, weight){
        this.type = type;
        this.weight = weight;
    }
}

export default (() => {

    let cache;
    return () => {
        if(cache) {
            console.log("this is called from cache")
            return cache
        };
        const cardWeights = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const cardTypes = ["spade", "heart", "diamond", "club"];
    
        const cards = new Array()
    
        cardWeights.forEach(
            weight => cardTypes.forEach(
                type => cards.push(new Card(type, weight))
            )
        )
        cache = cards
        return cache
    }
})()
