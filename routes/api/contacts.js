const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const { validateBody, isValidId, authenticate, contactSchemas } = require('../../middlewares');

router.get('/', authenticate, contactsController.listContacts);

router.get('/:id', authenticate, isValidId, contactsController.getContactById);

router.post(
  '/',
  authenticate,
  validateBody(contactSchemas.contactAddSchema),
  contactsController.addContact
);

router.put(
  '/:id',
  isValidId,
  authenticate,
  validateBody(contactSchemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  authenticate,
  validateBody(contactSchemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:id', isValidId, authenticate, contactsController.removeContact);

module.exports = router;
