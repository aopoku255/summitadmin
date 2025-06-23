import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";
import {
  getTicketsList,
  getSessions,
  addNewTicket,
  addSession,
  updateTicket,
  deleteTicket,
} from "../../../slices/thunks";

import {
  TicketsId,
  Title,
  Client,
  AssignedTo,
  CreateDate,
  DueDate,
  Status,
  Priority,
} from "./TicketCol";
//Import Flatepicker
import Flatpickr from "react-flatpickr";

import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

import DeleteModal from "../../../Components/Common/DeleteModal";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import Cleave from "cleave.js/react";
import SimpleBar from "simplebar-react";

const TicketsData = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Tickets;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    ticketsList: state?.sessions,
    isTicketSuccess: state?.isTicketSuccess,
  }));
  // Inside your component
  const { ticketsList, isTicketSuccess } = useSelector(selectLayoutProperties);

  const [isEdit, setIsEdit] = useState(false);
  const [ticket, setTicket] = useState([]);

  // Delete Tickets
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTicket(null);
    } else {
      setModal(true);
      setcreDate(dateFormat());
      setdueDate(dateFormat());
    }
  }, [modal]);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (ticket && ticket.id) || "",
      title: (ticket && ticket.title) || "",
      client: (ticket && ticket.client) || "",
      assigned: (ticket && ticket.assigned) || "",
      speakers: (ticket && ticket.speakers) || [],

      due: (ticket && ticket.due) || "",
    },
    validationSchema: Yup.object({
      //   title: Yup.string().required("Please Enter Title"),
      //   client: Yup.string().required("Please Enter Client Name"),
      //   assigned: Yup.string().required("Please Enter Assigned Name"),
      // create: Yup.string().required("Please Enter Create Date"),
      // due: Yup.string().required("Please Enter Your Due Date"),
      //   status: Yup.string().required("Please Enter Your Joining status"),
      //   priority: Yup.string().required("Please Enter Your Priority"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateTickets = {
          _id: ticket ? ticket._id : 0,
          id: values.id,
          title: values.title,
          client: values.client,
          assigned: values.assigned,
          create: credate,
          due: duedate,
          status: values.status,
          priority: values.priority,
        };
        // update ticket
        // dispatch(updateTicket(updateTickets));
        validation.resetForm();
      } else {
        const newTicket = {
          //   _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),

          name: values["title"],
          starttime: values["client"],
          endtime: values["assigned"],
          date: duedate,
          speakers: values.speakers,
          //   status: values["status"],
          //   priority: values["priority"],
        };

        console.log(newTicket);
        // save new ticket
        dispatch(addSession(newTicket));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const onClickDelete = (ticket) => {
    setTicket(ticket);
    setDeleteModal(true);
  };

  const handleDeleteTicket = () => {
    if (ticket) {
      dispatch(deleteTicket(ticket._id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleTicketsClick = useCallback(
    (arg) => {
      const ticket = arg;

      setTicket({
        _id: ticket._id,
        id: ticket.id,
        title: ticket.title,
        client: ticket.client,
        assigned: ticket.assigned,
        create: ticket.create,
        due: ticket.due,
        status: ticket.status,
        priority: ticket.priority,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Get Data

  useEffect(() => {
    dispatch(getSessions());
  }, [dispatch]);

  useEffect(() => {
    setTicket(ticketsList);
  }, [ticketsList]);

  useEffect(() => {
    if (!isEmpty(ticketsList)) {
      setTicket(ticketsList);
      setIsEdit(false);
    }
  }, [ticketsList]);

  // Add Data
  const handleTicketsClicks = () => {
    setTicket("");
    setIsEdit(false);
    toggle();
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".ticketCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(deleteTicket(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".ticketCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const columns = useMemo(
    () => [
      //   {
      //     Header: "ID",
      //     accessor: "id",
      //     filterable: false,
      //     Cell: (cellProps) => {
      //       return <TicketsId {...cellProps} />;
      //     },
      //   },
      {
        Header: "Title",
        accessor: "title",
        filterable: false,
        Cell: (cellProps) => {
          return <Title {...cellProps} />;
        },
      },
      {
        Header: "Date",
        accessor: "due",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },
      {
        Header: "Start Time",
        accessor: "client",
        filterable: false,
        Cell: (cellProps) => {
          return <Client {...cellProps} />;
        },
      },
      {
        Header: "End Time",
        accessor: "assigned",
        filterable: false,
        Cell: (cellProps) => {
          return <AssignedTo {...cellProps} />;
        },
      },

      {
        Header: "Actions",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="btn btn-soft-secondary btn-sm">
                <i className="ri-more-fill align-middle"></i>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <li>
                  <DropdownItem href="/apps-tickets-details">
                    <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                    View
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    className="edit-item-btn"
                    href="#showModal"
                    data-bs-toggle="modal"
                    onClick={() => {
                      const TicketData = cellProps.row.original;
                      handleTicketsClick(TicketData);
                    }}
                  >
                    <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                    Edit
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    className="remove-item-btn"
                    data-bs-toggle="modal"
                    href="#deleteOrder"
                    onClick={() => {
                      const ticketData = cellProps.row.original;
                      onClickDelete(ticketData);
                    }}
                  >
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                    Delete
                  </DropdownItem>
                </li>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    [handleTicketsClick, checkedAll]
  );

  const dateFormat = () => {
    let d = new Date(),
      months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
    return (
      d.getDate() +
      " " +
      months[d.getMonth()] +
      ", " +
      d.getFullYear()
    ).toString();
  };

  const [credate, setcreDate] = useState(dateFormat());
  const [duedate, setdueDate] = useState(dateFormat());

  const credateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setcreDate(joinDate);
  };

  const duedateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setdueDate(joinDate);
  };

  const Assigned = [
    { id: 1, imgId: "anna-adame", img: "avatar-1.jpg", name: "Anna Adame" },
    { id: 2, imgId: "frank-hook", img: "avatar-3.jpg", name: "Frank Hook" },
    {
      id: 3,
      imgId: "alexis-clarke",
      img: "avatar-6.jpg",
      name: "Alexis Clarke",
    },
    {
      id: 4,
      imgId: "herbert-stokes",
      img: "avatar-2.jpg",
      name: "Herbert Stokes",
    },
    {
      id: 5,
      imgId: "michael-morris",
      img: "avatar-7.jpg",
      name: "Michael Morris",
    },
    {
      id: 6,
      imgId: "nancy-martino",
      img: "avatar-5.jpg",
      name: "Nancy Martino",
    },
    {
      id: 7,
      imgId: "thomas-taylor",
      img: "avatar-8.jpg",
      name: "Thomas Taylor",
    },
    { id: 8, imgId: "tonya-noble", img: "avatar-10.jpg", name: "Tonya Noble" },
  ];

  const selectteamData = createSelector(
    (state) => state.Team.speakers,
    (speakers) => speakers
  );
  // Inside your component
  const teamData = useSelector(selectteamData);

  return (
    <React.Fragment>
      <Row>
        <DeleteModal
          show={deleteModal}
          onDeleteClick={handleDeleteTicket}
          onCloseClick={() => setDeleteModal(false)}
        />
        <DeleteModal
          show={deleteModalMulti}
          onDeleteClick={() => {
            deleteMultiple();
            setDeleteModalMulti(false);
          }}
          onCloseClick={() => setDeleteModalMulti(false)}
        />
        <Col lg={12}>
          <Card>
            <CardHeader className="border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">Tickets</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger add-btn"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom"></i> Create
                      Session
                    </button>{" "}
                    {isMultiDeleteButton && (
                      <button
                        className="btn btn-secondary"
                        onClick={() => setDeleteModalMulti(true)}
                      >
                        <i className="ri-delete-bin-2-line"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardBody className="pt-0">
              <TableContainer
                columns={columns}
                data={ticketsList?.map((item) => ({
                  _id: item?.id,
                  id: item?.id,
                  title: item?.name,
                  client: item?.starttime,
                  assigned: item?.endtime,
                  create: item?.create,
                  due: item?.date,
                  status: item?.status,
                  priority: item?.priority,
                }))}
                isGlobalFilter={true}
                isAddUserList={false}
                customPageSize={8}
                className="custom-header-css"
                divClass="table-responsive table-card mb-3"
                tableClass="align-middle table-nowrap mb-0"
                theadClass=""
                thClass=""
                handleTicketClick={handleTicketsClicks}
                // isTicketsListFilter={true}
                SearchPlaceholder="Search for ticket details or something..."
              />

              <ToastContainer closeButton={false} limit={1} />
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="zoomIn"
      >
        <ModalHeader toggle={toggle} className="p-3 bg-info-subtle">
          {!!isEdit ? "Edit Session" : "Add Session"}
        </ModalHeader>
        <Form className="tablelist-form">
          <ModalBody>
            <Row className="g-3">
              <Col lg={12}></Col>
              <Col lg={12}>
                <div>
                  <Label htmlFor="tasksTitle-field" className="form-label">
                    Title
                  </Label>
                  <Input
                    name="title"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Enter Title"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.title || ""}
                    invalid={
                      validation.touched.title && validation?.errors?.title
                        ? true
                        : false
                    }
                  />
                  {validation.touched.title && validation?.errors?.title ? (
                    <FormFeedback type="invalid">
                      {validation?.errors?.title}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              <Col lg={12}>
                <Label htmlFor="duedate-field" className="form-label">
                  Due Date
                </Label>
                <Flatpickr
                  name="due"
                  id="date-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(e) => duedateformate(e)}
                  value={validation.values.due || ""}
                />
                {validation.touched.due && validation?.errors?.due ? (
                  <FormFeedback type="invalid">
                    {validation?.errors?.due}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col xl={6}>
                <div className="mb-3">
                  <label htmlFor="cleave-time-format" className="form-label">
                    Start Time
                  </label>
                  <Cleave
                    placeholder="hh:mm"
                    options={{
                      time: true,
                      timePattern: ["h", "m"],
                    }}
                    value={validation.values.client}
                    onChange={(e) =>
                      validation.setFieldValue("client", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </Col>
              <Col xl={6}>
                <div className="mb-3">
                  <label htmlFor="cleave-time-format" className="form-label">
                    End Time
                  </label>
                  <Cleave
                    placeholder="hh:mm"
                    options={{
                      time: true,
                      timePattern: ["h", "m"],
                    }}
                    value={validation.values.assigned}
                    onChange={(e) =>
                      validation.setFieldValue("assigned", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <Label className="form-label">Speakers</Label>
                <SimpleBar style={{ maxHeight: "95px" }}>
                  <ul className="list-unstyled vstack gap-2 mb-0">
                    {teamData.map((item, key) => (
                      <li key={key}>
                        <div className="form-check d-flex align-items-center">
                          <Input
                            name="speakers"
                            className="form-check-input me-3"
                            type="checkbox"
                            onChange={(e) => {
                              const value = parseInt(e.target.value);
                              const checked = e.target.checked;
                              const prev = validation.values.speakers || [];

                              const updated = checked
                                ? [...prev, value]
                                : prev.filter((v) => v !== value);

                              validation.setFieldValue("speakers", updated);
                            }}
                            onBlur={validation.handleBlur}
                            value={item.id} // assuming item.id is already a number
                            checked={validation.values.speakers?.includes(
                              item.id
                            )}
                            invalid={
                              validation.touched.speakers &&
                              validation.errors.speakers
                                ? true
                                : false
                            }
                            id={item.id}
                          />

                          <Label
                            className="form-check-label d-flex align-items-center"
                            htmlFor={item?.image}
                          >
                            <span className="flex-shrink-0">
                              <img
                                src={`https://summitapi.cariscabusinessforum.com${item?.image}`}
                                alt=""
                                className="avatar-xxs rounded-circle"
                              />
                            </span>
                            <span className="flex-grow-1 ms-2">
                              {item.fname} {item.lname}
                            </span>
                          </Label>
                          {validation.touched.speakers &&
                          validation.errors.speakers ? (
                            <FormFeedback type="invalid">
                              {validation.errors.speakers}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </SimpleBar>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <button
                onClick={() => {
                  setModal(false);
                }}
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-success"
                id="add-btn"
                onClick={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                {!!isEdit ? "Update" : "Add Ticket"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default TicketsData;
