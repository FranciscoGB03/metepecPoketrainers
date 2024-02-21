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
      <div className="ranreg-body">
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
      </div>
    </Template>
  );
}

export default RankingRegional;
