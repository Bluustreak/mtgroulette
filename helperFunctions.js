function queryComposer(UI_order, UI_cardtype, UI_commanderColors, UIkeywords)
{
    // if the user has picked any keywords, those will be added, if not, just a empty string litteral
    let KWplaceholder=""
    for(let kw of UIkeywords)
    {
        KWplaceholder+=`+lore%3A${kw}`;
    }
        let query = `https://api.scryfall.com/cards/search?as=grid&extras=true&lang=any&order=${UI_order}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
}

function sleep(milliseconds) {
  const date = Date.now();
  while(Date.now()-date < milliseconds){}
}

export function getOneRandomCard(cards)
{
    let randnum = Math.floor(Math.random()*60);
    return cards[randnum];
}
function getNcards(cards, N)
{
    // does not repeat cards
    let local_cards = [];
    while(local_cards.length() < N)
    {
        card=getOneRandomCard(cards)
        if (local_cards.find(card) == undefined) // if the card is not in the deck, add it
        {
            local_cards.push(card);
        }
    } 
    return local_cards;
}
function getCards(cardType, N, UI_commanderColors, UI_order, UIkeywords)
{
        let query = queryComposer(UI_order, cardType, UI_commanderColors, UIkeywords);
        let JSONdata = sendRequest(query);
        let cards = parseJSON(JSONdata);
        cards = getNcards(cards, N)

        return cards; // returns names, basically
    
    if (commander == true)
    {
        let query = `https://scryfall.com/search?as=grid&extras=true&lang=any&order=${UI_order}}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
    }
}

function containsOnlyCorrectColors(text)
{
    // checks a text field if it only contains WBGUR
    const allowed= ["WBGUR"];
    for(let UI_col of text)
    {
        console.log(UI_col)
        if (allowed.indexOf(UI_col) == -1)
        {
            return false;
        }
    }
    return true;
}

export function readCommanderColors(){
    let checkboxW = document.getElementById("CBW");
    let checkboxB = document.getElementById("CBB");
    let checkboxG = document.getElementById("CBG");
    let checkboxU = document.getElementById("CBU");
    let checkboxR = document.getElementById("CBR");

    let UI_commanderColors = "";
    if (checkboxW.checked)
        UI_commanderColors+="W";
    if (checkboxB.checked)
        UI_commanderColors+="B";
    if (checkboxG.checked)
        UI_commanderColors+="G";
    if (checkboxU.checked)
        UI_commanderColors+="U";
    if (checkboxR.checked)
        UI_commanderColors+="R";

    return UI_commanderColors;
}