import { cards } from "./card.list";

export const extractCardsFromString = (description: string) => {
    let selectedCards = [];
    for(let i = 0; i < cards.length; i++) {
        if(description.toLowerCase().includes(cards[i].toLowerCase()) == true) {
            selectedCards.push(cards[i]);
        }
    }
    return selectedCards;
}