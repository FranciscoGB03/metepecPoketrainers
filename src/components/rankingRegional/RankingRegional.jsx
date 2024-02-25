import { Fragment } from "react";
import Template from "../template/Template";
import { Card } from "@tremor/react";
import "./RankingRegional.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { RANKING_REGIONAL } from "../../data/rankingRegional";

function RankingRegional() {
  return (
    <Template>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                Ranking Regional
              </h2>
            </div>
            <div className="my-2 flex sm:flex-row flex-col">
              <div className="flex flex-row mb-1 sm:mb-0">
                <div className="relative">
                  <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option>5</option>
                    <option>10</option>
                    <option>20</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
                <div className="relative">
                  <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="block relative">
                <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <input
                  placeholder="Search"
                  className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <Table className="min-w-full leading-normal">
                  <TableHead className="bg-light border border-1">
                    <TableRow>
                      <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Jugador
                      </TableHeaderCell>
                      <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Equipo
                      </TableHeaderCell>
                      <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Puntos
                      </TableHeaderCell>
                      <TableHeaderCell className="px-5 py-3 border-b-2 text-black-50 bg-gray-100">
                        Equipo Pokemon
                      </TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {RANKING_REGIONAL.map((reg) => (
                      <TableRow key={reg.id}>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {reg.nombre}
                        </TableCell>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {reg.equipo}
                        </TableCell>
                        <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {reg.puntos}
                        </TableCell>
                        <TableCell className="border-b border-gray-200 bg-white text-sm">{reg.equipo_pokemon.map(pokemon=>
                          <Fragment key={pokemon.id}>
                          <strong>{pokemon.nombre}</strong><br/>
                          <span>ataque basico: {pokemon.ataque_basico}</span><br/>
                          <span>ataques cargados: {pokemon.ataque_cargado1}, {pokemon.ataque_cargado2}</span><br/>
                          </Fragment>
                          )}    
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div class="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                  <span class="text-xs xs:text-sm text-gray-900">
                    Showing 1 to 4 of 50 Entries
                  </span>
                  <div class="inline-flex mt-2 xs:mt-0">
                    <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-l">
                      Prev
                    </button>
                    <button class="text-sm bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-r">
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="ranreg-body">
        <div>
          <h3>Ranking Regional</h3>
        </div>
        
        <div className="m-8 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="inline-block min-w-full">
            <Table className="leading-normal " >
              <TableHead>
                <TableRow>
                  <TableHeaderCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Jugador</TableHeaderCell>
                  <TableHeaderCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Equipo
                  </TableHeaderCell>
                  <TableHeaderCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Puntos</TableHeaderCell>
                  <TableHeaderCell className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider mr-4">Equipo Pokemon</TableHeaderCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {RANKING_REGIONAL.map(reg=>(
                <TableRow key={reg.id}>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reg.nombre}</TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">{reg.equipo}</TableCell>
                <TableCell className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{reg.puntos}</TableCell>
                <TableCell className="border-b border-gray-200 bg-white text-sm">{reg.equipo_pokemon.map(pokemon=>
                <Fragment key={pokemon.id}>
                <strong>{pokemon.nombre}</strong><br/>
                <span>ataque basico: {pokemon.ataque_basico}</span><br/>
                <span>ataques cargados: {pokemon.ataque_cargado1}, {pokemon.ataque_cargado2}</span><br/>
                </Fragment>
                )}</TableCell>
              </TableRow>
              ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div> */}
    </Template>
  );
}

export default RankingRegional;
