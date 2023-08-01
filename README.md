# E-Commerce Application

This is an e-commerce application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The application is designed as a microservices architecture and deployed on Kubernetes, taking advantage of its container orchestration capabilities.

The application uses the following technologies:

- Node.js
- Express.js
- MongoDB (for user and product data)
- MySQL (for order and payment data)
- Kafka (as the distributed messaging system)
- Docker (for containerization)
- Kubernetes (for deployment and orchestration)
  
## Microservices Architecture

The e-commerce application is designed as a set of loosely coupled microservices, each responsible for specific functionalities. The microservices communicate with each other through Kafka, a distributed streaming platform. The following are the key microservices:

1. **Authentication Service**: Responsible for user registration, login, and authentication. It utilizes MongoDB to store user data and JWT tokens for secure authentication.

2. **User Service**: Manages user-related operations such as profile management, address details, and preferences. It communicates with the Authentication Service for user authentication.

3. **Product Service**: Handles product-related operations, such as adding new products, updating product details, and managing inventory. It stores product information in MongoDB.

4. **Order Service**: Deals with order processing, including creating, updating, and tracking orders. It communicates with the Product Service to check product availability.

5. **Payment Service**: Integrates with external payment gateways to process payments for orders. It ensures secure and reliable payment processing.

## Kubernetes Deployment

The entire application is deployed on Kubernetes to take advantage of its container orchestration features. The Kubernetes cluster consists of multiple nodes, including a master node that controls the cluster and worker nodes that run the microservice containers.

### Docker Containers

Each microservice is containerized using Docker, allowing easy and consistent deployment across different environments. Docker images for the microservices are pushed to a container registry for access within the Kubernetes cluster.

### Kubernetes Deployments

![Untitled Diagram drawio(1)](https://user-images.githubusercontent.com/50258809/205503284-dde69462-e6a6-40ac-a207-283e4c59382e.png)

## Microservices Overview

The application is divided into several microservices, each responsible for specific functionalities. Below are the details of the events used in each microservice:

### User Microservice

#### User Registered:
- Event Name: USER_REGISTERED
- Description: This event is triggered when a new user registers on the platform. It contains the user details, such as username, email, and registration timestamp.

#### User Updated:
- Event Name: USER_UPDATED
- Description: This event is triggered when a user updates their profile information. It carries the updated user data.

#### User Deleted:
- Event Name: USER_DELETED
- Description: This event is generated when a user account is deleted. It typically contains the user ID or other relevant details.

### Product Microservice

#### Product Added:
- Event Name: PRODUCT_ADDED
- Description: This event is triggered when a new product is added to the inventory. It includes product details such as name, description, price, and stock quantity.

#### Product Updated:
- Event Name: PRODUCT_UPDATED
- Description: This event is triggered when product information is updated. It can carry the updated fields of the product.

#### Product Deleted:
- Event Name: PRODUCT_DELETED
- Description: This event is generated when a product is removed from the inventory. It may contain the product ID or relevant identifiers.

### Order Microservice

#### Order Placed:
- Event Name: ORDER_PLACED
- Description: This event is triggered when a customer places a new order. It includes details such as the customer ID, order ID, product IDs, quantities, and total price.

#### Order Cancelled:
- Event Name: ORDER_CANCELLED
- Description: This event is generated when an order is canceled. It can contain the order ID and any relevant cancellation details.

#### Order Completed:
- Event Name: ORDER_COMPLETED
- Description: This event is triggered when an order is successfully delivered and marked as complete.

### Payment Microservice

#### Payment Added:
- Event Name: PAYMENT_ADDED
- Description: This event is triggered when a new payment is processed for an order. It includes payment details like transaction ID, amount, payment method, and order ID.

#### Payment Success:
- Event Name: PAYMENT_SUCCESS
- Description: This event is generated when a payment is successfully processed and confirmed.

#### Payment Failure:
- Event Name: PAYMENT_FAILURE
- Description: This event is triggered if a payment fails due to some error or insufficient funds.

### Delivery Microservice

#### Delivery Started:
- Event Name: DELIVERY_STARTED
- Description: This event is triggered when the delivery of an order begins. It includes the order ID, delivery address, and delivery partner details.

#### Delivery Couriered by Partner:
- Event Name: DELIVERY_COURIERED_PARTNER
- Description: This event is generated when the delivery is handed over to a delivery partner for completion.

#### Delivery Completed:
- Event Name: DELIVERY_COMPLETED
- Description: This event is triggered when the delivery is successfully completed, and the order reaches the customer.

## Installation and Setup

1. Clone the repository.
2. Set up and configure MongoDB for user and product data storage.
3. Set up and configure MySQL for order and payment data storage.
4. Build Docker images for each microservice using the provided Dockerfiles or pull them from Docker Hub.
   - Auth Service: `docker pull kunalznk/auth-service:latest`
   - User Service: `docker pull kunalznk/user-service:latest`
   - Product Service: `docker pull kunalznk/product-service:latest`
   - Order Service: `docker pull kunalznk/order-service:latest`
   - Payment Service: `docker pull kunalznk/payment-service:latest`
   - MongoDB: `docker pull mongo:latest`
   - MySQL: `docker pull mysql:latest`
   - Kafka: `docker pull doughgle/kafka-kraft:latest`
5. Deploy the Kubernetes cluster with the necessary configurations for each microservice, Kafka, and other components.
6. Create an Ingress resource to expose the application to the outside world.
7. Scale the microservices and configure load balancing based on the expected traffic and resource requirements.
8. Monitor the application's performance and health using Kubernetes monitoring tools and logging systems.

Please note that the Kubernetes configurations (Ingress, Deployments, StatefulSet, and Services) provided in are essential for deploying the microservices, Kafka, and other components on a Kubernetes cluster. Make sure to apply those configurations using Kubectl or other Kubernetes management tools.

The above steps provide an overview of the installation and setup process, including setting up databases, containerizing microservices, deploying them on Kubernetes, and ensuring the application's scalability and monitoring.

Remember to customize the installation instructions based on your specific environment and requirements. Additionally, ensure that you have a Kubernetes cluster set up and properly configured before proceeding with the Kubernetes-related steps.

Please note that the Docker images for the microservices and other components are available on Docker Hub (`kunalznk` represents your Docker Hub username). You can use `docker pull` commands to fetch the latest images from Docker Hub



## Contribution

Feel free to contribute to this project by opening issues or submitting pull requests.

## Author

[kunalznk](https://github.com/kunalznk)


