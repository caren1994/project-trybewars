import React from 'react';
import {render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


describe('testando 30 a 60%',()=>{
it('testando texto', () => {
  render(<App />);
  const text=screen.getByText(/Projeto Star Wars - Trybe/i);
  const name=screen.getByText(/Name/i);
  const rotation=screen.getByText(/Rotation Period/i);
  const orbital=screen.getByText(/Orbital Period/i);
  const diameter=screen.getByText('Diameter');
  const climate=screen.getByText(/Climate/i);
  const gravity=screen.getByText(/Gravity/i);
  const terrrain=screen.getByText(/terrain/i);
  const surface=screen.getByText(/Surface Water/i);
  const population=screen.getByText('Population');
  const films=screen.getByText(/Films/i);
  const created=screen.getByText(/Created/i);
  const Edited=screen.getByText(/Edited/i);
  const url=screen.getByText(/URL/i);

  expect(text).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(rotation).toBeInTheDocument();
  expect(orbital).toBeInTheDocument();
  expect(diameter).toBeInTheDocument();
  expect(climate).toBeInTheDocument();
  expect(gravity).toBeInTheDocument();
  expect(terrrain).toBeInTheDocument();
  expect(surface).toBeInTheDocument();
  expect(population).toBeInTheDocument();
  expect(films).toBeInTheDocument();
  expect(created).toBeInTheDocument();
  expect(Edited).toBeInTheDocument();
  expect(url).toBeInTheDocument();


});
it('testando data-testid',()=>{
  render(<App />);
  const name = screen.getByTestId('name-filter');
  const column=screen.getByTestId("column-filter");
  const comparison=screen.getByTestId("comparison-filter");
  const value=screen.getByTestId("value-filter");
  const button=screen.getByRole('button');

  expect(column).toBeInTheDocument();
  expect(comparison).toBeInTheDocument();
  expect(value).toBeInTheDocument();

  userEvent.selectOptions(column, 'surface_water');
  userEvent.selectOptions(comparison, 'igual a');
  userEvent.type(value, '100');
  userEvent.click(button);

  userEvent.selectOptions(column, 'population');
  userEvent.selectOptions(comparison, 'maior que');
  userEvent.type(value, '200000');
  userEvent.click(button);

  userEvent.selectOptions(column, 'orbital_period');
  userEvent.selectOptions(comparison, 'maior que');
  userEvent.type(value, '364');
  userEvent.click(button);


});


});
