'use strict';

import React from 'react';
import NewsItem from './NewsItem.component.js';

export default class NewsFrontPageContainerComponent extends React.Component {
  render() {
    const data = [{
      title: 'dette er en title',
      body: 'dette er en body',
      id: 1
    }, {
      title: 'dette er en title 2',
      body: 'dette er en body 2',
      id: 2
    }
    ];

    return (
      <div className='news' >
        <div className='news-items' >
          <div className='news-items-headline' >
            <span>Nyt fra biblioteket</span>
          </div>
          {
            data.map((element, i) => {
              const zebra = (i % 2 === 0) && 'even' || 'odd';
              const link = `/news/${element.id}`;
              return (
                <NewsItem key={element.id} {...element} link={link} zebra={zebra} />
              );
            })
          }
        </div>
        <div className='news-items-link-container' >
          <a className='link' href='#' >Se alle nyheder...</a>
        </div>


        <div className='news-items' >
          <div className='news-items-headline' >
            <span>Det sker</span>
          </div>
          <div className='news-item odd' >
            <span className='headline' >Strikkecafé</span>
            <span className='body' >Er du mellem 6 og 12 år, så kom til en hyggelig og sjov strikkeworkshop, lørdag 24. oktober kl. 10.00-13.00 på Tranbjerg Bibliotek.</span>
            <a className='link' href='#' >Læs mere</a>
          </div>
        </div>

        <div className='news-items-link-container' >
          <a className='link' href='#' >Se alle events...</a>
        </div>
      </div>
    );
  }
}

NewsFrontPageContainerComponent.displayName = 'NewsFrontPageContainerComponent';

