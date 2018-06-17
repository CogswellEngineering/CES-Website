/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'en';
//This is needed cause the state needs to be reset to initial, everytime mount component
//This can be avoided if I created local state instead, but I've written too much of it to fit in framework flow instead
//that I am not changing it now, though in future apps, I'll know that it's okay to make that choice, if it makes sense.
//And the benefits outweight this slight con.
export const LEFT_PAGE = 'ces/App/LEFT_PAGE';
export const FIELD_CHANGED = 'ces/App/FIELD_CHANGED';

