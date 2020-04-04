import React from 'react';
import '../CSS/Navigation.css'

function Navigation({getData ,getName, enterPress}) {
    return (
        <header>
          <div className="header_bar">
            <div className="main_title">
              <span className="title1">LOL</span>
              <span className="title2">SEARCH</span>
            </div>
            <div className="menu_bar">
              <div className="menu">
                <span>순위</span>
                <span>통계</span>
              </div>
              <div className="search_bar">
                <input type="text" onChange={getName} onKeyPress={enterPress} placeholder="소환사명.."/>
                <button type="summit" onClick={getData}>
                  <i class="fas fa-search fa-2x"></i>
                </button>            
              </div>
            </div>
          </div>
        </header>
    );
}

export default Navigation;