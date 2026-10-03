-- Fictional sample data for local development (matches the current Sequelize models).
-- Run it after the API has started once, because the API creates the tables (db.sync()).
-- Change the database name below if your DB_NAME is not "coworking".
-- Both accounts use the password: demo-password   (stored as a bcrypt hash, like the API does)

USE coworking;

INSERT INTO Users (id, firstName, lastName, cpf, email, password, phoneNumber, profilePhoto, balanceAccount)
VALUES (1, 'Maria', 'Exemplo', '000.000.000-00', 'maria@example.com', '$2b$10$BWG3USJ5S6enc8/W6Wueve.ENhEBdISjFaBa7ndkUbOfnV4eazxPS', '(00)00000-0000', NULL, 0.00);

INSERT INTO Owners (id, nomeEmpresarial, nomeFantasia, cnpj, email, password, phoneNumber, profilePhoto)
VALUES (1, 'Biblioteca Exemplo Ltda', 'Biblioteca Exemplo', '00.000.000/0000-00', 'owner@example.com', '$2b$10$BWG3USJ5S6enc8/W6Wueve.ENhEBdISjFaBa7ndkUbOfnV4eazxPS', '(00)11111-1111', NULL);

INSERT INTO Spaces (id, address, rating, size, description, ownerId)
VALUES (1, 'Av. Exemplo, 100, Centro, 00000-000', NULL, 90, 'Biblioteca de exemplo', 1);

INSERT INTO BlockCategories (id, name)
VALUES (1, 'mesa');

INSERT INTO Blocks (id, name, peopleLimit, description, spaceId, blockCategoryId)
VALUES (1, 'Sala de Vidro 01', 6, 'Sala de vidro de exemplo', 1, 1);

INSERT INTO BlockReservation (id, startDate, endDate, blockId, userId)
VALUES (1, '2030-01-10 10:00:00', '2030-01-10 12:00:00', 1, 1);
