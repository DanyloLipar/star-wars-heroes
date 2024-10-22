import React from "react";
import ReactFlow, { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import IFilm from "../../core/models/film";
import IHero from "../../core/models/hero";
import IStarShip from "../../core/models/starship";

interface Props {
  hero: IHero;
  films: IFilm[];
  starships: IStarShip[];
}

const GraphVisualization: React.FC<Props> = ({ hero, films, starships }) => {
  const nodeSpacing = 150;
  const nodes: Node<any>[] = [
    {
      id: hero.id?.toString(),
      data: { label: hero.name },
      position: { x: 100, y: 50 },
    },
    ...films.map((film, index) => ({
      id: film.id?.toString(),
      data: { label: film.title },
      position: { x: nodeSpacing * (index + 1), y: 150 },
    })),
    ...starships.map((starship, index) => ({
      id: `starship-${starship.id}`,
      data: { label: starship.name },
      position: { x: nodeSpacing * (index + 1), y: 300 },
    })),
  ];

  const edges: Edge<any>[] = [
    ...films.map((film, index) => ({
      id: `edge${index + 1}`,
      source: hero.id?.toString(),
      target: film.id?.toString(),
    })),
    ...starships.map((starship, index) => ({
      id: `film-to-starship-${index + 1}`,
      source: films[index % films.length].id?.toString(),
      target: `starship-${starship.id}`,
    })),
  ];

  return <ReactFlow nodes={nodes} edges={edges} />;
};

export default GraphVisualization;
