


export interface State {
  state: any;
  navigationId: number;
}

export const initialState: State = {
  state: {},
  navigationId: 0
}

export const getNavigationId = (state: State) => state.navigationId;