import {createSelector} from 'reselect';

const selecteUser = state => state.user;
const selectCart = state => state.cart;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user)=> user.currentUser
)
