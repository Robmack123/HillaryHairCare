import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormGroup, Input, Label, Button, Container } from "reactstrap";
import { getServiceById, updateService } from "../../services/services"; // Add these API functions

export const EditService = () => {
  const { id } = useParams(); // Get the service ID from the route
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the service details when the component loads
    getServiceById(id)
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load service details. Please try again.");
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedService = {
      name,
      description,
      price: parseFloat(price),
    };

    updateService(id, updatedService)
      .then(() => {
        alert("Service updated successfully!");
        navigate("/services"); // Redirect to the service list
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update service. Please try again.");
      });
  };

  return (
    <Container>
      <h4>Edit Service</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Service Name</Label>
          <Input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter the service name"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="description">Description</Label>
          <Input
            id="description"
            type="textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the service description"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter the price"
            required
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Save Changes
        </Button>
        <Button
          color="secondary"
          onClick={() => navigate("/services")}
          className="ms-2"
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};
