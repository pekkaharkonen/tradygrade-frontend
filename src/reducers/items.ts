import { IFetchItemActions } from '../actions';
import { IItem } from "../models/types"
import { ActionTypes } from '../actions/types';

export const itemsReducer = (
  state: IItem[] = [],
  action: IFetchItemActions
) => {
  switch (action.type) {
    case ActionTypes.fetchItems:
      return action.payload;
    default:
      return state;
  }
};