'use babel';

import YusifyView from './yusify-view';
import { CompositeDisposable } from 'atom';

export default {

  yusifyView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.yusifyView = new YusifyView(state.yusifyViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.yusifyView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'yusify:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.yusifyView.destroy();
  },

  serialize() {
    return {
      yusifyViewState: this.yusifyView.serialize()
    };
  },

  toggle() {
    console.log('Yusify was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
