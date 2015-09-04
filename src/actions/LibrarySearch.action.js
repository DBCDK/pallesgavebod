'use strict';

import Reflux from 'reflux';
import SocketClient from '../utils/ServiceProviderSocketClient.js';
let socket = SocketClient('searchOpenAgency');

const LibrarySearchActions = Reflux.createActions({
  libraryQueryUpdated: {children: ['response']},
  clear: {}
});

LibrarySearchActions.libraryQueryUpdated.listen((val) => {
  socket.request(val);
});

socket.response(LibrarySearchActions.libraryQueryUpdated.response);

export default LibrarySearchActions;