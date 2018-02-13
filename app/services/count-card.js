export default (cards) => {

    const aces = cards.filter(card => card.weight === "A");
    const pictured = cards.filter(card => ["J", "K", "Q"].indexOf(card.weight) !== -1);
    const numbered = cards.filter(card => ["A", "J", "K", "Q"].indexOf(card.weight) === -1)
    
    let score = 0;

    if(numbered.length > 0){
        score += numbered.reduce((a,b) => a + parseInt(b.weight), 0)
    }

    if( pictured.length > 0 ){
        score += (pictured.length*10)
    }

    if(aces.length > 0){
        const possibleValues = aces.reduce((a, b) => {
            let scores = []
            if(a.length === 0){
                scores = [1, 11]
            } else {
                scores = a.map((v,i) => {
                    return [v+1, v+11]
                })
                .reduce((a,b) => [...a, ...b], [])
                .filter((v, i, self) => i === self.indexOf(v) && v <= 21)
            }

            return scores
        }, [])
        .sort((a,b) => b-a)

        for (let i=0; i<possibleValues.length; i++){
            if(score+possibleValues[i] <= 21){
                score+=possibleValues[i];
                break;
            }

            if(i === possibleValues.length-1){
                score+=possibleValues[i];
                break;
            }
        }
    }

    return score;
}