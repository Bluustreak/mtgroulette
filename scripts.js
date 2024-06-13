//import * as helper from "helperfunctions.js";
//import { readCommanderColors, getOneRandomCard } from "./helperFunctions.js";


function buttonClick()
{
    event.preventDefault();

    alert("buttonClick()")
    let deck = [];

    // reads the inputted keywords as a [kw1, kw2, ...]
    let keywords = (document.getElementById("id_keywordsTextField").value).split(" ");

    let UI_commanderColors = helper.readCommanderColors();

    UI_order=ASCENDING;

    // default values for a deck, based on "grave danger"
    let n_cre = 29;
    let n_sor = 12;
    let n_art = 9;
    let n_ins = 5;
    let n_enc = 4;
    let n_pla = 1;


    // adding each card type to the deck
    temp=getCommander(UI_commanderColors, UI_order, keywords);
    deck.push(temp);
    //deck.push(getCards(CREATURE, n_cre, UI_commanderColors, UI_order, keywords))
    //deck.push(getCards(SORCERY, n_sor, keywords))
    //deck.push(getCards(ARTIFACT, n_art, keywords))
    //deck.push(getCards(INSTANT, n_ins, keywords))
    //deck.push(getCards(ENCHANTMENT, n_enc, keywords))
    //deck.push(getCards(PLANESWALKER, n_pla, keywords))

};



async function sendRequest(query)
{
    const response = await fetch(`https://api.scryfall.com/cards/search?${(query)}`);
    alert("trying the query: \n"+`https://api.scryfall.com/cards/search?${(query)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    reply = response.json();
    sleep(0.5);
    return await reply;
}

function parseJSON(JSONdata)
{
    // parses raw JSON into card names
    return json.data.map(card => ({
        name: card.name
    }));
}


function getCommander(UI_commanderColors, UI_order, UIkeywords)
{
    alert("aaa");
        let KWplaceholder="";
        for(let kw of UIkeywords)
        {
            KWplaceholder+=`+lore%3A${kw}`;
        }
        let query = `https://api.scryfall.com/cards/search?as=grid&extras=true&lang=any&order=${UI_order}&q=type%3A${"creature"}+type%3A${"legendary"}+c%3D${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
        alert(query);
        //let JSONdata = sendRequest(query);
        //let cards = parseJSON(JSONdata);
        //card = helper.getOneRandomCard(cards);
        //deck.push(card);
        //alert(card);
}


// helper functions:









function readCommanderColors(){
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