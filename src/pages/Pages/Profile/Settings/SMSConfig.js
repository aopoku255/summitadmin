import React, { useState } from "react";
import { Card, CardBody, Col, Input, Label, Row } from "reactstrap";

const SMSConfig = () => {
  const [providers, setProviders] = useState([
    {
      name: "MTN Ghana",
      status: 1,
    },
    {
      name: "Hubtel",
      status: 0,
    },
    {
      name: "Nsano",
      status: 0,
    },
  ]);

  const handleToggle = (index) => {
    setProviders((prev) =>
      prev.map((provider, i) => ({
        ...provider,
        status: i === index ? 1 : 0, // Only one active at a time
      }))
    );
  };

  return (
    <div className="page-content">
      <Row className="justify-content-center align-items-center">
        <Col lg={6}>
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <h1 className="text-center fs-1">
                    SMS Provider Configuration
                  </h1>
                  <hr className="my-2 text-secondary" />
                  <Row className="justify-content-center align-items-center g-3">
                    {providers.map((provider, index) => (
                      <Col lg={8} key={provider.name}>
                        <Card
                          className={`p-3 ${
                            provider.status === 1
                              ? "border-primary bg-light border-2"
                              : ""
                          }`}
                          style={{ cursor: "pointer", borderRadius: "10px" }}
                          onClick={() => handleToggle(index)}
                        >
                          <CardBody className="d-flex justify-content-between align-items-center">
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
    </div>
  );
};

export default SMSConfig;
