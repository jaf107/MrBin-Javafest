import React, { useState } from "react";
import "./Priviledges.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap"; // Import Bootstrap components
import { useDispatch, useSelector } from "react-redux";
import { addPriviledge } from "../../redux/actions/userActions";
import { addRecycler } from "../../redux/actions/recyclerActions";
import { addOrganization } from "../../redux/actions/organizationActions";

const Priviledges = () => {
  // State to manage modal visibility and form data
  const [recyclerModalVisible, setRecyclerModalVisible] = useState(false);
  const [organizationModalVisible, setOrganizationModalVisible] =
    useState(false);

  // State to manage form data for Recycler and Organization
  const [recyclerFormData, setRecyclerFormData] = useState({
    recyclerName: "",
    recyclerLocation: "",
    recyclerPhone: "",
  });

  const [organizationFormData, setOrganizationFormData] = useState({
    organizationName: "",
    organizationType: "",
    organizationLocation: "",
    organizationPhone: "",
  });

  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  // Function to handle form submissions for Recycler
  const handleRecyclerSubmit = (e) => {
    e.preventDefault();
    console.log("Recycler form submitted:", recyclerFormData);

    const recyclerForm = new FormData();
    recyclerForm.set("name", user.username);
    recyclerForm.set("company", recyclerFormData.recyclerName);
    recyclerForm.set("location", recyclerFormData.recyclerLocation);
    recyclerForm.set("phone", recyclerFormData.recyclerPhone);
    dispatch(addRecycler(recyclerForm));
    setRecyclerModalVisible(false);
  };

  // Function to handle form submissions for Organization
  const handleOrganizationSubmit = (e) => {
    e.preventDefault();
    console.log("Organization form submitted:", organizationFormData);
    const organizationForm = new FormData();
    organizationForm.set("name", user.username);
    organizationForm.set("location", organizationFormData.organizationLocation);
    organizationForm.set("organization", organizationFormData.organizationName);
    organizationForm.set("phone", organizationFormData.organizationPhone);
    dispatch(addOrganization(organizationForm));

    setOrganizationModalVisible(false);
  };

  return (
    <div>
      <div class="bio-graph-heading ">Privildges</div>
      <Container className="d-flex flex-column justify-content-center align-items-center mt-4">
        <h2>Join as a Priviledged member</h2>
        <Row>
          <Col>
            <Button onClick={() => setRecyclerModalVisible(true)} className="">
              Recycler
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              onClick={() => setOrganizationModalVisible(true)}
              className="mt-3"
            >
              Organization
            </Button>
          </Col>
        </Row>
      </Container>
      <Modal
        show={recyclerModalVisible}
        onHide={() => setRecyclerModalVisible(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Join as a Recycler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRecyclerSubmit}>
            <Form.Group controlId="recyclerName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={recyclerFormData.recyclerName}
                onChange={(e) =>
                  setRecyclerFormData({
                    ...recyclerFormData,
                    recyclerName: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="recyclerLocation">
              <Form.Label>Company Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your location"
                value={recyclerFormData.recyclerLocation}
                onChange={(e) =>
                  setRecyclerFormData({
                    ...recyclerFormData,
                    recyclerLocation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="recyclerPhone">
              <Form.Label>Company Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Phone"
                value={recyclerFormData.recyclerPhone}
                onChange={(e) =>
                  setRecyclerFormData({
                    ...recyclerFormData,
                    recyclerPhone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="success" className="mt-3">
                Send Approval Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={organizationModalVisible}
        onHide={() => setOrganizationModalVisible(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">
            Join as an Organization
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleOrganizationSubmit}>
            <Form.Group controlId="organizationName">
              <Form.Label>Organization Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization name"
                value={organizationFormData.organizationName}
                onChange={(e) =>
                  setOrganizationFormData({
                    ...organizationFormData,
                    organizationName: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="organizationLocation">
              <Form.Label>Organization Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization location"
                value={organizationFormData.organizationLocation}
                onChange={(e) =>
                  setOrganizationFormData({
                    ...organizationFormData,
                    organizationLocation: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="organizationPhone">
              <Form.Label>Organization Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter organization phone"
                value={organizationFormData.organizationPhone}
                onChange={(e) =>
                  setOrganizationFormData({
                    ...organizationFormData,
                    organizationPhone: e.target.value,
                  })
                }
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="success" className="mt-3">
                Send Approval Request
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Priviledges;
