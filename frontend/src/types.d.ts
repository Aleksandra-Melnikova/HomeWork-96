export interface RegisterMutation {
  email: string;
  password: string;
  displayName: string;
  image: File | null;
}

export interface LoginMutation {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  email: string;
  displayName: string;
  image: string;
  token: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}

export interface Cocktail {
  _id: string;
 name: string;
  image: string;
  isPublished: boolean;
}

export interface  Ingredients {
  title: string;
  quantity: number;
}

export interface DetailCocktail {
  _id: string;
  user: string,
  name: string,
  receipt:string,
  image: string,
  isPublished: boolean,
  ingredients: Ingredients[],
}

export interface CocktailMutation {
  name: string;
  receipt: string;
  ingredients: string;
  image: File | null;
}

