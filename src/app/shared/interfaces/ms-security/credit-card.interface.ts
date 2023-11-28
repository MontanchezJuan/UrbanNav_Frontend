export interface CreditCard {
  _id: string;
  name: string;
  type: string;
  cardNumber: string;
  cardCVV: string;
  expiryDate: string;
  balance: number;
  status: number;
}
export interface DataCreditCard {
  name: string;
  type: string;
  cardNumber: string;
  cardCVV: string;
  expiryDate: string;
  balance: number;
  status: number;
}

export interface CreditCardResponse {
  message: string;
  data: CreditCard[];
}

export interface CreditCardResponseOne {
  message: string;
  data: CreditCard;
}
