'use strict';

import Reflux from 'reflux';

import AutoCompleteActions from '../actions/AutoComplete.action.js';
import QueryUpdate from '../actions/QueryUpdate.action.js';

const AutoCompleteStore = Reflux.createStore({
  listenables: AutoCompleteActions,
  store: {},

  init() {
    this.listenTo(QueryUpdate, this.clearData);
  },

  parseResponse(response, data) {
    const index = response.index;
    if (!data[response.query]) {
      data[response.query] = {};
    }
    data[response.query][index] = {};

    switch (index) {
      case 'term.creator':
        let creators = response.docs;
        if (creators.length >= 1) {
          data[response.query][index] = {
            label: 'Forfatter',
            data: this.addLinks(creators, index),
            weight: 1
          };
        }
        break;
      case 'term.title':
        let titles = response.docs;
        if (titles.length >= 1) {
          data[response.query][index] = {
            label: 'Titel',
            data: this.addLinks(titles, index),
            weight: 0
          };
        }
        break;
      case 'term.subject':
        let subjects = response.docs;
        if (subjects.length >= 1) {
          data[response.query][index] = {
            label: 'Emne',
            data: this.addLinks(subjects, index),
            weight: 2
          };
        }
        break;
      default:
        break;
    }

    return data;
  },

  addLinks(data, index) {
    return data.map((value) => {
      if (value.pid) {
        value.href = '/search?rec.id=' + value.pid;
      }
      else {
        value.href = '/search?' + index + '=' + value.text;
      }
      return value;
    });
  },

  onTextfieldUpdated(value) {
    if (value.length <= 0) {
      this.clearData();
    }
  },

  onTextfieldUpdatedResponse(response) {
    let data = this.store;

    if (response.error) {
      console.error('PopSuggest responded with an error: ', response); // eslint-disable-line
    }
    else if (response.isEmpty) {
      delete data[response.index];
    }
    else {
      data = this.parseResponse(response, data);
    }

    this.store = data;
    this.trigger(this.store);
  },

  clearData() {
    this.store = {};
    this.trigger(this.store);
  },

  getInitialState() {
    return this.store;
  }
});

export default AutoCompleteStore;
