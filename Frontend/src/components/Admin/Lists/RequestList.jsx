import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getApprovalRequests,
  updatePriviledge,
} from "../../../redux/actions/userActions";

const RequestList = () => {
  // Mock data for requests (replace this with actual data from your backend)
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUserProducts(id));
    dispatch(getApprovalRequests());
  }, [dispatch]);

  const { requests } = useSelector((state) => state.requests);

  // State to manage the filter options
  const [filterOptions, setFilterOptions] = useState({
    showRecyclers: true,
    showOrganizations: true,
  });

  // Function to handle approval of a request (you can implement your actual logic here)
  const handleApprove = (request) => {
    const type = request.company
      ? "Recycler"
      : request.organization
      ? "Organization"
      : "";

    console.log(`Request with ID ${request.id} approved.`);
    const form = new FormData();
    form.set("id", request.id);
    form.set("type", type);
    form.set("state", "VERIFIED");

    dispatch(updatePriviledge(form));
  };

  // Function to handle rejection of a request (you can implement your actual logic here)
  const handleReject = (request) => {
    const type = request.company
      ? "Recycler"
      : request.organization
      ? "Organization"
      : "";

    console.log(`Request with ID ${request.id} approved.`);
    const form = new FormData();
    form.set("id", request.id);
    form.set("type", type);
    form.set("state", "REJECTED");

    dispatch(updatePriviledge(form));
  };

  const isRecyclerTrue = requests?.company;

  // Function to filter requests based on the filter options
  const filteredRequests = requests.filter((request) => {
    const isRecycler = request?.company;
    const isOrganization = request?.organization;

    return (
      (filterOptions.showRecyclers && isRecycler) ||
      (filterOptions.showOrganizations && isOrganization)
    );
  });

  return (
    <div>
      <h2 className="text-center bg-light p-4">APPROVAL REQUESTS</h2>

      <div className="btn-group mb-3 d-flex align-items-center">
        <button
          className={`btn  m-1 ${
            filterOptions.showRecyclers ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() =>
            setFilterOptions({
              ...filterOptions,
              showRecyclers: !filterOptions.showRecyclers,
            })
          }
        >
          Show Recyclers
        </button>
        <button
          className={`btn  m-1 ${
            filterOptions.showOrganizations ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() =>
            setFilterOptions({
              ...filterOptions,
              showOrganizations: !filterOptions.showOrganizations,
            })
          }
        >
          Show Organizations
        </button>
      </div>
      <table className="table mt-3">
        <thead className="thead-dark">
          <tr>
            <th>SI</th>
            <th>Username</th>
            <th>Type</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{request.name}</td>
              {request?.company && <td>Recycler</td>}
              {request?.organization && <td>Organization</td>}
              <td>{request.location}</td>
              <td>
                <button
                  className="btn btn-success m-1"
                  onClick={() => handleApprove(request)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger m-1"
                  onClick={() => handleReject(request)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestList;
