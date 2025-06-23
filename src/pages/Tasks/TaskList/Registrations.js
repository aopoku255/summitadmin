import React, { useMemo } from "react";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import { Button, Card, CardBody } from "reactstrap";
import TableContainer from "../../../Components/Common/TableContainer";

const Registrations = () => {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Prefix", accessor: "prefix" },
      { Header: "First Name", accessor: "first_name" },
      { Header: "Last Name", accessor: "last_name" },
      { Header: "Email", accessor: "email" },
      { Header: "Country", accessor: "country" },
      { Header: "Position", accessor: "position" },
      { Header: "Gender", accessor: "gender" },
      {
        Header: "Action",
        accessor: "checkin",
        Cell: (cellProps) => {
          return <Button disabled>Checkin</Button>;
        },
      },
    ],
    []
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <BreadCrumb title="Registrations" pageTitle="Registrations" />
        <Card>
          <CardBody>
            <TableContainer
              columns={columns}
              data={[
                {
                  id: 1,
                  prefix: "Dr.",
                  attendaceType: "In-person",
                  first_name: "Andrews",
                  last_name: "Opoku",
                  email: "aopoku255@gmail.com",
                  organization: "TechWorld",
                  suffix: "",
                  continent: "Africa",
                  mobile_number: "+233201234567",
                  country: "Ghana",
                  city: "Accra",
                  state: "Greater Accra",
                  sector: "Technology",
                  position: "CTO",
                  gender: "Male",
                  certificate: "Yes",
                  previousEvent: "Yes",
                  emailOptOut: "No",
                  photoRelease: "Yes",
                  category: "Delegate",
                  paymentLink: "https://paylink.com/abc123",
                },
              ]}
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
