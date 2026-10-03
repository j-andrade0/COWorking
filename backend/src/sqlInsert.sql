use coworking;

INSERT INTO Users (id, firstName, lastName, cpf, email, secret, isTempSecret, phoneNumber, profilePhoto, balanceAccount)
VALUES (1, 'Marcio', 'Rodrigues', '000.000.000-00', 'marciorodrigues@gmail.com', 'MF5EUVBDFE7G2OKFLZKCIPSOGVZWSOCAFASCYMBVGU4SI3JUJZTQ', 1, '(00)00000-0000', '/profile/photo/1', 0.00);

INSERT INTO Owners (id, nomeEmpresarial, nomeFantasia, firstName, lastName, document, email, secret, isTempSecret, phoneNumber, profilePhoto)
VALUES (1, 'any', 'any', 'any', 'any', 'any', 'any', 'LA5UOUTENNCEY6KIPFJEE7LRHYZX2KSTJY3VCKCAKA6GYKC5KR2Q', 1, 'any', 'any');

INSERT INTO Spaces (id, address, rating, size, description, ownerId)
VALUES (1, 'Av. Universitária, Cidade Universitária, 75000-000', NULL, 90, 'Biblioteca UniEvangélica', 1);

INSERT INTO BlockCategories (id, name)
VALUES (1, 'mesa');

INSERT INTO Blocks (id, name, peopleLimit, description, spaceId, blockCategoryId)
VALUES (1, 'Sala de Vidro 01', 6, 'Sala de vidro localizada na biblioteca da UniEvangélica de Anápolis', 1, 1);
