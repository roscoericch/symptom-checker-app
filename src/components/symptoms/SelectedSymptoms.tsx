import React from "react";
import { Card } from "antd";
import { useContext } from "react";
import { DataContext } from "../../contexts/contexts";

const gridStyle: React.CSSProperties = {
  width: "25%",
  textAlign: "center",
};

const SelectedSymptoms = () => {
  const { store, deleteSelectedSymptoms } = useContext(DataContext);
  return (
    <Card title="Card Title">
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid hoverable={false} style={gridStyle}>
        Content
      </Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
      <Card.Grid style={gridStyle}>Content</Card.Grid>
    </Card>
  );
};

export default SelectedSymptoms;
