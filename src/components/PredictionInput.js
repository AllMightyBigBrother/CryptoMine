import React, { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  getCryptoCoinById,
  getCryptoCoinPrediction,
} from "../actions/coinActions";


function MyVerticallyCenteredModal(props) {
  // const [predShow, setPredShow] = useState(false);
  const [date, setDate] = useState("");
  const [openPrice, setOpenPrice] = useState();
  const [closePrice, setClosePrice] = useState();
  const [volume, setVolume] = useState();

  const dispatch = useDispatch();

  const history = useHistory();

  const cryptoCoins = useSelector((state) => state.cryptoCoins);
  const { crypto_coin } = cryptoCoins;

  const OnClose = (e) => {
    e.preventDefault();
    dispatch(
      getCryptoCoinPrediction(
        crypto_coin["csv_file"],
        date,
        openPrice,
        closePrice,
        volume
      )
    );

    setOpenPrice("");
    setClosePrice("");
    setVolume("");

    document.querySelector(".btn-close").click();
    history.push({ pathname: "/prediction", state: { date, openPrice, closePrice, volume } });
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Alert variant="dark">
          <Modal.Header
            closeButton
            style={{ padding: "0", borderRadius: "360px" }}
            id="pred1"
          >
            <Modal.Title
              id="contained-modal-title-vcenter"
              style={{ width: "100%", textAlign: "center" }}
            >
              <h4 style={{ fontSize: "2.3rem" }}>Prediction</h4>
            </Modal.Title>
          </Modal.Header>
        </Alert>
        <Modal.Body>
          <Form onSubmit={OnClose}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder=""
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Open Price</Form.Label>
              <Form.Control
                type="number"
                step="any"
                pattern="([0-9][\,?])+([\.,][0-9]+)?"
                placeholder=""
                value={openPrice}
                onChange={(e) => setOpenPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Close Price</Form.Label>
              <Form.Control
                type="number"
                step="any"
                pattern="([0-9][\,?])+([\.,][0-9]+)?"
                placeholder=""
                value={closePrice}
                onChange={(e) => setClosePrice(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicnumber">
              <Form.Label>Volume</Form.Label>
              <Form.Control
                type="number"
                step="any"
                pattern="([0-9][\,?])+([\.,][0-9]+)?"
                placeholder=""
                value={volume}
                onChange={(e) => setVolume(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="T&C*" required />
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

const PredictionInput = ({ coin_id }) => {
  const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();

  const getCoinId = (coin_id) => {
    setModalShow(true);
    dispatch(getCryptoCoinById(coin_id));
  };

  return (
    <>
      <Button variant="primary" onClick={() => getCoinId(coin_id)}>
        Predict
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        className="submit"
        onHide={() => setModalShow(false)}
        dispatch={dispatch}
      />
    </>
  );
};

export default PredictionInput;
