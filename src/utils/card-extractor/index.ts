import { cards } from "./card.list";

export const extractCardsFromString = (description: string) => {
    let selectedCards = [];
    for(let i = 0; i < cards.length; i++) {
        if(description.toLowerCase().includes(cards[i].dictionary.toLowerCase()) == true) {
            selectedCards.push(cards[i].card);
        }
    }
    if(selectedCards.length == 0) {
        selectedCards = ["Crédito", "Débito"];
    }
    return selectedCards;
}