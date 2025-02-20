export interface Cocktail {
    _id: string;
    user: string,
    name: string,
    receipt:string,
    image: string,
    isPublished: boolean,
    ingredients: Ingredients[],
}

export type CocktailWithoutId = Omit<Cocktail, '_id', "isPublished">


export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    image: string;
    displayName: string;
    googleID: string;
}

export interface  Ingredients {
    title: string;
    quantity: number;
}