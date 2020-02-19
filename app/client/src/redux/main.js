import store from "./store";
import { addArticle } from "./actions/actions";

window.store = store;
window.addArticle = addArticle;

// Every time the state changes, log it
const unsubscribe = store.subscribe(() => console.log(store.getState()));

// Dispatch some action
store.dispatch(addArticle({
    title: "Playing with Redux",
    id: "x"
}));

// Stop listening to state updates
unsubscribe();