/**
 * @jest-environment jsdom
 */

import React from 'react';
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
})

beforeEach(() => {
    fetch.mockClear();
});

test('enter a new user', async () => {
    // expect(global.fetch).toHaveBeenCalledWith("/api/register");
    const username = "test55";
    const email = "test55@email.com";
    const password = "password123";
    const cPassword = "password123";

    const { container } = render(<Registration />);

    expect(screen.queryByText(username)).toBeNull();
    await waitFor(() => {
        fireEvent.change(container.querySelector('#username'), { target: { value: username } });
    });
    let testValue = screen.getByDisplayValue(username);
    expect(testValue).toBeInTheDocument();

    expect(screen.queryByText(email)).toBeNull();
    await waitFor(() => {
        fireEvent.change(container.querySelector('#email'), { target: { value: email } });
    });
    testValue = screen.getByDisplayValue(email);
    expect(testValue).toBeInTheDocument();

    expect(screen.queryByText(password)).toBeNull();
    await waitFor(() => {
        fireEvent.change(container.querySelector('#password'), { target: { value: password } });
    });
    testValue = screen.getAllByDisplayValue(password);
    expect(testValue[0]).toBeInTheDocument();

    expect(screen.queryByText(cPassword)).toBeNull();
    await waitFor(() => {
        fireEvent.change(container.querySelector('#cpassword'), { target: { value: cPassword } });
    });
    testValue = screen.getAllByDisplayValue(cPassword);
    expect(testValue[1]).toBeInTheDocument();
});