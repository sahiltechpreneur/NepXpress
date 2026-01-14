# ER Diagram – NepXpress

## User
- id (PK)
- name
- email
- password
- role
- createdAt
- updatedAt

## Courier
- id (PK)
- trackingNumber (unique)
- senderName
- senderPhone
- senderAddress
- receiverName
- receiverPhone
- receiverAddress
- status
- paymentStatus
- userId (FK)

## Relationships
- User (1) → (M) Courier
