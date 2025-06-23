import React, { useState, useEffect, useMemo, useCallback } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import DeleteModal from "../../../Components/Common/DeleteModal";

// Import Scroll Bar - SimpleBar
import SimpleBar from "simplebar-react";

//Import Flatepicker
import Flatpickr from "react-flatpickr";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Modal,
  ModalBody,
  Row,
  Label,
  Input,
  Button,
  ModalHeader,
  FormFeedback,
  Form,
} from "reactstrap";

import {
  getTaskList,
  getPrallelSession,
  addNewTask,
  addParallelSession,
  updateTask,
  deleteTask,
} from "../../../slices/thunks";

import {
  OrdersId,
  Project,
  CreateBy,
  DueDate,
  Status,
  Priority,
} from "./TaskListCol";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";
import { createSelector } from "reselect";
import Cleave from "cleave.js/react";
const Assigned = [
  { id: 1, imgId: "anna-adame", img: "avatar-1.jpg", name: "Anna Adame" },
  { id: 2, imgId: "frank-hook", img: "avatar-3.jpg", name: "Frank Hook" },
  { id: 3, imgId: "alexis-clarke", img: "avatar-6.jpg", name: "Alexis Clarke" },
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
  { id: 6, imgId: "nancy-martino", img: "avatar-5.jpg", name: "Nancy Martino" },
  { id: 7, imgId: "thomas-taylor", img: "avatar-8.jpg", name: "Thomas Taylor" },
  { id: 8, imgId: "tonya-noble", img: "avatar-10.jpg", name: "Tonya Noble" },
];

