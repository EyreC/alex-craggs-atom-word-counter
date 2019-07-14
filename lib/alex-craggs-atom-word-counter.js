'use babel';

import AlexCraggsAtomWordCounterView from './alex-craggs-atom-word-counter-view';
import { CompositeDisposable } from 'atom';

export default {

  alexCraggsAtomWordCounterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.alexCraggsAtomWordCounterView = new AlexCraggsAtomWordCounterView(state.alexCraggsAtomWordCounterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.alexCraggsAtomWordCounterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'alex-craggs-atom-word-counter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.alexCraggsAtomWordCounterView.destroy();
  },

  serialize() {
    return {
      alexCraggsAtomWordCounterViewState: this.alexCraggsAtomWordCounterView.serialize()
    };
  },

  toggle() {

    console.log('YourNameWordCount was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );

};
