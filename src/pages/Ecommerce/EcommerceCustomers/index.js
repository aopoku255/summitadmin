import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  Modal,
  Form,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";
import Flatpickr from "react-flatpickr";
import { isEmpty } from "lodash";
import * as moment from "moment";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//Import Breadcrumb
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";

import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "../../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";
import TableContainer from "../../../Components/Common/TableContainer";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../Components/Common/Loader";

// Export Modal
import ExportCSVModal from "../../../Components/Common/ExportCSVModal";
import { createSelector } from "reselect";

const EcommerceCustomers = () => {
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Ecommerce;
  const selectLayoutProperties = createSelector(selectLayoutState, (state) => ({
    customers: state.customers,
    isCustomerSuccess: state.isCustomerSuccess,
    error: state.error,
  }));
  // Inside your component
  const { customers, isCustomerSuccess, error } = useSelector(
    selectLayoutProperties
  );

  // const isCustomerSuccess = true;

  // const customers = [
  //   {
  //     _id: "c1a2b3",
  //     id: "001",
  //     customer: "John Doe",
  //     email: "john.doe@example.com",
  //     phone: "+233201234567",
  //     date: "2025-05-01T10:30:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "c4d5e6",
  //     id: "002",
  //     customer: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     phone: "+233202345678",
  //     date: "2025-04-20T14:45:00Z",
  //     status: "Block",
  //   },
  //   {
  //     _id: "c7f8g9",
  //     id: "003",
  //     customer: "Kwame Mensah",
  //     email: "kwame.mensah@example.com",
  //     phone: "+233203456789",
  //     date: "2025-03-15T09:15:00Z",
  //     status: "Pending",
  //   },
  //   {
  //     _id: "d1e2f3",
  //     id: "004",
  //     customer: "Ama Serwaa",
  //     email: "ama.serwaa@example.com",
  //     phone: "+233204567890",
  //     date: "2025-02-10T08:00:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "d4e5f6",
  //     id: "005",
  //     customer: "Kojo Antwi",
  //     email: "kojo.antwi@example.com",
  //     phone: "+233205678901",
  //     date: "2025-01-25T12:20:00Z",
  //     status: "Block",
  //   },
  //   {
  //     _id: "e1f2g3",
  //     id: "006",
  //     customer: "Esi Yankson",
  //     email: "esi.yankson@example.com",
  //     phone: "+233206789012",
  //     date: "2025-05-03T11:10:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "e4f5g6",
  //     id: "007",
  //     customer: "Yaw Dapaah",
  //     email: "yaw.dapaah@example.com",
  //     phone: "+233207890123",
  //     date: "2025-04-18T13:45:00Z",
  //     status: "Pending",
  //   },
  //   {
  //     _id: "f1g2h3",
  //     id: "008",
  //     customer: "Abena Korkor",
  //     email: "abena.korkor@example.com",
  //     phone: "+233208901234",
  //     date: "2025-03-10T10:00:00Z",
  //     status: "Block",
  //   },
  //   {
  //     _id: "f4g5h6",
  //     id: "009",
  //     customer: "Peter Owusu",
  //     email: "peter.owusu@example.com",
  //     phone: "+233209012345",
  //     date: "2025-02-01T09:30:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "g1h2i3",
  //     id: "010",
  //     customer: "Linda Boateng",
  //     email: "linda.boateng@example.com",
  //     phone: "+233210123456",
  //     date: "2025-01-12T15:00:00Z",
  //     status: "Pending",
  //   },
  //   {
  //     _id: "g4h5i6",
  //     id: "011",
  //     customer: "Samuel Kumi",
  //     email: "samuel.kumi@example.com",
  //     phone: "+233211234567",
  //     date: "2025-03-30T17:00:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "h1i2j3",
  //     id: "012",
  //     customer: "Nana Ama",
  //     email: "nana.ama@example.com",
  //     phone: "+233212345678",
  //     date: "2025-02-15T10:10:00Z",
  //     status: "Block",
  //   },
  //   {
  //     _id: "h4i5j6",
  //     id: "013",
  //     customer: "Daniel Adjei",
  //     email: "daniel.adjei@example.com",
  //     phone: "+233213456789",
  //     date: "2025-01-20T11:15:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "i1j2k3",
  //     id: "014",
  //     customer: "Cynthia Asare",
  //     email: "cynthia.asare@example.com",
  //     phone: "+233214567890",
  //     date: "2025-04-01T14:25:00Z",
  //     status: "Pending",
  //   },
  //   {
  //     _id: "i4j5k6",
  //     id: "015",
  //     customer: "Michael Agyemang",
  //     email: "michael.agyemang@example.com",
  //     phone: "+233215678901",
  //     date: "2025-03-05T16:30:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "j1k2l3",
  //     id: "016",
  //     customer: "Akosua Addo",
  //     email: "akosua.addo@example.com",
  //     phone: "+233216789012",
  //     date: "2025-02-28T08:40:00Z",
  //     status: "Block",
  //   },
  //   {
  //     _id: "j4k5l6",
  //     id: "017",
  //     customer: "Felix Nti",
  //     email: "felix.nti@example.com",
  //     phone: "+233217890123",
  //     date: "2025-01-10T13:00:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "k1l2m3",
  //     id: "018",
  //     customer: "Portia Opoku",
  //     email: "portia.opoku@example.com",
  //     phone: "+233218901234",
  //     date: "2025-04-12T12:12:00Z",
  //     status: "Pending",
  //   },
  //   {
  //     _id: "k4l5m6",
  //     id: "019",
  //     customer: "Richard Tetteh",
  //     email: "richard.tetteh@example.com",
  //     phone: "+233219012345",
  //     date: "2025-03-03T09:00:00Z",
  //     status: "Success",
  //   },
  //   {
  //     _id: "l1m2n3",
  //     id: "020",
  //     customer: "Gloria Mensah",
  //     email: "gloria.mensah@example.com",
  //     phone: "+233220123456",
  //     date: "2025-01-01T08:20:00Z",
  //     status: "Block",
  //   },
  // ];

  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState([]);

  // Delete customer
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const [modal, setModal] = useState(false);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  const customermocalstatus = [
    {
      options: [
        { label: "Status", value: "Status" },
        { label: "Success", value: "Success" },
        { label: "Block", value: "Block" },
      ],
    },
  ];

  // Delete Data
  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      customer: (customer && customer.customer) || "",
      email: (customer && customer.email) || "",
      phone: (customer && customer.phone) || "",
      date: (customer && customer.date) || "",
      status: (customer && customer.status) || "",
    },
    validationSchema: Yup.object({
      customer: Yup.string().required("Please Enter Customer Name"),
      email: Yup.string().required("Please Enter Your Email"),
      phone: Yup.string().required("Please Enter Your Phone"),
      status: Yup.string().required("Please Enter Your Status"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateCustomer = {
          _id: customer ? customer._id : 0,
          customer: values.customer,
          email: values.email,
          phone: values.phone,
          date: date,
          status: values.status,
        };
        // update customer
        dispatch(onUpdateCustomer(updateCustomer));
        validation.resetForm();
      } else {
        const newCustomer = {
          _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
          customer: values["customer"],
          email: values["email"],
          phone: values["phone"],
          date: date,
          status: values["status"],
        };
        // save new customer
        dispatch(onAddNewCustomer(newCustomer));
        validation.resetForm();
      }
      toggle();
    },
  });

  // Delete Data
  const handleDeleteCustomer = () => {
    if (customer) {
      dispatch(onDeleteCustomer(customer._id));
      setDeleteModal(false);
    }
  };

  // Update Data
  const handleCustomerClick = useCallback(
    (arg) => {
      const customer = arg;

      setCustomer({
        _id: customer._id,
        customer: customer.customer,
        email: customer.email,
        phone: customer.phone,
        date: customer.date,
        status: customer.status,
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomer(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomer(customers);
      setIsEdit(false);
    }
  }, [customers]);

  // Add Data
  const handleCustomerClicks = () => {
    setCustomer("");
    setIsEdit(false);
    toggle();
  };

  // Node API
  // useEffect(() => {
  //   if (isCustomerCreated) {
  //     setCustomer(null);
  //     dispatch(onGetCustomers());
  //   }
  // }, [
  //   dispatch,
  //   isCustomerCreated,
  // ]);

  const handleValidDate = (date) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".customerCheckBox");

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
      dispatch(onDeleteCustomer(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    setIsMultiDeleteButton(false);
    checkall.checked = false;
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".customerCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Customers Column
  const columns = useMemo(
    () => [
      // {
      //   Header: (
      //     <input
      //       type="checkbox"
      //       id="checkBoxAll"
      //       className="form-check-input"
      //       onClick={() => checkedAll()}
      //     />
      //   ),
      //   Cell: (cellProps) => {
      //     return (
      //       <input
      //         type="checkbox"
      //         className="customerCheckBox form-check-input"
      //         value={cellProps.row.original._id}
      //         onChange={() => deleteCheckbox()}
      //       />
      //     );
      //   },
      //   id: "#",
      // },
      {
        Header: "",
        accessor: "id",
        hiddenColumns: true,
        Cell: (cell) => {
          return <input type="hidden" value={cell.value} />;
        },
      },
      {
        Header: "Customer",
        accessor: "customer",
        filterable: false,
      },
      {
        Header: "Email",
        accessor: "email",
        filterable: false,
      },
      {
        Header: "Phone",
        accessor: "phone",
        filterable: false,
      },
      // {
      //   Header: "Date",
      //   accessor: "date",
      //   filterable: false,
      //   Cell: (cell) => <>{handleValidDate(cell.value)}</>,
      // },
      {
        Header: "Status",
        accessor: "status",
        Cell: (cell) => {
          switch (cell.value) {
            case "Success":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Block":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-info-subtle text-info">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
          }
        },
      },
      // {
      //   Header: "Action",
      //   Cell: (cellProps) => {
      //     return (
      //       <ul className="list-inline hstack gap-2 mb-0">
      //         <li className="list-inline-item edit" title="Edit">
      //           <Link
      //             to="#"
      //             className="text-primary d-inline-block edit-item-btn"
      //             onClick={() => {
      //               const customerData = cellProps.row.original;
      //               handleCustomerClick(customerData);
      //             }}
      //           >
      //             <i className="ri-pencil-fill fs-16"></i>
      //           </Link>
      //         </li>
      //         <li className="list-inline-item" title="Remove">
      //           <Link
      //             to="#"
      //             className="text-danger d-inline-block remove-item-btn"
      //             onClick={() => {
      //               const customerData = cellProps.row.original;
      //               onClickDelete(customerData);
      //             }}
      //           >
      //             <i className="ri-delete-bin-5-fill fs-16"></i>
      //           </Link>
      //         </li>
      //       </ul>
      //     );
      //   },
      // },
    ],
    [handleCustomerClick, checkedAll]
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

  const [date, setDate] = useState(dateFormat());

  const dateformate = (e) => {
    const date = e.toString().split(" ");
    const joinDate = (date[2] + " " + date[1] + ", " + date[3]).toString();
    setDate(joinDate);
  };

  // Export Modal
  const [isExportCSV, setIsExportCSV] = useState(false);

  console.log(customers);

  document.title = "Customers | LibertePay";
  return (
    <React.Fragment>
      <div className="page-content">
        <ExportCSVModal
          show={isExportCSV}
          onCloseClick={() => setIsExportCSV(false)}
          data={customers}
          filename={"customers.csv"}
        />

        <Container fluid>
          <BreadCrumb title="Customers" pageTitle="Ecommerce" />
          <Row>
            <Col lg={12}>
              <Card id="customerList">
                <CardHeader className="border-0">
                  <Row className="g-4 align-items-center">
                    <div className="col-sm">
                      <div>
                        {/* <h5 className="card-title mb-0">Customer List</h5> */}
                      </div>
                    </div>
                    <div className="col-sm-auto">
                      <div>
                        {isMultiDeleteButton && (
                          <button
                            className="btn btn-danger me-1"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            <i className="ri-delete-bin-2-line"></i>
                          </button>
                        )}
                        {/* <button
                          type="button"
                          className="btn btn-success add-btn"
                          id="create-btn"
                          onClick={() => {
                            setIsEdit(false);
                            toggle();
                          }}
                        >
                          <i className="ri-add-line align-bottom me-1"></i> Add
                          Customer
                        </button>{" "} */}
                        <button
                          type="button"
                          className="btn btn-info"
                          onClick={() => setIsExportCSV(true)}
                        >
                          <i className="ri-file-download-line align-bottom me-1"></i>{" "}
                          Export
                        </button>
                      </div>
                    </div>
                  </Row>
                </CardHeader>

                <div className="card-body pt-0">
                  <div>
                    {isCustomerSuccess && customers.length ? (
                      <TableContainer
                        columns={columns}
                        data={customers?.map((customer) => ({
                          id: customer?.id,
                          _id: customer?.id,
                          customer: `${customer?.firstname} ${customer?.lastname}`,
                          phone: customer?.phone,
                          status: customer?.status,
                          email: customer?.email,
                        }))}
                        isGlobalFilter={true}
                        customPageSize={5}
                        className="custom-header-css"
                        theadClass="table-light text-muted"
                        handleCustomerClick={handleCustomerClicks}
                        isCustomerFilter={true}
                        SearchPlaceholder="Search for customer, email, phone, status or something..."
                      />
                    ) : (
                      <Loader error={error} />
                    )}
                  </div>

                  <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
                    <ModalHeader className="bg-light p-3" toggle={toggle}>
                      {!!isEdit ? "Edit Customer" : "Add Customer"}
                    </ModalHeader>
                    <Form
                      className="tablelist-form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      <ModalBody>
                        <input type="hidden" id="id-field" />

                        <div
                          className="mb-3"
                          id="modal-id"
                          style={{ display: "none" }}
                        >
                          <Label htmlFor="id-field1" className="form-label">
                            ID
                          </Label>
                          <Input
                            type="text"
                            id="id-field1"
                            className="form-control"
                            placeholder="ID"
                            readOnly
                          />
                        </div>

                        <div className="mb-3">
                          <Label
                            htmlFor="customername-field"
                            className="form-label"
                          >
                            Customer Name
                          </Label>
                          <Input
                            name="customer"
                            id="customername-field"
                            className="form-control"
                            placeholder="Enter Name"
                            type="text"
                            validate={{
                              required: { value: true },
                            }}
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.customer || ""}
                            invalid={
                              validation.touched.customer &&
                              validation.errors.customer
                                ? true
                                : false
                            }
                          />
                          {validation.touched.customer &&
                          validation.errors.customer ? (
                            <FormFeedback type="invalid">
                              {validation.errors.customer}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="email-field" className="form-label">
                            Email
                          </Label>
                          <Input
                            name="email"
                            type="email"
                            id="email-field"
                            placeholder="Enter Email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              {validation.errors.email}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="phone-field" className="form-label">
                            Phone
                          </Label>
                          <Input
                            name="phone"
                            type="text"
                            id="phone-field"
                            placeholder="Enter Phone no."
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              {validation.errors.phone}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="date-field" className="form-label">
                            Joining Date
                          </Label>

                          <Flatpickr
                            name="date"
                            id="date-field"
                            className="form-control"
                            placeholder="Select a date"
                            options={{
                              altInput: true,
                              altFormat: "d M, Y",
                              dateFormat: "d M, Y",
                            }}
                            onChange={(e) => dateformate(e)}
                            value={validation.values.date || ""}
                          />
                          {validation.touched.date && validation.errors.date ? (
                            <FormFeedback type="invalid">
                              {validation.errors.date}
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div>
                          <Label htmlFor="status-field" className="form-label">
                            Status
                          </Label>

                          <Input
                            name="status"
                            type="select"
                            className="form-select"
                            id="status-field"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.status || ""}
                          >
                            {customermocalstatus.map((item, key) => (
                              <React.Fragment key={key}>
                                {item.options.map((item, key) => (
                                  <option value={item.value} key={key}>
                                    {item.label}
                                  </option>
                                ))}
                              </React.Fragment>
                            ))}
                          </Input>
                          {validation.touched.status &&
                          validation.errors.status ? (
                            <FormFeedback type="invalid">
                              {validation.errors.status}
                            </FormFeedback>
                          ) : null}
                        </div>
                      </ModalBody>
                      <ModalFooter>
                        <div className="hstack gap-2 justify-content-end">
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={() => {
                              setModal(false);
                            }}
                          >
                            {" "}
                            Close{" "}
                          </button>

                          <button type="submit" className="btn btn-success">
                            {" "}
                            {!!isEdit ? "Update" : "Add Customer"}{" "}
                          </button>
                        </div>
                      </ModalFooter>
                    </Form>
                  </Modal>
                  <ToastContainer closeButton={false} limit={1} />
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default EcommerceCustomers;
