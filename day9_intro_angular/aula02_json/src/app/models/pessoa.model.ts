import { Endereco } from "./endereco.model";
import { PhoneNumber } from "./phoneNumber.model";

export interface Pessoa {
    first_name: string;
    last_name: string;
    is_alive: boolean;
    age: number;
    address: Endereco;
    phone_numbers: PhoneNumber[];
    children: string[];
    spouse: any;
}