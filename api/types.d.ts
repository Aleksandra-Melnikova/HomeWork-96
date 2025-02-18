// export interface Coctail {
//     _id: string;
//     category: number;
//     title: string;
//     price: number;
//     description: string;
//     image: string | null;
//     create_at: string;
// }

// export type ProductWithoutId = Omit<Coctail, 'id', 'create_at'>
//
// export interface  Category {
//     _id: string;
//     title: string;
//     description: string;
// }


export interface UserFields {
    email: string;
    password: string;
    token: string;
    role: string;
    avatar: string;
    displayName: string;
    googleID: string;
}

export interface  Ingredients {
    title: string;
    quantity: number;
}