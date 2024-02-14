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
        <Card className="ranreg-card">
          <Table className="ranreg-table">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Jugador</TableHeaderCell>
                <TableHeaderCell className="text-right">
                  Equipo
                </TableHeaderCell>
                <TableHeaderCell>Puntos</TableHeaderCell>
                <TableHeaderCell>Equipo Pokemon</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {RANKING_REGIONAL.map(reg=>(
              <TableRow key={reg.id}>
              <TableCell>{reg.nombre}</TableCell>
              <TableCell className="text-right">{reg.equipo}</TableCell>
              <TableCell>{reg.puntos}</TableCell>
              <TableCell>{reg.equipo_pokemon.map(pokemon=>
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
        </Card>
      </div>
    </Template>
  );
}

export default RankingRegional;
