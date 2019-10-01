export class UserModel {
	id: number;
	name: string;
	username: string;
	email: string;
	status: number; // 0 = Active | 1 = Suspended | Pending = 2
	phone: string;
	website: string;
	company: any;
    address: any;
	clear() {
		this.name = '';
		this.username = '';
		this.email = '';
		this.status = 1;
		this.phone = '';
		this.website = '';
        this.company = {};
        this.address = {};
	}
}
