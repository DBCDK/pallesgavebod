'use strict';
/**
 * @file
 * Currently the main entrypoint served on /work.
 * Provides the work view for the enduser.
 */
import React from 'react';
import workAction from '../../actions/Work.action.js';
import workStore from '../../stores/Work.store.js';
import {CoverImage, OrderLink} from 'dbc-react-components';
import {rewriteCoverImageUrl} from '../../utils/CoverImage.util.js';

const Work = React.createClass({
  displayName: 'Work.component',
  propTypes: {
    id: React.PropTypes.string,
    work: React.PropTypes.object
  },

  getInitialState() {
    return {
      id: this.props.id,
      work: workStore.getStore()
    };
  },

  componentDidMount() {
    this.getWork();
    workStore.listen(this.updateWork);
  },

  getWork() {
    workAction({id: this.state.id});
  },

  updateWork(work) {
    this.setState({work});
  },

  getPublications: function(publications) {
    let types, publishers, links;
    let edition, dates;
    const editions = publications.map((publ, key) => {
      let className = 'work-container--work--editions--publication-details';

      if (publ.hasOwnProperty('types')) {
        types = publ.types.map((t, index) => {
          className += ' ' + t.toLowerCase().replace(/ .*/, '');
          return (<div className='type' key={index} >{t}</div>);
        });
      }
      if (publ.hasOwnProperty('dates')) {
        dates = publ.dates.map((d, index) => {
          return (<div className='date' key={index} >{d}</div>);
        });
      }
      if (publ.hasOwnProperty('editions')) {
        edition = publ.editions.map((ed, index) => {
          return (<div className='edition' key={index} >{ed}</div>);
        });
      }

      const isbns = this.getMetaData(publ, 'isbns', 'isbn', 'ISBN: ', false, false);
      const extents = this.getMetaData(publ, 'extents', 'extent', '', false, false);

      if (publ.hasOwnProperty('links')) {
        links = publ.links.map((l, index) => {
          return (
            <div className='sub-publication link' key={index} >
              <a href={l} target='_blank' >Se online</a>
            </div>);
        });
      }
      return (
        <div className={className} data-identifiers={publ.identifier} key={key} >
          {types}
          {publishers}
          <div className='inline' >
            {edition}
            <span>,&nbsp;</span>
            {dates}
          </div>
          {extents}
          {isbns}
          {links}
        </div>
      );
    });

    return (
      <div className='work-container--work--editions-container' >
        <span className='work-container--work--editions--label clearfix' >Udgaver: </span>
        {editions}
      </div>
    );
  },

  getMetaData(general, property, className = '', prefix = '', wrapInLink = false, clearfix = true) {
    let items = null;
    let result = null;

    if (general.hasOwnProperty(property)) {
      items = general[property].map((item, index) => {
        let content = '';
        const value = item.value || item;

        if (wrapInLink) {
          content = <a href={item.search_link} >{value}</a>;
        }
        else {
          content = value;
        }

        return (
          <div className={className} key={index} >
            {content}
          </div>
        );
      });

      const classes = clearfix ? property + ' clearfix' : property;
      result = <div className={classes} ><span>{prefix}</span>{items}</div>;
    }

    return result;
  },

  getDk5s(general) {
    let dk5s = null;
    let result = null;
    if (general.hasOwnProperty('dk5s')) {
      dk5s = general.dk5s.map((dk5, index) => {
        return (
          <div className='dk5' key={index} >
            <a href={dk5.search_link} >{dk5.text}</a>
          </div>
        );
      });
      result = (
        <div className='dk5s clearfix' >
          <span>Opstilling: </span>{dk5s}
        </div>
      );
    }
    return result;
  },

  getOrderButtons(specific) {
    return specific.map((tw, index) => {
      if (tw.accessType === 'physical') {
        let order_ids = [];
        order_ids.push(tw.identifiers);
        return (
          <OrderLink agencyId={'710100'} linkText={'Bestil ' + tw.type} orderUrl={tw.order} pids={order_ids} coverImagePids={specific[0].identifiers} />);
      }
      if (tw.accessType === 'online') {
        let online_link = 'Se ' + tw.type + ' online';
        return (
          <a className='online-link' href="#" key={index} >{online_link}</a>);
      }
    });
  },

  getSpecifics(specific) {
    let dates;
    const specifics = specific.map((tw, index) => {
      let identifiers = [];
      identifiers.push(tw.identifiers);
      if (tw.dates[0] !== null) {
        dates = tw.dates.map((date, indx) => {
          return (<div className='date' key={indx} >{date}</div>);
        });
      }
      return (
        <div className='specific' data-identifiers={identifiers} key={index} >
          <div className='type' >
            {tw.type}
          </div>
          {dates}
        </div>
      );
    });
    return (
      <div className='specifics clearfix' >{specifics}</div>
    );
  },

  getSeries(general) {
    let series = '';
    if (general.hasOwnProperty('series')) {
      series = (
        <div className='series' >
          <a href={general.series.search_link} >{general.series.value}</a>
        </div>
      );
    }
    return series;
  },

  getTitle(title) {
    return <div className='title' >{title}</div>;
  },

  getDescription(general) {
    return general.hasOwnProperty('series') ?
      <div className='description clearfix' >{general.description}.</div> : '';
  },

  render() {
    const {id, work} = this.state;

    if (work.info.hits === '0') {
      return (<div className="work-not-found" >Værket blev ikke fundet</div>);
    }

    if (work.result.length === 0) {
      return (<div />);
    }

    const general = work.result.general;
    const title = this.getTitle(general.title);
    const description = this.getDescription(general);
    const audience = general.audience || {};
    const publications = work.result.publications;
    const editions = this.getPublications(publications);

    const orderButtons = this.getOrderButtons(work.result.specific);
    const specifics = this.getSpecifics(work.result.specific);

    const parts = this.getMetaData(work.result.general, 'partOf', 'part', 'I: ');
    const subjects = this.getMetaData(work.result.general, 'subjects', 'subject', 'Emner: ', true);
    const creators = this.getMetaData(work.result.general, 'creators', 'creator', '', true);
    const actors = this.getMetaData(work.result.general, 'actors', 'actor', 'Medvirkende: ', true);
    const tracks = this.getMetaData(work.result.general, 'tracks', 'track', 'Trackliste: ');
    const languages = this.getMetaData(work.result.general, 'languages', 'language', 'Sprog: ');
    const issns = this.getMetaData(work.result.general, 'issn', 'issn', 'ISBN: ');
    const extents = this.getMetaData(work.result.general, 'extent', 'extent');

    const dk5s = this.getDk5s(general);
    const series = this.getSeries(general);

    return (
      <div className='work-container' data-pid={id} >
        <div className='work small-12 medium-6 large-4' >
          <CoverImage pids={work.result.specific[0].identifiers} prefSize={'detail_500'} rewriteImgUrl={rewriteCoverImageUrl} />
        </div>
        <div className='work small-12 medium-6 large-4' >
          <div className='work-conatiner--order-buttons clearfix' >
            {orderButtons}
          </div>
          <div className='general' >
            {title}
            {creators}
            {description}
            {parts}
            {issns}
            {extents}
            {actors}
            {series}
            {subjects}
            {dk5s}
            <div className='audience clearfix' >
              <div className='age' >{audience.age}</div>
              <div className='pegi' >{audience.pegi}</div>
              <div className='medieraad' >{audience.medieraad}</div>
            </div>
            {tracks}
            {languages}
          </div>
          {specifics}
          {editions}
        </div>
      </div>
    );
  }
});

export default Work;
