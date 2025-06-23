import React, { useEffect, useMemo } from "react";
import TableContainer from "../../../Components/Common/TableContainer";
import { DueDate, OrdersId, Project } from "../../Tasks/TaskList/TaskListCol";
import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { useDispatch } from "react-redux";

const Sessions = () => {
  const dispatch = useDispatch();

  const columns = useMemo(
    () => [
      {
        Header: "Session ID",
        accessor: "sessionId",
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
        Header: "Tasks",
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
            item.img ? item.img : item
          );
          return (
            <React.Fragment>
              <div className="avatar-group">
                {assigned.map((item, index) => (
                  <Link key={index} to="#" className="avatar-group-item">
                    <img
                      src={
                        process.env.REACT_APP_API_URL + "/images/users/" + item
                      }
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
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={[]}
              isGlobalFilter={true}
              isAddUserList={false}
              customPageSize={8}
              className="custom-header-css"
              divClass="table-responsive table-card mb-3"
              tableClass="align-middle table-nowrap mb-0"
              theadClass="table-light table-nowrap"
              thClass="table-light text-muted"
              //   handleTaskClick={handleTaskClicks}
              isTaskListFilter={true}
              SearchPlaceholder="Search for tasks or something..."
            />
          </CardBody>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Sessions;
