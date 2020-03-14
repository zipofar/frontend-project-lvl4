import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  createChannel: Add,
  editChannel: Rename,
  removeChannel: Remove,
};

export default (modalName) => modals[modalName];
