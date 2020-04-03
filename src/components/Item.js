import React from 'react';
import itemData from '../JSON/item';

function Item({itemNum}) {
    return (
        <div className="game_item">
        {
            itemNum === 0
            ?
            <div className="none_img"></div>
            :
            <div className="tooltip">
                <img 
                src={getItemImage(itemNum).url}
                alt={getItemImage(itemNum).name}
                />
                <div className="tt-text">
                    <div className="item_name">{getItemImage(itemNum).name}</div>
                    <div className="item_description" 
                     dangerouslySetInnerHTML={ {__html: getItemImage(itemNum).description} }>
                    </div>
                    <div className="item_plaintext">{getItemImage(itemNum).plaintext}</div>
                    <div className="item_gold">가격: {getItemImage(itemNum).gold}</div>
                </div>
            </div>
        }
        </div>
    )
}

function getItemImage(num) {
    let itemInfo = {
        key : num,
        name : "",
        url : "",
        description : "",
        plaintext : "",
        gold : 0
    }
    if(itemInfo.key === 0) {
        itemInfo.url = "none";
        itemInfo.name = "none";
        itemInfo.description = "none";
        itemInfo.plaintext = "none";
    } else {
        itemInfo.url = "http://ddragon.leagueoflegends.com/cdn/10.6.1/img/item/"+itemInfo.key+".png";
        itemInfo.name = itemData.data[itemInfo.key].name;
        itemInfo.description = itemData.data[itemInfo.key].description;
        itemInfo.plaintext = itemData.data[itemInfo.key].plaintext;
        itemInfo.gold = itemData.data[itemInfo.key].gold.total;
    }
    return itemInfo;
}

export default Item;