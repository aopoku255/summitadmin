import React, { useEffect, useMemo } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Button, Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../slices/thunks";
import { createSelector } from "reselect";

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

  const eventDays = [
    new Date("2025-06-25"),
    new Date("2025-06-26"),
    new Date("2025-06-27"),
  ];

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
        accessor: "checkin",
        Cell: () => <Button disabled>Checkin</Button>,
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
              data={allUsers}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-3"
              tableClass="align-middle table-nowrap mb-0"
              theadClass="table-light table-nowrap"
              thClass="table-light text-muted"
              isTaskListFilter={true}
              SearchPlaceholder="Search for tasks or something..."
            />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Registrations;
