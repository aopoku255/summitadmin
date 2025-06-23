import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useQuill } from "react-quilljs";
import axios from "axios";
import "quill/dist/quill.snow.css";

const Announcement = () => {
  const [isRight, setIsRight] = useState(false);
  const [loading, setLoading] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { quill, quillRef } = useQuill();
  const [currentContent, setCurrentContent] = useState("");

  const toggleRightCanvas = () => setIsRight(!isRight);

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setCurrentContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      content: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please enter an announcement name"),
      content: Yup.string().required("Please enter an announcement content"),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (!currentContent || currentContent === "<p><br></p>") {
        setError("Content is required.");
        return;
      }

      try {
        setLoading(true);
        setError("");
        setSuccess("");

        // Simulate API request
        const newAnnouncement = {
          name: values.name,
          content: currentContent,
          date: new Date().toLocaleDateString(),
        };

        // Replace this with real API post
        // await axios.post("/api/announcements", newAnnouncement);

        setAnnouncements((prev) => [newAnnouncement, ...prev]);
        resetForm();
        setCurrentContent("");
        quill.root.innerHTML = "";
        toggleRightCanvas();
        setSuccess("Announcement created successfully!");
      } catch (err) {
        setError("Failed to save. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="page-content">
      <h4 className="mb-3">Announcements</h4>

      <Button color="primary" onClick={toggleRightCanvas}>
        Create Announcement
      </Button>

      <Row className="mt-4">
        {announcements.length === 0 ? (
          <p>No announcements yet.</p>
        ) : (
          announcements.map((item, index) => (
            <Col key={index} lg={4} md={6} className="mb-4">
              <Card>
                <CardHeader>
                  <h5>{item.name}</h5>
                  <small className="text-muted">{item.date}</small>
                </CardHeader>
                <CardBody>
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </CardBody>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal isOpen={isRight} toggle={toggleRightCanvas} centered size="lg">
        <ModalHeader toggle={toggleRightCanvas}>
          Create Announcement
        </ModalHeader>
        <ModalBody>
          <form onSubmit={validation.handleSubmit}>
            <div className="mb-3">
              <Label htmlFor="name">Announcement Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter announcement title"
                value={validation.values.name}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={validation.touched.name && !!validation.errors.name}
              />
              {validation.touched.name && validation.errors.name && (
                <FormFeedback>{validation.errors.name}</FormFeedback>
              )}
            </div>

            <div className="mb-3">
              <Label htmlFor="content">Content</Label>
              <Input
                id="content"
                name="content"
                type="textarea"
                rows="6"
                placeholder="Enter announcement content"
                value={validation.values.content}
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                invalid={
                  validation.touched.content && !!validation.errors.content
                }
              />
              {validation.touched.content && validation.errors.content && (
                <FormFeedback>{validation.errors.content}</FormFeedback>
              )}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleRightCanvas}>
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={validation.handleSubmit}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Save"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Announcement;
