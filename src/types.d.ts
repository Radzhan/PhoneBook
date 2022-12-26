export interface ContactResponse {
    id: string;
    name: string;
    phone: string;
    email: string;
    image: string;
}

export type ApiContactResponse = Omit<Contact, 'id'>;