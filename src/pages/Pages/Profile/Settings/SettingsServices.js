import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
} from "reactstrap";
import utility from "../../../../assets/images/utility.svg";
import insurance from "../../../../assets/images/insurance.svg";
import fees from "../../../../assets/images/fees.svg";
import { Link } from "react-router-dom";

const SettingsServices = () => {
  const [providers, setProviders] = useState([
    {
      name: "Utilities",
      status: 1,
      icon: utility,
    },
    {
      name: "Insurance",
      status: 0,
      icon: insurance,
    },
    {
      name: "School Fees",
      status: 0,
      icon: fees,
    },
  ]);

  const handleToggle = (index) => {
    setProviders((prev) =>
      prev.map((provider, i) => ({
        ...provider,
        status: i === index ? (provider.status === 1 ? 0 : 1) : provider.status,
      }))
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleRightCanvas = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="page-content">
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <Row>
            <Col lg={12}>
              <div className="d-flex justify-content-between align-items-center">
                <button onClick={toggleRightCanvas} className="btn btn-primary">
                  Add service
                </button>
              </div>
              <Card>
                <CardBody>
                  <Row className="justify-content-center align-items-center g-3">
                    {providers.map((provider, index) => (
                      <Col lg={8} key={provider.name}>
                        <Card
                          style={{ cursor: "pointer", borderRadius: "10px" }}
                          onClick={() => handleToggle(index)}
                        >
                          <CardBody className="d-flex align-items-center">
                            <div className="avatar-md mx-3">
                              <div
                                className="avatar-title rounded-circle text-danger"
                                style={{ backgroundColor: "#111E6C" }}
                              >
                                <img
                                  src={provider?.icon}
                                  alt=""
                                  className="w-50"
                                />
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center w-50">
                              <div>
                                <h2 className="mb-1">{provider.name}</h2>
                                <p className="mb-0">
                                  Status:{" "}
                                  <span
                                    className={
                                      provider.status === 1
                                        ? "text-success fw-bold"
                                        : "text-secondary"
                                    }
                                  >
                                    {provider.status === 1
                                      ? "Active"
                                      : "Inactive"}
                                  </span>
                                </p>
                              </div>
                            </div>

                            <div
                              className="form-check form-switch form-switch-lg"
                              dir="ltr"
                              onClick={(e) => e.stopPropagation()} // prevent card click when toggling
                            >
                              <Input
                                type="checkbox"
                                className="form-check-input"
                                id={`customSwitch${index}`}
                                checked={provider.status === 1}
                                onChange={() => handleToggle(index)}
                              />
                              <Label
                                className="form-check-label"
                                for={`customSwitch${index}`}
                              ></Label>
                            </div>
                          </CardBody>
                        </Card>
                      </Col>
                    ))}
                    <div className="d-flex justify-content-between align-items-center">
                      <div></div>
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Offcanvas isOpen={isOpen} toggle={toggleRightCanvas} direction="end">
        <OffcanvasHeader
          toggle={toggleRightCanvas}
          id="offcanvasExampleLabel"
          className="border-bottom"
        >
          Add Services
        </OffcanvasHeader>
        <OffcanvasBody>
          <Row className="">
            <Col>
              <div>
                <Label htmlFor="basiInput" className="form-label">
                  Service Name
                </Label>
                <Input
                  type="password"
                  className="form-control"
                  id="basiInput"
                  placeholder="Enter service name"
                />
                <Input
                  type="file"
                  className="form-control my-4"
                  id="basiInput"
                  placeholder="Enter service name"
                  accept="img/.svg"
                />
                <Button color="primary">Submit service</Button>
              </div>
            </Col>
          </Row>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  );
};

export default SettingsServices;
