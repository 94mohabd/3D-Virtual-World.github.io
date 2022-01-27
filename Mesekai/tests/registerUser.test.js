/**
 * @jest-environment jsdom
 */

import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Registration from '../pages/registration';

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

test('register a new user', async () => {
    const username = "test55";
    const email = "test55@email.com";
    const password = "password123";
    const cPassword = "password123";

    const { container } = render(<Registration />);
    expect(fetch.mock.calls.length).toBe(0);
    fetch.mockImplementation(() => Promise.resolve(()=> {
    }));

    await waitFor(() => {
        fireEvent.change(container.querySelector('#username'), { target: { value: username } });
        fireEvent.change(container.querySelector('#email'), { target: { value: email } });
        fireEvent.change(container.querySelector('#password'), { target: { value: password } });
        fireEvent.change(container.querySelector('#cpassword'), { target: { value: cPassword } });
    });

    let testValue = screen.getByDisplayValue(username);
    expect(testValue).toBeInTheDocument();

    testValue = screen.getByDisplayValue(email);
    expect(testValue).toBeInTheDocument();

    testValue = screen.getAllByDisplayValue(password);
    expect(testValue[0]).toBeInTheDocument();
    expect(testValue[1]).toBeInTheDocument();

    await waitFor(() => {
        fireEvent.click(container.querySelector('#submit'));
    });
    expect(fetch.mock.calls.length).toBe(1);
    expect(fetch.mock.calls[0][0]).toBe('/api/register');
    const body = JSON.parse(fetch.mock.calls[0][1].body);
    expect(body.username).toBe(username);
    expect(body.email).toBe(email);
    expect(body.password).toBe(password);
});