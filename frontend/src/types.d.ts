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

// export interface Category {
//   _id: string;
//   title: string;
// }
//
export interface Cocktail {
  _id: string;
 name: string;
  image: string;
}
//
// export interface DetailCocktail {
//   _id: string;
//   user: {
//     username: string;
//     displayName: string;
//     phoneNumber: string;
//   };
//   category: {
//     title: string;
//   };
//   title: string;
//   description: string;
//   image: string;
//   price: number;
// }
//
// export interface IProductMutation {
//   title: string;
//   description: string;
//   image: File | null;
//   price: number;
//   category: string;
// }
