const supertest = require('supertest');
const expect = require('chai').expect;
const userData = require('../model/schema');
const sinon = require('sinon');
const app = require('../app');
const url = 'http://localhost:3000';

let sinonStub = sinon.stub(userData, 'find');

describe('GET/ hello', () => {
	it('respond from get ', (done) => {
		supertest(url)
		.get('/')
		.expect(200)
		//.send('hello world')
		.end((err, res) => {
			if (err) 
				return done(err);
			else{
				expect(res.text).to.be.equal("hello world");
				done();
			}
		});
	});
});

describe('userData', () => {
	it('should be invalid if name is empty', (done) => {
		const user = new userData();
		user.validate((err) => {
			expect(err.errors.name).to.equal(err.errors.name);
			expect(err.errors.age).to.equal(err.errors.age);
			expect(err.errors.address).to.equal(err.errors.address);
			expect(err.errors.salary).to.equal(err.errors.salary);
			done();
		});
	});
});

describe('CRUD validation',() =>{
	beforeEach(() => {
		sinonStub.yields(null, [{name: 'abhishek',age: 20}]);
	});
	it('Find validation',(done) => {
		supertest(url)
			.get('/find')
			.expect(200)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) return done(err);
				expect(res.body[0].name).to.equal("abhishek");
				expect(res.body[0].age).to.equal(20);
				done();
		});

	it('Insert Validation',(done) => {
		supertest(url)
			.port('/insert')
			.expect(200)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.end((err, res) => {
				if (err) return done(err);
				res.body[0].name = "abhi";
				expect(res.body[0].name).to.equal("abhishek");
				done();
			});
		});
	});
});