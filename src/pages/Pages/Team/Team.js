import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Input,
  Label,
  Modal,
  ModalBody,
  Offcanvas,
  OffcanvasBody,
  Row,
  UncontrolledDropdown,
  FormFeedback,
} from "reactstrap";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import DeleteModal from "../../../Components/Common/DeleteModal";
import { ToastContainer } from "react-toastify";

//User Images
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import userdummyimg from "../../../assets/images/users/user-dummy-img.jpg";

//Small Images
import smallImage9 from "../../../assets/images/small/img-9.jpg";
import banner from "../../../assets/images/banner.png";
//redux
import { useSelector, useDispatch } from "react-redux";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

//import action
import {
  getTeamData as onGetTeamDatas,
  getSpeakers as onGetTeamData,
  deleteTeamData as onDeleteTeamData,
  addTeamData as onAddTeamData,
  addSpeakers as onAddSpeakers,
  updateTeamData as onUpdateTeamData,
} from "../../../slices/thunks";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";
import { createSelector } from "reselect";

const Team = () => {
  const { quillRef } = useQuill();
  document.title = "Speakers";

  const prefixCategory = [
    {
      options: [
        { label: "Prof.", value: "Prof." },
        { label: "Dr.", value: "Dr." },
        { label: "Mr.", value: "Mr." },
        { label: "Mrs.", value: "Mrs." },
        { label: "Ms.", value: "Ms." },
      ],
    },
  ];

  const dispatch = useDispatch();

  const selectteamData = createSelector(
    (state) => state.Team.speakers,
    (speakers) => speakers
  );
  // Inside your component
  const teamData = useSelector(selectteamData);

  const [team, setTeam] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [teamList, setTeamlist] = useState([]);

  //Modal
  const [teamMem, setTeamMem] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(onGetTeamData());
  }, [dispatch]);

  useEffect(() => {
    setTeam(
      teamData.map((team) => ({
        id: team?.id,
        backgroundImg: banner,
        image: team?.image,
        name: `${team?.fname} ${team?.lname}`,
        designation: team?.custom,
        projectCount: 225,
        taskCount: 197,
        email: team?.email,
        company: team?.company,
        bio: team?.bio,
        sessions: team?.Sessions,
      }))
    );
    setTeamlist(
      teamData.map((team) => ({
        id: team?.id,
        backgroundImg: banner,
        image: team?.image,
        name: `${team?.fname} ${team?.lname}`,
        designation: team?.custom,
        projectCount: 225,
        taskCount: 197,
        email: team?.email,
        company: team?.company,
        bio: team?.bio,
        sessions: team?.Sessions,
      }))
    );
  }, [teamData]);

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setTeamMem(null);
    } else {
      setModal(true);
    }
  }, [modal]);

  // Update To do
  const handleTeamClick = useCallback(
    (arg) => {
      const teamMem = arg;
      console.log("teamMem", teamMem);
      setTeamMem({
        prefix: (teamMem && teamMem?.prefix) || "Prof.",
        email: (teamMem && teamMem?.email) || "",
        company: (teamMem && teamMem?.company) || "",
        custom: (teamMem && teamMem?.designation) || "",
        // image: (teamMem && teamMem?.image) || "",
        fname: (teamMem && teamMem?.name.split(" ")[0]) || "",
        lname: (teamMem && teamMem?.name.split(" ")[1]) || "",
        linkedin: (teamMem && teamMem?.linkedin) || "",
        designation: (teamMem && teamMem?.designation) || "Keynote Speaker",
        bio: (teamMem && teamMem?.bio) || "",
      });

      setIsEdit(true);
      toggle();
    },
    [toggle]
  );

  // Add To do
  const handleTeamClicks = () => {
    setTeamMem("");
    setModal(!modal);
    setIsEdit(false);
    toggle();
  };

  // delete
  const onClickData = (team) => {
    setTeam(team);
    setDeleteModal(true);
  };

  const handleDeleteTeamData = () => {
    if (team) {
      dispatch(onDeleteTeamData(team.id));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    const list = document.querySelectorAll(".team-list");
    const buttonGroups = document.querySelectorAll(".filter-button");
    for (let i = 0; i < buttonGroups.length; i++) {
      buttonGroups[i].addEventListener("click", onButtonGroupClick);
    }

    function onButtonGroupClick(event) {
      if (
        event.target.id === "list-view-button" ||
        event.target.parentElement.id === "list-view-button"
      ) {
        document.getElementById("list-view-button").classList.add("active");
        document.getElementById("grid-view-button").classList.remove("active");
        list.forEach(function (el) {
          el.classList.add("list-view-filter");
          el.classList.remove("grid-view-filter");
        });
      } else {
        document.getElementById("grid-view-button").classList.add("active");
        document.getElementById("list-view-button").classList.remove("active");
        list.forEach(function (el) {
          el.classList.remove("list-view-filter");
          el.classList.add("grid-view-filter");
        });
      }
    }
  }, []);

  const favouriteBtn = (ele) => {
    if (ele.closest("button").classList.contains("active")) {
      ele.closest("button").classList.remove("active");
    } else {
      ele.closest("button").classList.add("active");
    }
  };

  const searchList = (e) => {
    let inputVal = e?.toLowerCase();

    const filterItems = (arr, query) => {
      return arr.filter((el) => {
        return el.fname?.toLowerCase()?.indexOf(query?.toLowerCase()) !== -1;
      });
    };

    let filterData = filterItems(teamData, inputVal);
    setTeamlist(
      filterData.map((team) => ({
        id: team?.id,
        backgroundImg: banner,
        image: team?.image,
        name: `${team?.fname} ${team?.lname}`,
        designation: team?.custom,
        projectCount: 225,
        taskCount: 197,
      }))
    );
    if (filterData.length === 0) {
      document.getElementById("noresult").style.display = "block";
      document.getElementById("teamlist").style.display = "none";
    } else {
      document.getElementById("noresult").style.display = "none";
      document.getElementById("teamlist").style.display = "block";
    }
  };

  //OffCanvas
  const [isOpen, setIsOpen] = useState(false);
  const [sideBar, setSideBar] = useState([]);

  //Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggledropDown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      prefix: (teamMem && teamMem?.prefix) || "Prof.",
      email: (teamMem && teamMem?.email) || "",
      company: (teamMem && teamMem?.company) || "",
      custom: (teamMem && teamMem?.designation) || "",
      image: (teamMem && teamMem?.image) || "",
      fname: (teamMem && teamMem?.fname) || "",
      lname: (teamMem && teamMem?.lname) || "",
      linkedin: (teamMem && teamMem?.linkedin) || "",
      designation: (teamMem && teamMem?.designation) || "Keynote Speaker",
      bio: (teamMem && teamMem?.bio) || "",
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("Please Enter Speaker's  First Name"),
      lname: Yup.string().required("Please Enter Speaker's  Last Name"),
      designation: Yup.string().required("Please Enter Your designation"),
      bio: Yup.string().required("Please Enter Speaker's bio"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateTeamData = {
          id: teamMem ? teamMem.id : 0,
          fname: values.fname,
          lname: values.lname,
          designation: values.designation,
          projectCount: values.projectCount,
          taskCount: values.taskCount,
        };
        // save edit Team data
        dispatch(onUpdateTeamData(updateTeamData));
        validation.resetForm();
      } else {
        const newTeamData = {
          prefix: values.prefix,
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          company: values.company,
          custom: values.designation,
          image: values.image,
          linkedin: values.linkedin,
          bio: values.bio,
        };
        // save new TeamData
        const formData = new FormData();
        formData.append("prefix", values.prefix);
        formData.append("fname", values.fname);
        formData.append("lname", values.lname);
        formData.append("email", values.email);
        formData.append("company", values.company);
        formData.append("custom", values.designation);
        formData.append("linkedin", values.linkedin);
        formData.append("bio", values.bio);
        formData.append("image", values.image);

        dispatch(onAddSpeakers(formData));
        dispatch(onGetTeamData());
        validation.resetForm();
      }
      toggle();
    },
  });

  return (
    <React.Fragment>
      <ToastContainer closeButton={false} />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={() => handleDeleteTeamData()}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Speakers" pageTitle="Speakers" />
          <Card>
            <CardBody>
              <Row className="g-2">
                <Col sm={4}>
                  <div className="search-box">
                    <Input
                      type="text"
                      className="form-control"
                      placeholder="Search for name or designation..."
                      onChange={(e) => searchList(e.target.value)}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
                <Col className="col-sm-auto ms-auto">
                  <div className="list-grid-nav hstack gap-1">
                    <Button
                      color="info"
                      id="grid-view-button"
                      className="btn btn-soft-info nav-link btn-icon fs-14 active filter-button"
                    >
                      <i className="ri-grid-fill"></i>
                    </Button>
                    <Button
                      color="info"
                      id="list-view-button"
                      className="btn btn-soft-info nav-link  btn-icon fs-14 filter-button"
                    >
                      <i className="ri-list-unordered"></i>
                    </Button>
                    {/* <Dropdown
                                            isOpen={dropdownOpen}
                                            toggle={toggledropDown}>
                                            <DropdownToggle type="button" className="btn btn-soft-info btn-icon fs-14">
                                                <i className="ri-more-2-fill"></i>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <li><Link className="dropdown-item" to="#">All</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Week</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Month</Link></li>
                                                <li><Link className="dropdown-item" to="#">Last Year</Link></li>
                                            </DropdownMenu>
                                        </Dropdown> */}
                    <Button color="success" onClick={() => handleTeamClicks()}>
                      <i className="ri-add-fill me-1 align-bottom"></i> Add
                      Speaker
                    </Button>
                    <Button color="success">
                      <i className="ri-add-fill me-1 align-bottom"></i> Bulk
                      upload
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>

          <Row>
            <Col lg={12}>
              <div id="teamlist">
                <Row className="team-list grid-view-filter">
                  {(teamList || []).map((item, key) => (
                    <Col key={key}>
                      <Card className="team-box">
                        <div className="team-cover">
                          <img src={banner} alt="" className="img-fluid" />
                        </div>
                        <CardBody className="p-4">
                          <Row className="align-items-center team-row">
                            <Col className="team-settings">
                              <Row>
                                <Col>
                                  {/* <div className="flex-shrink-0 me-2">x
                                    <button
                                      type="button"
                                      className="btn btn-light btn-icon rounded-circle btn-sm favourite-btn"
                                      onClick={(e) => favouriteBtn(e.target)}
                                    >
                                      <i className="ri-star-fill fs-14"></i>
                                    </button>
                                  </div> */}
                                </Col>
                                <UncontrolledDropdown
                                  direction="start"
                                  className="col text-end"
                                >
                                  <DropdownToggle
                                    tag="a"
                                    id="dropdownMenuLink2"
                                    role="button"
                                  >
                                    <i className="ri-more-fill fs-17"></i>
                                  </DropdownToggle>
                                  <DropdownMenu>
                                    <DropdownItem
                                      className="dropdown-item edit-list"
                                      href="#addmemberModal"
                                      onClick={() => handleTeamClick(item)}
                                    >
                                      <i className="ri-pencil-line me-2 align-bottom text-muted"></i>
                                      Edit
                                    </DropdownItem>
                                    <DropdownItem
                                      className="dropdown-item remove-list"
                                      href="#removeMemberModal"
                                      onClick={() => onClickData(item)}
                                    >
                                      <i className="ri-delete-bin-5-line me-2 align-bottom text-muted"></i>
                                      Remove
                                    </DropdownItem>
                                  </DropdownMenu>
                                </UncontrolledDropdown>
                              </Row>
                            </Col>
                            <Col lg={4} className="col">
                              <div className="team-profile-img">
                                <div className="avatar-lg img-thumbnail rounded-circle flex-shrink-0">
                                  {item?.image != null ? (
                                    <img
                                      src={`https://summitapi.cariscabusinessforum.com${item?.image}`}
                                      alt=""
                                      className="img-fluid d-block rounded-circle"
                                    />
                                  ) : (
                                    <div className="avatar-title text-uppercase border rounded-circle bg-light text-primary">
                                      {item?.name?.charAt(0) +
                                        item?.name
                                          ?.split(" ")
                                          .slice(-1)
                                          .toString()
                                          ?.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="team-content">
                                  <Link
                                    to="#"
                                    onClick={() => {
                                      setIsOpen(!isOpen);
                                      setSideBar(item);
                                    }}
                                  >
                                    <h5 className="fs-16 mb-1">{item?.name}</h5>
                                  </Link>
                                  <p className="text-muted mb-0">
                                    {item?.designation}
                                  </p>
                                </div>
                              </div>
                            </Col>
                            {/* <Col lg={4} className="col">
                              <Row className="text-muted text-center">
                                <Col
                                  xs={6}
                                  className="border-end border-end-dashed"
                                >
                                  <h5 className="mb-1">{item?.projectCount}</h5>
                                  <p className="text-muted mb-0">Projects</p>
                                </Col>
                                <Col xs={6}>
                                  <h5 className="mb-1">{item?.taskCount}</h5>
                                  <p className="text-muted mb-0">Tasks</p>
                                </Col>
                              </Row>
                            </Col> */}
                            <Col lg={2} className="col">
                              <div className="text-end">
                                <Link
                                  to="#"
                                  onClick={() => {
                                    setIsOpen(!isOpen);
                                    setSideBar(item);
                                  }}
                                  className="btn btn-light view-btn"
                                >
                                  View Profile
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}

                  <Col lg={12}>
                    <div className="text-center mb-3">
                      <Link to="#" className="text-success">
                        <i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i>{" "}
                        Load More{" "}
                      </Link>
                    </div>
                  </Col>
                </Row>

                <div
                  className="modal fade"
                  id="addmembers"
                  tabIndex="-1"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <Modal isOpen={modal} toggle={toggle} centered size="lg">
                      <ModalBody>
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <Row>
                            <Col lg={12}>
                              <input
                                type="hidden"
                                id="memberid-input"
                                className="form-control"
                                defaultValue=""
                              />
                              <div className="px-1 pt-1">
                                <div className="modal-team-cover position-relative mb-0 mt-n4 mx-n4 rounded-top overflow-hidden">
                                  <img
                                    src={banner}
                                    alt=""
                                    id="cover-img"
                                    className="img-fluid"
                                  />

                                  <div className="d-flex position-absolute start-0 end-0 top-0 p-3">
                                    <div className="flex-grow-1">
                                      <h5
                                        className="modal-title text-white"
                                        id="createMemberLabel"
                                      >
                                        {!isEdit
                                          ? "Add New Members"
                                          : "Edit Member"}
                                      </h5>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <div className="d-flex gap-3 align-items-center">
                                        <div>
                                          <label
                                            htmlFor="cover-image-input"
                                            className="mb-0"
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            title="Select Cover Image"
                                          >
                                            <div className="avatar-xs">
                                              <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                                <i className="ri-image-fill"></i>
                                              </div>
                                            </div>
                                          </label>
                                          <input
                                            className="form-control d-none"
                                            defaultValue=""
                                            id="cover-image-input"
                                            type="file"
                                            accept="image/png, image/gif, image/jpeg"
                                          />
                                        </div>
                                        <button
                                          type="button"
                                          className="btn-close btn-close-white"
                                          onClick={() => setModal(false)}
                                          id="createMemberBtn-close"
                                          data-bs-dismiss="modal"
                                          aria-label="Close"
                                        ></button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-center mb-4 mt-n5 pt-2">
                                <div className="position-relative d-inline-block">
                                  <div className="position-absolute bottom-0 end-0">
                                    <label
                                      htmlFor="image"
                                      className="mb-0"
                                      data-bs-toggle="tooltip"
                                      data-bs-placement="right"
                                      title="Select Member Image"
                                    >
                                      <div className="avatar-xs">
                                        <div className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                          <i className="ri-image-fill"></i>
                                        </div>
                                      </div>
                                    </label>
                                    <input
                                      className="form-control d-none"
                                      defaultValue=""
                                      id="image"
                                      type="file"
                                      accept="image/png, image/gif, image/jpeg"
                                      onChange={(event) => {
                                        validation.setFieldValue(
                                          "image",
                                          event.currentTarget.files[0]
                                        );
                                      }}
                                    />
                                  </div>
                                  <div className="avatar-lg">
                                    <div className="avatar-title bg-light rounded-circle">
                                      <img
                                        src={
                                          validation?.values?.image
                                            ? URL.createObjectURL(
                                                validation?.values?.image
                                              )
                                            : smallImage9
                                        }
                                        alt=" "
                                        id="member-img"
                                        className="avatar-md rounded-circle h-auto"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Row>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="prefix"
                                      className="form-label"
                                    >
                                      Prefix
                                    </Label>
                                    <Input
                                      type="select"
                                      className="form-select"
                                      id="prefix"
                                      name="prefix"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.prefix || ""}
                                      invalid={
                                        validation.touched.prefix &&
                                        validation.errors.prefix
                                          ? true
                                          : false
                                      }
                                    >
                                      {prefixCategory.map((item, key) => (
                                        <React.Fragment key={key}>
                                          {item.options.map((item, key) => (
                                            <option
                                              value={item.value}
                                              key={key}
                                            >
                                              {item.label}
                                            </option>
                                          ))}
                                        </React.Fragment>
                                      ))}
                                    </Input>
                                    {validation.touched.prefix &&
                                    validation.errors.prefix ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.prefix}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="designation"
                                      className="form-label"
                                    >
                                      Designation
                                    </Label>
                                    <Input
                                      type="select"
                                      className="form-control"
                                      id="designation"
                                      placeholder="Enter speaker role"
                                      name="designation"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={
                                        validation.values.designation || ""
                                      }
                                      invalid={
                                        validation.touched.designation &&
                                        validation.errors.designation
                                          ? true
                                          : false
                                      }
                                    >
                                      <option value="Keynote Speaker">
                                        Keynote Speaker
                                      </option>
                                      <option value="Session Chair">
                                        Session Chair
                                      </option>
                                      <option value="Presenter">
                                        Presenter
                                      </option>
                                    </Input>

                                    {validation.touched.designation &&
                                    validation.errors.designation ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.designation}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>

                              <Row>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="fname"
                                      className="form-label"
                                    >
                                      First Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="fname"
                                      placeholder="Enter name"
                                      name="fname"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.fname || ""}
                                      invalid={
                                        validation.touched.fname &&
                                        validation.errors.fname
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.touched.fname &&
                                    validation.errors.fname ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.fname}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="lname"
                                      className="form-label"
                                    >
                                      Last Name
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="lname"
                                      placeholder="Enter name"
                                      name="lname"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.lname || ""}
                                      invalid={
                                        validation.touched.lname &&
                                        validation.errors.lname
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.touched.lname &&
                                    validation.errors.lname ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.lname}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </Label>
                                    <Input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      placeholder="Enter speaker's email"
                                      name="email"
                                      validate={{
                                        required: { value: true },
                                      }}
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
                                </Col>
                                <Col>
                                  <div className="mb-3">
                                    <Label
                                      htmlFor="company"
                                      className="form-label"
                                    >
                                      Company
                                    </Label>
                                    <Input
                                      type="text"
                                      className="form-control"
                                      id="company"
                                      placeholder="Enter speaker's company"
                                      name="company"
                                      validate={{
                                        required: { value: true },
                                      }}
                                      onChange={validation.handleChange}
                                      onBlur={validation.handleBlur}
                                      value={validation.values.company || ""}
                                      invalid={
                                        validation.touched.company &&
                                        validation.errors.company
                                          ? true
                                          : false
                                      }
                                    />
                                    {validation.touched.company &&
                                    validation.errors.company ? (
                                      <FormFeedback type="invalid">
                                        {validation.errors.company}
                                      </FormFeedback>
                                    ) : null}
                                  </div>
                                </Col>
                              </Row>
                            </Col>

                            <Col lg={12}>
                              <div className="mb-3">
                                <Label
                                  htmlFor="linkedin"
                                  className="form-label"
                                >
                                  Linkedin
                                </Label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id="linkedin"
                                  placeholder="Enter speaker's linkedin"
                                  name="linkedin"
                                  validate={{
                                    required: { value: true },
                                  }}
                                  onChange={validation.handleChange}
                                  onBlur={validation.handleBlur}
                                  value={validation.values.linkedin || ""}
                                  invalid={
                                    validation.touched.linkedin &&
                                    validation.errors.linkedin
                                      ? true
                                      : false
                                  }
                                />
                                {validation.touched.linkedin &&
                                validation.errors.linkedin ? (
                                  <FormFeedback type="invalid">
                                    {validation.errors.linkedin}
                                  </FormFeedback>
                                ) : null}
                              </div>
                            </Col>
                            <Col lg={12}>
                              <div>
                                <Label>Speaker's Bio</Label>

                                <CKEditor
                                  editor={ClassicEditor}
                                  data=""
                                  onReady={(editor) => {}}
                                  onChange={(event, editor) => {
                                    const data = editor.getData(); // This is the HTML content
                                    validation.setFieldValue("bio", data);
                                  }}
                                />
                              </div>
                            </Col>

                            <Col lg={12}>
                              <div className="hstack gap-2 justify-content-end">
                                <button
                                  type="button"
                                  className="btn btn-light"
                                  onClick={() => setModal(false)}
                                >
                                  Close
                                </button>
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                  id="addNewMember"
                                >
                                  {!isEdit ? "Add Member" : "Save"}
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                    </Modal>
                  </div>
                </div>

                <Offcanvas
                  isOpen={isOpen}
                  direction="end"
                  toggle={() => setIsOpen(!isOpen)}
                  className="offcanvas-end border-0"
                  tabIndex="-1"
                >
                  <OffcanvasBody className="profile-offcanvas p-0">
                    <div className="team-cover">
                      <img
                        src={sideBar.backgroundImg || smallImage9}
                        alt=""
                        className="img-fluid"
                      />
                    </div>
                    <div className="p-3">
                      <div className="team-settings">
                        <Row>
                          <Col>
                            {/* <button
                              type="button"
                              class="btn btn-light btn-icon rounded-circle btn-sm favourite-btn "
                            >
                              {" "}
                              <i class="ri-star-fill fs-14"></i>{" "}
                            </button> */}
                          </Col>
                          <UncontrolledDropdown
                            direction="start"
                            className="col text-end"
                          >
                            <DropdownToggle
                              tag="a"
                              id="dropdownMenuLink14"
                              role="button"
                            >
                              <i className="ri-more-fill fs-17"></i>
                            </DropdownToggle>
                            <DropdownMenu>
                              {/* <DropdownItem>
                                <i className="ri-star-line me-2 align-middle" />
                                Favorites
                              </DropdownItem> */}
                              <DropdownItem>
                                <i className="ri-delete-bin-5-line me-2 align-middle" />
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </Row>
                      </div>
                    </div>
                    <div className="p-3 text-center">
                      <img
                        src={
                          `https://summitapi.cariscabusinessforum.com${sideBar?.image}` ||
                          avatar2
                        }
                        alt=""
                        className="avatar-lg img-thumbnail rounded-circle mx-auto"
                      />
                      <div className="mt-3">
                        <h5 className="fs-15">
                          <Link to="#" className="link-primary">
                            {sideBar?.name || "Nancy Martino"}
                          </Link>
                        </h5>
                        <p className="text-muted">
                          {sideBar?.designation || "Team Leader & HR"}
                        </p>
                      </div>
                      <div className="hstack gap-2 justify-content-center mt-4">
                        <div className="avatar-xs">
                          <a
                            href={sideBar?.linkedin}
                            className="avatar-title bg-info-subtle text-info rounded fs-16"
                          >
                            <i className="ri-linkedin-fill"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    {/* <Row className="g-0 text-center">
                      <Col xs={6}>
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1">
                            {sideBar.projectCount || "124"}
                          </h5>
                          <p className="text-muted mb-0">Projects</p>
                        </div>
                      </Col>
                      <Col xs={6}>
                        <div className="p-3 border border-dashed border-start-0">
                          <h5 className="mb-1">{sideBar.taskCount || "81"}</h5>
                          <p className="text-muted mb-0">Tasks</p>
                        </div>
                      </Col>
                    </Row> */}
                    <div className="p-3">
                      <h5 className="fs-15 mb-3">Personal Details</h5>
                      <div className="mb-3">
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Company
                        </p>
                        <h6>{sideBar?.company}</h6>
                      </div>
                      <div className="mb-3">
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Email
                        </p>
                        <h6>{sideBar?.email}</h6>
                      </div>
                      <div>
                        <p className="text-muted text-uppercase fw-semibold fs-12 mb-2">
                          Bio
                        </p>
                        <h6
                          className="mb-0"
                          dangerouslySetInnerHTML={{ __html: sideBar?.bio }}
                        ></h6>
                      </div>
                    </div>
                    <div className="p-3 border-top">
                      <h5 className="fs-15 mb-4">Sessions</h5>
                    </div>
                    {sideBar?.sessions?.map((session, index) => (
                      <div className="d-flex mb-3">
                        <div className="flex-shrink-0 avatar-xs">
                          <div className="avatar-title bg-danger-subtle text-danger rounded fs-16">
                            {index + 1}
                          </div>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h6 className="mb-1">
                            <Link to="#">{session?.name}</Link>
                          </h6>
                          <p className="text-muted mb-0">
                            {new Date(session.date).toLocaleDateString(
                              "en-GB",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </p>
                        </div>
                        <div className="text-muted">
                          {session?.starttime} - {session?.endtime}
                        </div>
                      </div>
                    ))}
                  </OffcanvasBody>
                  <div className="offcanvas-foorter border p-3 hstack gap-3 text-center position-relative">
                    <button className="btn btn-light w-100">
                      <i className="ri-question-answer-fill align-bottom ms-1"></i>{" "}
                      Send Message
                    </button>
                    <Link to="/pages-profile" className="btn btn-primary w-100">
                      <i className="ri-user-3-fill align-bottom ms-1"></i> View
                      Profile
                    </Link>
                  </div>
                </Offcanvas>
              </div>
              <div
                className="py-4 mt-4 text-center"
                id="noresult"
                style={{ display: "none" }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/msoeawqm.json"
                  trigger="loop"
                  colors="primary:#405189,secondary:#0ab39c"
                  style={{ width: "72px", height: "72px" }}
                ></lord-icon>
                <h5 className="mt-4">Sorry! No Result Found</h5>
              </div>
            </Col>
          </Row>

          {/* <svg className="bookmark-hide">
                        <symbol viewBox="0 0 24 24" stroke="currentColor" fill="var(--color-svg)" id="icon-star"><path strokeWidth=".4" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></symbol>
                    </svg> */}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Team;
