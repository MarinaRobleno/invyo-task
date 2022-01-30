import React, { useState, useEffect } from "react";
import Graph from "react-graph-vis";
import data from "../../data/data";

export function Network() {
  const network = data.network;

  const graph = {
    nodes: network.nodes.map((node) => ({
      id: node.id,
      label: node.label,
      title: node.title,
    })),
    edges: network.edges.map((edge) => ({
      from: edge.from,
      to: edge.to,
    })),
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#2074d4",
      length: 250,
    },
    nodes: {
      color: "#2074d4",
      shape: "circle",
      font: { color: "#FFFFFF" },
    },
    height: "1000px",
    width: "100%",
  };

  return <Graph graph={graph} options={options} />;
}
