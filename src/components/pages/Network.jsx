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
      color: "#357BDE",
    },
    nodes: {
      color: "#8ED5F5",
      shape: 'circle',
    },
    height: "1000px",
    width: '100%'
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Graph graph={graph} options={options} />
    </div>
  );
}
