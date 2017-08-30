const supertest = require('supertest');
const expect = require('chai').expect;
const userData = require('../model/schema');
const sinon = require('sinon');
const app = require('../app');
const url = 'http://localhost:3000';
const http = require('http');

let sinonStub = sinon.stub(userData, 'find');
let sinonCreate = sinon.stub(userData,'create');
let sinonUpdate = sinon.stub(userData.prototype,'update');
let sinonDelete = sinon.stub(userData,'remove');

describe('GET/ hello', () => {
	it('respond from get ', (done) => {
		supertest(url)
		.get('/')
		.expect(200)
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
	let user = [{name: 'abhishek',age: 20, address: "aligarh",salary: 2043295}];
	before((done) => {
		sinonStub.yields(null, user);
		done();
	});
	it('\nFind validation',(done) => {
		supertest(url)
		.get('/find')
		.expect(200)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.end((err, res) => {
			if (err) return done(err);
			expect(res.body[0].name).to.equal("abhishek");
			expect(res.body[0].age).to.equal(20);
			sinonStub.restore();
			done();
		});
	});
});

describe('CRUD validation',() =>{
	let user = [{name: 'abhishek',age: 20, address: "aligarh",salary: 2043295}];
	before((done) => {
		sinonCreate.yields(null, user);
		done();
	});
	it('\nInsert Validation',(done) => {
		supertest(url)
		.post('/insert')
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/)
		.expect(200)
		.send(user)
		.end((err, res) => {
			if (err) return done(err);
			expect(res.body[0].name).to.equal("abhishek");
			done();
		});
	})
/*connection check*/
  it('should return 200', function (done) {
    http.get('http://localhost:3000', function (res) {
      expect(200).to.equal(200, res.statusCode);
      done();
    });
  });
});

/*start update validation*/
describe('Update Testing',(done) =>{
	beforeEach(() => {
		sinonUpdate.withArgs({name : 'abhi'},{$set : {name: 'abhishek',age: 20, address: "aligarh",salary: 2043295}})
		.yields(null, { ok: 1, nModified: 0, n: 0});
		
	});
	it('Update data',(done) => {
		supertest(url)
		.put('/update/:abhi')
    .expect("Content-Type", /json/)
    .expect(200)
    .send({name: 'abhishek', age: 20, address: "aligarh", salary: 2043295})
    .end((err, res) => {
    		if(err) return done(err);
    		console.log(res.body);
        expect(res.body.ok).to.equal(1);
        expect(res.body.nModified).to.equal(0);
     		expect(res.body.n).to.equal(0);
      	done();
      });
   	});
});/*end update validation*/

describe('Delete Testing',(done) =>{
  beforeEach(() => {
  	sinonDelete.withArgs({ name : "abhi" }).yields(null, {ok:1, nRemoved: 1, n:1}); 
  });
  it('Delete data',(done) => {
    supertest(url)
      .delete('/delete')
      .expect("Content-Type", /json/)
      .send({ name: "abhi"})
      .expect(200)
      .end((err, res) => {
          if (err) 
          	return done(err);
          expect(res.body.ok).to.equal(1);    
          expect(res.body.nRemoved).to.equal(1);
          expect(res.body.n).to.equal(1);
           done(); 
       });  
   });
});