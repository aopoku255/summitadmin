import React, { useEffect, useMemo, useState } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Button,
  Card,
  CardBody,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { checkinUser, getAllUsers } from "../../../slices/thunks";
import { createSelector } from "reselect";
import { t } from "i18next";
import { set } from "lodash";
import Loader from "../../../Components/Common/Loader";

const Registrations = () => {
  document.title = "Registrations";
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const selectSessiontate = (state) => state.Tasks;
  const selectSessionProperties = createSelector(
    selectSessiontate,
    (state) => ({
      allUsers: state?.allUsers,
      isAllUserSuccess: state?.isAllUserSuccess,
    })
  );
  // Inside your component
  const { allUsers, isAllUserSuccess } = useSelector(selectSessionProperties);
  console.log("allUsers", allUsers);

  const eventDays = [
    new Date("2025-07-30"),
    new Date("2025-07-31"),
    new Date("2025-08-1"),
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleModal = () => setModalOpen(!modalOpen);
  const [loading, setLoading] = useState(false);

  const handleCheckin = async (userId) => {
    setLoading(true);
    try {
      await dispatch(checkinUser({ userId: userId, checkinType: "Walk-In" }));
      dispatch(getAllUsers());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      toggleModal();
    }
  };

  const columns = useMemo(() => {
    const renderCheckin = (value, dayIndex) => {
      const eventDate = eventDays[dayIndex].toDateString();
      const hasCheckin = value?.some(
        (c) => new Date(c.date).toDateString() === eventDate
      );

      return (
        <span>
          {hasCheckin ? (
            <span className="badge bg-success-subtle text-success text-uppercase">
              Yes
            </span>
          ) : (
            <span className="badge bg-warning-subtle text-warning text-uppercase">
              No
            </span>
          )}
        </span>
      );
    };

    return [
      { Header: "ID", accessor: "id", filterable: false },
      { Header: "Prefix", accessor: "prefix" },
      { Header: "First Name", accessor: "first_name", filterable: false },
      { Header: "Last Name", accessor: "last_name", filterable: false },
      { Header: "Email", accessor: "email", filterable: false },
      { Header: "Country", accessor: "country", filterable: false },
      { Header: "Position", accessor: "position", filterable: false },
      { Header: "Gender", accessor: "gender", filterable: false },

      {
        Header: "Checkin Day 1",
        id: "checkin_day_1", // ✅ make it unique
        accessor: (row) => row.checkins,
        Cell: ({ value }) => renderCheckin(value, 0),
        filterable: false,
      },
      {
        Header: "Checkin Day 2",
        id: "checkin_day_2", // ✅ unique ID
        accessor: (row) => row.checkins,
        Cell: ({ value }) => renderCheckin(value, 1),
        filterable: false,
      },
      {
        Header: "Checkin Day 3",
        id: "checkin_day_3", // ✅ unique ID
        accessor: (row) => row.checkins,
        Cell: ({ value }) => renderCheckin(value, 2),
        filterable: false,
      },

      {
        Header: "Action",
        id: "checkin_action",
        accessor: (row) => row.checkins,
        Cell: ({ row }) => {
          const today = new Date().toDateString();
          const checkins = row.original.checkins || [];

          const hasCheckedInToday = checkins.some(
            (c) => new Date(c.date).toDateString() === today
          );

          return (
            <Button
              disabled={hasCheckedInToday}
              onClick={() => {
                setSelectedUser(row.original);
                toggleModal();
              }}
            >
              {hasCheckedInToday ? "Checked In" : "Checkin"}
            </Button>
          );
        },
      },
    ];
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Registrations" pageTitle="Registrations" />
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={allUsers || []}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={50}
              className="custom-header-css"
              divClass="table-responsive table-card mb-3"
              tableClass="align-middle table-nowrap mb-0"
              theadClass="table-light table-nowrap"
              thClass="table-light text-muted"
              isTaskListFilter={false}
              SearchPlaceholder="Search for tasks or something..."
            />
          </CardBody>
          <Modal isOpen={modalOpen} toggle={toggleModal} centered={true}>
            <ModalHeader toggle={toggleModal}>
              Check-in Confirmation
            </ModalHeader>
            <ModalBody>
              {selectedUser && (
                <div>
                  Are you sure you want to check in{" "}
                  <strong>
                    {selectedUser.first_name} {selectedUser.last_name}
                  </strong>{" "}
                  for today?
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              {loading ? (
                <Loader />
              ) : (
                <Button
                  color="primary"
                  onClick={() => handleCheckin(selectedUser?.id)}
                >
                  Confirm
                </Button>
              )}

              <Button color="secondary" onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Registrations;
