import { describe, it, expect, vi } from 'vitest'
import { apiService } from '@/services/api.service'

function mockFetchSuccess() {
  global.fetch = vi.fn(
    () =>
      Promise.resolve({
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Headers(),
        json: () =>
          Promise.resolve({
            nextPage: true,
            succes: true,
            results: [
              {
                name: 'bulbasaur',
                url: 'https://pokeapi.co/api/v2/pokemon/1/',
              },
              { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
            ],
            next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
          }),
      } as Response), // Ensuring this matches the Response type
  )
}

function mockFetchFailure(status = 404) {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: false,
      status,
    } as Response),
  )
}

describe('apiService', () => {
  it('testing pokemons response', async () => {
    mockFetchSuccess()
    const data = await apiService.fetchPokemons(0)

    expect(data.results.length).toEqual(2)
  })

  it('testing nextPage response', async () => {
    mockFetchSuccess()
    const data = await apiService.fetchPokemons(0)

    expect(data.nextPage).toEqual(true)
  })

  it('testing PokemonBase interface', async () => {
    mockFetchSuccess()
    const data = await apiService.fetchPokemons(0)

    expect(data.results[1]).toEqual({
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    })
  })

  it('testing failed response', async () => {
    mockFetchFailure()

    await expect(apiService.fetchPokemons(0)).rejects.toThrow(
      'Response status: 404',
    )
  })
})
