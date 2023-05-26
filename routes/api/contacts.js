const express = require('express');

const router = express.Router();

const contactsController = require('../../controllers/contacts-controller');

const { schemas } = require('../../models/contact');

const { validateBody, isValidId } = require('../../middlewares');

router.get('/', contactsController.listContacts);

router.get('/:id', isValidId, contactsController.getContactById);

router.post('/', validateBody(schemas.contactAddSchema), contactsController.addContact);

router.put(
  '/:id',
  isValidId,
  validateBody(schemas.contactAddSchema),
  contactsController.updateContact
);

router.patch(
  '/:id/favorite',
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactsController.updateFavorite
);

router.delete('/:id', isValidId, contactsController.removeContact);

module.exports = router;