const AllTasks = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Tasks;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    taskList: state.sessionList,
    isTaskSuccess: state.isTaskSuccess,
    error: state.error,
  }));
  // Inside your component
  const { taskList, isTaskSuccess, error } = useSelector(
    selectLayoutProperties
  );

  const selectSessiontate = (state) => state.Tickets;
  const selectSessionProperties = createSelector(
    selectSessiontate,
    (state) => ({
      ticketsList: state?.sessions,
      isTicketSuccess: state?.isTicketSuccess,
    })
  );
  // Inside your component
  const { ticketsList, isTicketSuccess } = useSelector(selectSessionProperties);

  const selectteamData = createSelector(
    (state) => state.Team.speakers,
    (speakers) => speakers
  );
  // Inside your component
  const teamData = useSelector(selectteamData);

  const [isEdit, setIsEdit] = useState(false);
  const [task, setTask] = useState([]);
  const [TaskList, setTaskList] = useState([]);

  // Delete Task
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTask(null);
    } else {
      setModal(true);
      setDate(defaultdate());
    }
  }, [modal]);

  // Delete Data
  const onClickDelete = (task) => {
    setTask(task);
    setDeleteModal(true);
  };

  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  // Delete Data
  const handleDeleteTask = () => {
    if (task) {
      dispatch(deleteTask(task._id));
      setDeleteModal(false);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      taskId: task && task.taskId,
      project: (task && task.project) || "",
      hall: (task && task.hall) || "ROOM 1",
      zoomlink: (task && task.zoomlink) || "",
      task: (task && task.task) || "",
      starttime: (task && task.starttime) || "",
      endtime: (task && task.endtime) || "",
      speakers: (task && task.speakers) || [],
    },
    validationSchema: Yup.object({
      // taskId: Yup.string().required("Please select Session"),
      project: Yup.string().required("Please Enter session Name"),
      task: Yup.string().required("Please Enter Session Topic"),
      starttime: Yup.string().required("Please Enter Start Time"),
      endtime: Yup.string().required("Please Enter End Time"),
      // speakers: Yup.array().min(1, "Please select at least one speaker"),

      // dueDate: Yup.string().required("Please Enter Due Date"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedTask = {
          sessionId: values["taskId"],
          name: values["project"],
          topic: values["task"],
        };
        // update customer
        dispatch(updateTask(updatedTask));
        validation.resetForm();
      } else {
        const newTask = {
          sessionId: values["taskId"],
          name: values["project"],
          topic: values["task"],
          starttime: values["starttime"],
          endtime: values["endtime"],
          speakers: values.speakers,
        };
        // save new customer
        dispatch(addParallelSession(newTask));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Update Data
  const handleCustomerClick = useCallback(
    (arg) => {
      const task = arg;

      setTask({
        _id: task._id,
        taskId: task.taskId,
        project: task.project,
        task: task.task,
        creater: task.creater,
        dueDate: task.dueDate,
        status: task.status,
        priority: task.priority,
        subItem: task.subItem,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add Data
  const handleTaskClicks = () => {
    setTask("");
    setIsEdit(false);
    toggle();
  };

  // Get Data

  useEffect(() => {
    if (!isEmpty(taskList)) setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    dispatch(getPrallelSession());
  }, [dispatch]);

  useEffect(() => {
    setTaskList(taskList);
  }, [taskList]);

  useEffect(() => {
    if (!isEmpty(taskList)) {
      setTaskList(taskList);
      setIsEdit(false);
    }
  }, [taskList]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".taskCheckBox");

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
      dispatch(deleteTask(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".taskCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              className="taskCheckBox form-check-input"
              value={cellProps.row.original._id}
              onChange={() => deleteCheckbox()}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Session ID",
        accessor: "taskId",
        filterable: false,
        Cell: (cellProps) => {
          return <OrdersId {...cellProps} />;
        },
      },
      {
        Header: "Session Name",
        accessor: "project",
        filterable: false,
        Cell: (cellProps) => {
          return <Project {...cellProps} />;
        },
      },
      {
        Header: "Session Topic",
        accessor: "task",
        filterable: false,
        Cell: (cellProps) => {
          return (
            <React.Fragment>
              <div className="d-flex">
                <div className="flex-grow-1 tasks_name">{cellProps.value}</div>
                <div className="flex-shrink-0 ms-4">
                  <ul className="list-inline tasks-list-menu mb-0">
                    <li className="list-inline-item">
                      <Link to="/apps-tasks-details">
                        <i className="ri-eye-fill align-bottom me-2 text-muted"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="#"
                        onClick={() => {
                          const taskData = cellProps.row.original;
                          handleCustomerClick(taskData);
                        }}
                      >
                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link
                        to="#"
                        className="remove-item-btn"
                        onClick={() => {
                          const taskData = cellProps.row.original;
                          onClickDelete(taskData);
                        }}
                      >
                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </React.Fragment>
          );
        },
      },
      {
        Header: "Created By",
        accessor: "creater",
        filterable: false,
        Cell: (cellProps) => {
          return <CreateBy {...cellProps} />;
        },
      },
      {
        Header: "Speakers",
        accessor: "subItem",
        filterable: false,
        Cell: (cell) => {
          const assigned = cell.value.map((item) =>
            item.image ? item.image : item
          );
          return (
            <React.Fragment>
              <div className="avatar-group">
                {assigned.map((item, index) => (
                  <Link key={index} to="#" className="avatar-group-item">
                    <img
                      src={`https://summitapi.cariscabusinessforum.com${item}`}
                      alt=""
                      className="rounded-circle avatar-xxs"
                    />
                  </Link>
                ))}
              </div>
            </React.Fragment>
          );
        },
      },
      {
        Header: "Date",
        accessor: "dueDate",
        filterable: false,
        Cell: (cellProps) => {
          return <DueDate {...cellProps} />;
        },
      },

      {
        Header: "Start Time",
        accessor: "starttime",
        filterable: false,
        Cell: (cellProps) => {
          return (
            <React.Fragment>
              <div className="d-flex">
                <div className="flex-grow-1 tasks_name">
                  {cellProps.value || "N/A"}
                </div>
              </div>
            </React.Fragment>
          );
        },
      },
      {
        Header: "End Time",
        accessor: "endtime",
        filterable: false,
        Cell: (cellProps) => {
          return (
            <React.Fragment>
              <div className="d-flex">
                <div className="flex-grow-1 tasks_name">
                  {cellProps.value || "N/A"}
                </div>
              </div>
            </React.Fragment>
          );
        },
      },
      {
        Header: "Status",
        accessor: "status",
        filterable: false,
        Cell: (cellProps) => {
          return <Status {...cellProps} />;
        },
      },
    ],
    [handleCustomerClick, checkedAll]
  );

  const defaultdate = () => {
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

  const [date, setDate] = useState(defaultdate());

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteTask}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="row">
        <Col lg={12}>
          <div className="card" id="tasksList">
            <div className="card-header border-0">
              <div className="d-flex align-items-center">
                <h5 className="card-title mb-0 flex-grow-1">All Tasks</h5>
                <div className="flex-shrink-0">
                  <div className="d-flex flex-wrap gap-2">
                    <button
                      className="btn btn-danger add-btn me-1"
                      onClick={() => {
                        setIsEdit(false);
                        toggle();
                      }}
                    >
                      <i className="ri-add-line align-bottom me-1"></i> Create
                      Parallel Session
                    </button>
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
            </div>

            <div className="card-body pt-0">
              {/* {isTaskSuccess && taskList.length ? ( */}
              <TableContainer
                columns={columns}
                data={taskList.map((task) => ({
                  ...task,
                  taskId: task.sessionId,
                  project: task.name,
                  task: task.topic,
                  creater: task.creater
                    ? `${task.creater.fname} ${task.creater.lname}`
                    : "Admin",
                  dueDate: task.session?.date,
                  subItem: task.Speakers || [],
                  status: task.status || "Upcoming",
                  priority: task.priority || "Low",
                }))}
                isGlobalFilter={true}
                isAddUserList={false}
                customPageSize={8}
                className="custom-header-css"
                divClass="table-responsive table-card mb-3"
                tableClass="align-middle table-nowrap mb-0"
                theadClass="table-light table-nowrap"
                thClass="table-light text-muted"
                handleTaskClick={handleTaskClicks}
                isTaskListFilter={true}
                SearchPlaceholder="Search for tasks or something..."
              />

              <ToastContainer closeButton={false} limit={1} />
            </div>
          </div>
        </Col>
      </div>

      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        size="lg"
        className="border-0"
        modalClassName="modal fade zoomIn"
      >
        <ModalHeader className="p-3 bg-info-subtle" toggle={toggle}>
          {!!isEdit ? "Edit Session" : "Create Session"}
        </ModalHeader>
        <Form
          className="tablelist-form"
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <ModalBody className="modal-body">
            <Row className="g-3">
              <Col lg={12}>
                <Label for="taskId-field" className="form-label">
                  Sellect session
                </Label>
                <Input
                  name="taskId"
                  id="taskId-field"
                  className="form-control"
                  placeholder="Enter Task Id"
                  type="select"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={(e) => {
                    const value = e.target.value
                      ? parseInt(e.target.value, 10)
                      : "";
                    validation.setFieldValue("taskId", value);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.taskId}
                  invalid={
                    validation.touched.taskId && validation.errors.taskId
                      ? true
                      : false
                  }
                >
                  <option value="">Select Session</option>
                  {ticketsList &&
                    ticketsList.map((ticket, key) => (
                      <option key={key} value={ticket.id}>
                        {ticket.name}
                      </option>
                    ))}
                </Input>

                {validation.touched.taskId && validation.errors.taskId ? (
                  <FormFeedback type="invalid">
                    {validation.errors.taskId}
                  </FormFeedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <Label for="projectName-field" className="form-label">
                  Parallel Session Name
                </Label>
                <Input
                  name="project"
                  id="projectName-field"
                  className="form-control"
                  placeholder="Parallel session name"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.project || ""}
                  invalid={
                    validation.touched.project && validation.errors.project
                      ? true
                      : false
                  }
                />
                {validation.touched.project && validation.errors.project ? (
                  <FormFeedback type="invalid">
                    {validation.errors.project}
                  </FormFeedback>
                ) : null}
              </Col>
              <Col lg={12}>
                <div>
                  <Label for="tasksTitle-field" className="form-label">
                    Topic
                  </Label>
                  <Input
                    name="task"
                    id="tasksTitle-field"
                    className="form-control"
                    placeholder="Parallel session topic"
                    type="text"
                    validate={{
                      required: { value: true },
                    }}
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.task || ""}
                    invalid={
                      validation.touched.task && validation.errors.task
                        ? true
                        : false
                    }
                  />
                  {validation.touched.task && validation.errors.task ? (
                    <FormFeedback type="invalid">
                      {validation.errors.task}
                    </FormFeedback>
                  ) : null}
                </div>
              </Col>
              {/* <Col lg={12}>
                <Label for="duedate-field" className="form-label">
                  Date
                </Label>

                <Flatpickr
                  name="dueDate"
                  id="duedate-field"
                  className="form-control"
                  placeholder="Select a date"
                  options={{
                    altInput: true,
                    altFormat: "d M, Y",
                    dateFormat: "d M, Y",
                  }}
                  onChange={(selectedDates) => {
                    validation.setFieldValue("dueDate", selectedDates[0]);
                  }}
                  onBlur={validation.handleBlur}
                  value={validation.values.dueDate || ""}
                />

                {validation.touched.dueDate && validation.errors.dueDate ? (
                  <FormFeedback type="invalid">
                    {validation.errors.dueDate}
                  </FormFeedback>
                ) : null}
              </Col> */}

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

              <Col lg={12}>
                <Label for="projectName-field" className="form-label">
                  Hall
                </Label>
                <Input
                  name="hall"
                  id="projectName-field"
                  className="form-control"
                  placeholder="Parallel session hall"
                  type="select"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.hall || ""}
                  invalid={
                    validation.touched.hall && validation.errors.hall
                      ? true
                      : false
                  }
                >
                  <option value="ROOM 1">ROOM 1</option>
                  <option value="ROOM 2">ROOM 2</option>
                  <option value="ROOM 3">ROOM 3</option>
                  <option value="ROOM 4">ROOM 4</option>
                </Input>
                {validation.touched.hall && validation.errors.hall ? (
                  <FormFeedback type="invalid">
                    {validation.errors.hall}
                  </FormFeedback>
                ) : null}
              </Col>

              <Col lg={12}>
                <Label for="projectName-field" className="form-label">
                  Zoom Link
                </Label>
                <Input
                  name="zoomlink"
                  id="projectName-field"
                  className="form-control"
                  placeholder="Parallel session zoom link"
                  type="text"
                  validate={{
                    required: { value: true },
                  }}
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.zoomlink || ""}
                  invalid={
                    validation.touched.zoomlink && validation.errors.zoomlink
                      ? true
                      : false
                  }
                />

                {validation.touched.zoomlink && validation.errors.zoomlink ? (
                  <FormFeedback type="invalid">
                    {validation.errors.zoomlink}
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
                      validation.setFieldValue("starttime", e.target.value)
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
                      validation.setFieldValue("endtime", e.target.value)
                    }
                    className="form-control"
                  />
                </div>
              </Col>
            </Row>
          </ModalBody>
          <div className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                type="button"
                onClick={() => {
                  setModal(false);
                }}
                className="btn-light"
              >
                Close
              </Button>
              <button type="submit" className="btn btn-success" id="add-btn">
                {!!isEdit ? "Update Parallel Session" : "Add Parallel Session"}
              </button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
};

export default AllTasks;
