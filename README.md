### Chạy lần đầu: 

npx prisma migrate deploy


### Migration data

npx prisma migrate dev --name your_migration_name



### Nest js
1. Tạo module
nest g module <module-name>

2. Tạo controller
nest g controller <controller-name>

3. Tạo service
nest g service <service-name>


### insert admin
USE CourseLearn;

INSERT INTO User
(
  fullName,
  email,
  passwordHash,
  role,
  gender,
  dateOfBirth,
  phoneNumber,
  addressLine1,
  addressLine2,
  city,
  state,
  postalCode,
  country,
  accountStatus,
  lastLogin,
  createdAt,
  updatedAt,
  profilePictureURL,
  bannerPictureURL,
  createdBy,
  description,
  inActive,
  isBlock,
  updatedBy
)
VALUES
(
  'Admin',                       -- fullName
  'admin@gmail.com',             -- email
  '$2b$10$YM/yaHys/f8rKfH5ZKleaOju2VlUDiO23EsW3P9sk2.R/T0ugJRFa', -- passwordHash
  '2',                           -- role
  '1',                           -- gender
  NOW(),                        -- dateOfBirth
  '1234567890',                 -- phoneNumber
  'Hồ Chí Minh',                 -- addressLine1
  'Việt Nam',                   -- addressLine2
  'HCM',                        -- city
  '',                            -- state
  '',                            -- postalCode
  'Việt Nam',                   -- country
  '0',                           -- accountStatus
  NOW(),                        -- lastLogin
  NOW(),                        -- createdAt
  NOW(),                        -- updatedAt
  '',                            -- profilePictureURL
  '',                            -- bannerPictureURL
  '',                            -- createdBy
  '',                            -- description
  0,                             -- inActive
  0,                             -- isBlock
  ''                             -- updatedBy
)
ON DUPLICATE KEY UPDATE
  fullName = VALUES(fullName),
  passwordHash = VALUES(passwordHash),
  role = VALUES(role),
  gender = VALUES(gender),
  dateOfBirth = VALUES(dateOfBirth),
  phoneNumber = VALUES(phoneNumber),
  addressLine1 = VALUES(addressLine1),
  addressLine2 = VALUES(addressLine2),
  city = VALUES(city),
  state = VALUES(state),
  postalCode = VALUES(postalCode),
  country = VALUES(country),
  accountStatus = VALUES(accountStatus),
  lastLogin = VALUES(lastLogin),
  updatedAt = NOW(),  -- Cập nhật thời gian cập nhật
  profilePictureURL = VALUES(profilePictureURL),
  bannerPictureURL = VALUES(bannerPictureURL),
  createdBy = VALUES(createdBy),
  description = VALUES(description),
  inActive = VALUES(inActive),
  isBlock = VALUES(isBlock),
  updatedBy = VALUES(updatedBy);



### Course

instructor => tạo course => gửi phê duyệt => admin
admin duyệt => hiển thị cho user

INSERT INTO Semester (name, startDate, endDate, isCurrent, createdAt, updatedAt, createdBy, updatedBy)
VALUES 
  ('Spring 2024', '2024-01-15', '2024-05-15', false, NOW(), NOW(), 'Admin', 'Admin'),
  ('Fall 2024', '2024-08-15', '2024-12-15', true, NOW(), NOW(), 'Admin', 'Admin');


@Roles(Role.Instructor)