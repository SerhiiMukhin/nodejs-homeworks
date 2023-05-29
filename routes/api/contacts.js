const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const { contactSchemas } = require('../../middlewares');

const { validateBody, isValidId } = require('../../middlewares');

router.get('/', contactsController.listContacts);

router.get('/:id', isValidId, contactsController.getContactById);

router.post('/', validateBody(contactSchemas.contactAddSchema), contactsController.addContact);

router.put(
  '/:id',
  isValidId,
  validateBody(contactSchemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(contactSchemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:id', isValidId, contactsController.removeContact);

module.exports = router;
