export default (deck) => {

    const shuffledDeck = [...deck];

    for (let i= 51; i>=getRandomInt(5, 20); i--){
        const randomNum = getRandomInt(0, 51);
        const card = deck[i];
        shuffledDeck[i] = shuffledDeck[randomNum]
        shuffledDeck[randomNum] = card; 
    }

    return shuffledDeck

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}