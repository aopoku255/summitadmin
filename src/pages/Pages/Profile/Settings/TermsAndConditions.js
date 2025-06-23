import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Alert,
  Spinner,
} from "reactstrap";
import { useQuill } from "react-quilljs";
import axios from "axios";
import "quill/dist/quill.snow.css";

const TermsAndConditions = () => {
  const { quill, quillRef } = useQuill();
  const [initialContent, setInitialContent] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Load initial content into Quill
  useEffect(() => {
    if (quill) {
      quill.root.innerHTML = initialContent;

      quill.on("text-change", () => {
        setCurrentContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!currentContent || currentContent === "<p><br></p>") {
      setError("Content is required.");
      return;
    }

    // try {
    //   setLoading(true);
    //   // Replace with your actual backend endpoint
    //   await axios.post("/api/terms", { content: currentContent });
    //   setInitialContent(currentContent);
    //   setSuccess("Terms & Conditions saved successfully.");
    // } catch (err) {
    //   setError("Save failed. Please try again.");
    // } finally {
    //   setLoading(false);
    // }

    console.log(currentContent);
  };

  const handleCancel = () => {
    if (quill) {
      quill.root.innerHTML = initialContent;
      setCurrentContent(initialContent);
      setError("");
      setSuccess("");
    }
  };

  return (
    <div className="page-content">
      <Row className="mt-2 d-flex justify-content-center align-items-center">
        <Col lg={8}>
          <Card>
            <CardHeader>
              <h4 className="card-title mb-0">Edit Terms & Conditions</h4>
            </CardHeader>
            <CardBody>
              {error && <Alert color="danger">{error}</Alert>}
              {success && <Alert color="success">{success}</Alert>}

              <div className="snow-editor" style={{ height: "400px" }}>
                <div ref={quillRef} style={{ height: "90%" }} />
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <Button color="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button color="primary" onClick={handleSave} disabled={loading}>
                  {loading ? <Spinner size="sm" /> : "Save"}
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TermsAndConditions;
