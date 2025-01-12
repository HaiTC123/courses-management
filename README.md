### uploadthing 
1. Sử dụng nodev20

### Chạy lần đầu: 

npx prisma migrate deploy


### Insert dữ liệu ban đầu
``` sql


-- insert dữ liệu admin
-- pass: 12345678
INSERT INTO User ( fullName, email, passwordHash, role, gender, dateOfBirth, phoneNumber, addressLine1, addressLine2, city, state, postalCode, country, accountStatus, lastLogin, createdAt, updatedAt, profilePictureURL, bannerPictureURL, createdBy, description, inActive, isBlock, updatedBy)
  VALUES ( 'admin', 'admin@gmail.com', '$2b$10$wdEvfcUFCDvz6IaSNejofOsZl9y4QdJ1.x/Jc8gCBwtCNe0QXLN1a', 'Admin', 'Male', NOW(), '', '', '', '', '', '', '', 'Active', NOW(), NOW(), NOW(), '', '', '', '', 0, 0, '');

INSERT INTO Admin (userId, role, accessLevel, createdAt, updatedAt, lastActivity, createdBy, updatedBy)
  VALUES (1, 'Admin', 0, NOW(), NOW(), NOW(), '', '');


```


### Migration data

npx prisma migrate dev --name your_migration_name