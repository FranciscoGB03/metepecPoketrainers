import React, { Fragment } from "react";
import Template from "../template/Template";
import "./RankingMundial.css";
import { RANKING_MUNDIAL } from "../../data/rankingMundial";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

function RankingMundial() {
  return (
    <Template>
      <div className="ranmun_body">
        <div>
          <h3>Ranking Mundial</h3>
        </div>
        <Card className="ranreg-card">
          <Table className="ranreg-table">
            <TableHead>
              <TableRow>
                <TableHeaderCell>Jugador</TableHeaderCell>
                <TableHeaderCell className="text-right">Equipo</TableHeaderCell>
                <TableHeaderCell>Puntos</TableHeaderCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {RANKING_MUNDIAL.map((reg) => (
                <TableRow key={reg.nombre}>
                  <TableCell>{reg.nombre}</TableCell>
                  <TableCell className="text-right">{reg.equipo}</TableCell>
                  <TableCell>{reg.puntos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </Template>
  );
}

export default RankingMundial;
