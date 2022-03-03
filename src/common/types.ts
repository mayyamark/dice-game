export interface IAuthResponse {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  access_token: string;
  expires_in: string;
}

export interface IDiceFace {
  id: string;
  diceId: string;
  color: string;
  value: string;
  winning: string;
}

export interface IAllDiceResults {
  id: string;
  faces: string;
  shape: string;
  diceFaces: IDiceFace[];
}

export type IGetAllDiceResponse = [IAllDiceResults[], number];
