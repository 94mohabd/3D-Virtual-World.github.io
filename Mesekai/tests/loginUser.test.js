/**
 * @jest-environment jsdom
 */

 import { render, fireEvent, waitFor, screen } from '@testing-library/react';
 import Login from '../pages/login';
 
 Object.defineProperty(window, 'matchMedia', {
     writable: true,
     value: jest.fn().mockImplementation(query => ({
       matches: false,
       media: query,
       onchange: null,
       addListener: jest.fn(), // Deprecated
       removeListener: jest.fn(), // Deprecated
       addEventListener: jest.fn(),
       removeEventListener: jest.fn(),
       dispatchEvent: jest.fn(),
     })),
 });
 
 global.fetch = jest.fn(() => {
     Promise.resolve({
         json: () => Promise.resolve({ msg: "" })
     })
 });
 
 window.alert = jest.fn();
 
 beforeEach(() => {
     fetch.mockClear();
 });
 
 afterEach(() => {
     alert.mockClear();
 });
 
 test('Login a user', async () => {
     const username = "test56";
     const password = "password123";
 
     const { container } = render(<Login />);
     expect(fetch.mock.calls.length).toBe(0);
     fetch.mockImplementation(() => Promise.resolve(()=> {
     }));
 
     await waitFor(() => {
         fireEvent.change(container.querySelector('#username'), { target: { value: username } });
         fireEvent.change(container.querySelector('#password'), { target: { value: password } });
     });
 
     let testValue = screen.getByDisplayValue(username);
     expect(testValue).toBeInTheDocument();
 
     testValue = screen.getByDisplayValue(password);
     expect(testValue).toBeInTheDocument();
 
     await waitFor(() => {
         fireEvent.click(container.querySelector('#submit'));
     });
     expect(fetch.mock.calls.length).toBe(1);
     expect(fetch.mock.calls[0][0]).toBe('/api/login');
     const body = JSON.parse(fetch.mock.calls[0][1].body);
     expect(body.username).toBe(username);
     expect(body.password).toBe(password);
 });