# ER Diagram – NepXpress

## User
- id (PK)
- name
- email
- password
- role
- createdAt
- updatedAt

## Courier (Coming Next)
- id (PK)
- senderName
- receiverName
- pickupAddress
- deliveryAddress
- status
- paymentStatus
- userId (FK)

## Relationships
- User (1) → (M) Courier
