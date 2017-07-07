import { 
  inject,
  fakeAsync,
  tick,
  TestBed
} from '@angular/core/testing';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {
  Http,
  Connection,
  ConnectionBackend,
  BaseRequestOptions,
  Response,
  ResponseOptions
} from '@angular/http';

import { UsersService } from './users.service';

describe('UsersService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        UsersService,
        { 
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        },
      ]
    });
  });

  it('should be created', inject([UsersService], (service: UsersService) => {
    expect(service).toBeTruthy();
  }));

  describe('test for getUser', ()=>{

    it("should return the user's data with an id",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse;
        let userMock = {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/1');
          connection.mockRespond(new Response(mockResponse));
        });
        //Act
        userService.getUser(1)
        .subscribe(response => {
          dataResponse = response;
        });
        tick();
        expect(dataResponse.id).toBeDefined();
        expect(dataResponse.name).toBeDefined();
        expect(dataResponse.address).toBeDefined();
      }))
    );

    it("should return the user's data with error",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let userMock = {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/1');
          connection.mockError(new Error('error'));
        });
        //Act
        userService.getUser(1)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();
        expect(dataResponse).toBeUndefined();
        expect(dataError).toBeDefined();
      }))
    );

  });

  describe('test for createUser', ()=>{

    it("should return the user's data",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let userMock = {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users');
          connection.mockRespond(new Response(mockResponse));
        });

        //Act
        let newUser = {
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz"
        }
        userService.createUser(newUser)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeUndefined();
        expect(dataResponse.id).toBeDefined();
        expect(dataResponse.name).toEqual('Leanne Graham');
        expect(dataResponse.username).toEqual('Bret');
        expect(dataResponse.email).toEqual('Sincere@april.biz');

      }))
    );

    it("should return an error",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let userMock = {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users');
          connection.mockError(new Error('error'));
        });

        //Act
        let newUser = {
          name: "Leanne Graham",
          username: "Bret",
          email: "Sincere@april.biz"
        }
        userService.createUser(newUser)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeDefined();
        expect(dataResponse).toBeUndefined();

      }))
    );

  });

  describe('test for updateUser', ()=>{

    it("should return the user's data",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let userMock = {
          "id": 12,
          "name": "Nicolas Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/12');
          connection.mockRespond(new Response(mockResponse));
        });

        //Act
        let newUser = {
          id: 12,
          name: "Nicolas Graham",
          username: "Bret",
          email: "Sincere@april.biz"
        }
        userService.updateUser(newUser)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeUndefined();
        expect(dataResponse.id).toBeDefined();
        expect(dataResponse.name).toEqual('Nicolas Graham');
        expect(dataResponse.username).toEqual('Bret');
        expect(dataResponse.email).toEqual('Sincere@april.biz');

      }))
    );

    it("should return an error",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let userMock = {
          "id": 12,
          "name": "Nicolas Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
        }
        let mockResponse = new ResponseOptions({body: JSON.stringify(userMock)});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/12');
          connection.mockError(new Error('error'));
        });

        //Act
        let newUser = {
          id: 12,
          name: "Nicolas Graham",
          username: "Bret",
          email: "Sincere@april.biz"
        }
        userService.updateUser(newUser)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeDefined();
        expect(dataResponse).toBeUndefined();

      }))
    );

  });

  describe('test for deleteUser', ()=>{

    it("should return the user's data",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let mockResponse = new ResponseOptions({body: '{}'});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/12');
          expect(connection.request.headers.get('API-TOKEN')).toEqual('xxxyyy');
          connection.mockRespond(new Response(mockResponse));
        });

        //Act
        userService.deleteUser(12)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeUndefined();
        expect(dataResponse).toEqual({});

      }))
    );

    it("should return an error",
      inject([UsersService, MockBackend], fakeAsync((userService, mockBackend)=>{
        //Arrange
        let dataResponse, dataError;
        let mockResponse = new ResponseOptions({body: '{}'});
        mockBackend.connections.subscribe((connection: MockConnection) => {
          expect(connection.request.url).toBe('http://jsonplaceholder.typicode.com/users/12');
          connection.mockError(new Error('error'));
        });

        //Act
        userService.deleteUser(12)
        .subscribe(
          response => { // success
            dataResponse = response;
          },
          error => { //error
            dataError = error;
          }
        );
        tick();

        //Assert
        expect(dataError).toBeDefined();
        expect(dataResponse).toBeUndefined();

      }))
    );

  });

});
