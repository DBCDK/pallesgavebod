'use strict';

import Reflux from 'reflux';
import SocketClient from 'dbc-node-serviceprovider-socketclient';
let socket = SocketClient('getOpenAgency');

const LibraryActions = Reflux.createActions({
  libraryIdUpdated: {children: ['response']},
  clear: {}
});

LibraryActions.libraryIdUpdated.listen((val) => {
  socket.request(val);
});

socket.response(LibraryActions.libraryIdUpdated.response);

export default LibraryActions;
