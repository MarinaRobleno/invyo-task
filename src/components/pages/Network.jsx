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
      title: node.label,
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
      physics: true,
      smooth: {
        enabled: true,
        type: 'dynamic'
      }
    },
    nodes: {
      color: "#EFC9AF",
      shape: "dot",
      size: 16,
      font: { color: "#104C91", face: "Poppins" },
    },
    physics: {
      forceAtlas2Based: {
        gravitationalConstant: -26,
        centralGravity: 0.005,
        springLength: 230,
        springConstant: 0.18,
      },
      maxVelocity: 146,
      solver: "forceAtlas2Based",
      timestep: 0.35,
      stabilization: { iterations: 150 },
    },
    interaction: {
      multiselect: true
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
