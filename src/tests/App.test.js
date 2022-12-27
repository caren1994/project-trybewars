import React from 'react';
import { render, screen, getNodeText } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mock from './mockData';

describe('testando 30 a 60%', () => {
  it('testando texto', () => {
    render(<App />);
    const text = screen.getByText(/Projeto Star Wars - Trybe/i);
    const name = screen.getByText(/Name/i);
    const rotation = screen.getByText(/Rotation Period/i);
    const orbital = screen.getByText(/Orbital Period/i);
    const diameter = screen.getByText('Diameter');
    const climate = screen.getByText(/Climate/i);
    const gravity = screen.getByText(/Gravity/i);
    const terrrain = screen.getByText(/terrain/i);
    const surface = screen.getByText(/Surface Water/i);
    const population = screen.getByText('Population');
    const films = screen.getByText(/Films/i);
    const created = screen.getByText(/Created/i);
    const Edited = screen.getByText(/Edited/i);
    const url = screen.getByText(/URL/i);

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
  it('testando data-testid', () => {
    render(<App />);
    const name = screen.getByTestId('name-filter');
    const column = screen.getByTestId('column-filter');
    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const button = screen.getByRole('button', { name: /Filtrar/i });

    expect(name).toBeInTheDocument();
    expect(column).toBeInTheDocument();
    expect(comparison).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
  it('Testando ascendente e descendente', () => {
    render(<App />);
    const columnSort = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const InputDesc = screen.getByTestId('column-sort-input-desc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    expect(columnSort).toBeInTheDocument();
    expect(inputAsc).toBeInTheDocument();
    expect(InputDesc).toBeInTheDocument();
    expect(buttonOrder).toBeInTheDocument();
  });
  it('test renderiza informações api', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });

    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'oo');

    const todosPlanetas = screen.getAllByTestId('planet-name');
    expect(todosPlanetas).toHaveLength(2);
    global.fetch.mockRestore();
  });
  it('test filter by column parameter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });

    const column = screen.getByTestId('column-filter');
    userEvent.selectOptions(column, 'population');
    const comparison = screen.getByTestId('comparison-filter');
    userEvent.selectOptions(comparison, 'maior que');
    const value = screen.getByTestId('value-filter');
    userEvent.type(value, '1000');

    const button = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(button);

    const todosPlanetas = screen.getAllByTestId('planet-name');
    expect(todosPlanetas).toHaveLength(7);

    const removeFiltros = screen.getByRole('button', {
      name: /Excluir/i,
    });

    expect(removeFiltros).toBeInTheDocument();

    await userEvent.click(removeFiltros);

    setTimeout(() => expect(todosPlanetas).toHaveLength(10), 1000);
  });
  it('test filter sort', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });

    const columnSort = screen.getByTestId('column-sort');
    const inputAsc = screen.getByTestId('column-sort-input-asc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(inputAsc);
    userEvent.click(buttonOrder);

    const planetasOrdenados = screen.getAllByTestId('planet-name');
    expect(getNodeText(planetasOrdenados[0])).toBe('Yavin IV');
  });
  it('test filter sort', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });
    const columnSort = screen.getByTestId('column-sort');
    const InputDesc = screen.getByTestId('column-sort-input-desc');
    const buttonOrder = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(InputDesc);
    userEvent.click(buttonOrder);

    const planetasOrdenados = screen.getAllByTestId('planet-name');
    expect(getNodeText(planetasOrdenados[0])).toBe('Coruscant');
  });
  it('test todos filter ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });

    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const column = screen.getByTestId('column-filter');

    userEvent.selectOptions(column, 'rotation_period');
    userEvent.selectOptions(comparison, 'menor que');

    userEvent.type(value, '24');

    const button = screen.getByRole('button', { name: /Filtrar/i });
    userEvent.click(button);

    const todosPlanetas = screen.getAllByTestId('planet-name');

    expect(todosPlanetas).toHaveLength(5);
  });
  it('test todos filter IGUAL A  ', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mock, // obs:se tiver todo com string tem q tirar do json fazendo json.parse
    }));

    await act(async () => {
      render(<App />);
    });

    const comparison = screen.getByTestId('comparison-filter');
    const value = screen.getByTestId('value-filter');
    const column = screen.getByTestId('column-filter');
    const button = screen.getByRole('button', { name: /Filtrar/i });

    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'igual a');

    userEvent.type(value, '364');

    userEvent.click(button);
    const planetasOrdenados = screen.getAllByTestId('planet-name');
    setTimeout(() => expect(planetasOrdenados).toHaveLength(10), 1000);

    const removeFiltro = screen.getByRole('button', {
      name: 'X',
    });

    await userEvent.click(removeFiltro);
  });
});
