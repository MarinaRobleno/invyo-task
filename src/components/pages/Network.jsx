import { ThemeProvider } from "@mui/material";
import React from "react";
import Graph from "react-graph-vis";
import data from "../../data/data";
import { colorTheme, fontTheme } from "../helpers/Theme";

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
      color: "#104C91",
      length: 250,
    },
    nodes: {
      color: "#EFC9AF",
      shape: "circle",
      font: { color: "#104C91", face: "Poppins" },
    },
    height: "1000px",
    width: "100%",
  };

  return (
    <ThemeProvider theme={fontTheme, colorTheme}>
      <Graph graph={graph} options={options} />
    </ThemeProvider>
  );
}
