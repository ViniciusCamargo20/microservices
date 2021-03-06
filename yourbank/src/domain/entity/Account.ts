
import  { v4 as uuidv4 } from 'uuid';
import Cpf from './Cpf';
import Transaction from './Transaction';

export default class Account {
	id: string;
    cpf: string;
	name: string;
    email: string;
    zipcode?: string;
    city?: string;
    street?: string;
    complement?: string;
    district?: string;
    state?: string;
	private statement: Transaction[];

	constructor (cpf: string, name: string, email: string, zipcode?: string, city?: string, street?: string, complement?: string, district?: string, state?: string, id?: string) {
        this.id = id ?? uuidv4();
		this.cpf = new Cpf(cpf).getValue();
        this.name = name;
        this.email = email;
        this.zipcode = zipcode;
        this.city = city;
        this.street = street;
        this.complement = complement;
        this.district = district;
        this.state = state;
        this.statement = [];
	}

    deposit (transaction: Transaction) {
        this.statement.push(new Transaction(transaction.type, transaction.amount, transaction.description));
    }

    withdraw (transaction: Transaction) {
        this.statement.push(new Transaction(transaction.type, transaction.amount, transaction.description));
    }

    getBalance () {
        const balance = this.statement.reduce((acc: number, operation: { type: string, amount: number }) => {
            if (operation.type === 'deposit') {
                return acc + operation.amount;
            } else {
                return acc - operation.amount;
            }
        }, 0)
        return balance;
    }
}
