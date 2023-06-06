import React from 'react';
import { useState } from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Form, FormGroup, Input, Row } from 'reactstrap';
import { FaTrash, FaPlus } from 'react-icons/fa'
import Notiflix from 'notiflix';

interface RowData {
  id: number;
  value: string;
  isChecked: boolean;
}

const initialRows: RowData[] = [
  { id: 1, value: '', isChecked: false },
];

export const RowInputTable = () => {
  const [rows, setRows] = useState<RowData[]>(initialRows);

  const handleAddRow = () => {
    const newRow: RowData = { id: rows.length + 1, value: '', isChecked: false };
    setRows([...rows, newRow]);
  };

  const handleRemoveRow = (id: number) => {
    if (rows.length === 1) {
      Notiflix.Notify.failure('អ្នកមិនអាចលុបបានទេ!')
      return; // Do nothing if there is only one row
    }

    const updatedRows = rows.filter(row => row.id !== id);
    setRows(updatedRows);
  };

  const handleChangeValue = (id: number, value: string) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, value } : row
    );
    setRows(updatedRows);
  };

  const handleChangeChecked = (id: number, isChecked: boolean) => {
    const updatedRows = rows.map(row =>
      row.id === id ? { ...row, isChecked } : row
    );
    setRows(updatedRows);
  };

  return (
    <>
      <Form>
        {rows.map(row => (
          <Row>
            <Col md={10}>
              <Row>
                <Col md={8}>
                  <FormGroup key={row.id}>
                    <Input
                      type="text"
                      id={`row_${row.id}`}
                      value={row.value}
                      disabled={row.isChecked}
                      onChange={e => handleChangeValue(row.id, e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      checked={row.isChecked}
                      onChange={e => handleChangeChecked(row.id, e.target.checked)}
                    />{' '}
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md={2}>
              <Button color="danger" onClick={() => handleRemoveRow(row.id)}>
                <FaTrash />
              </Button>
            </Col>
          </Row>
        ))}
      </Form>
      <Button color="primary" onClick={handleAddRow}>
        <FaPlus />
      </Button>
    </>
  );
};



function App() {

  return (
    <React.Fragment>
      <RowInputTable />
    </React.Fragment>
  )
}

export default App
