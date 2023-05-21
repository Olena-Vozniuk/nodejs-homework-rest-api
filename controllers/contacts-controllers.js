const { Contact } = require('../models/contact');
const { HttpError } = require('../helpers');
const { ctrlWrapper } = require('../decorators');


const getAllContacts = async (req, res, next) => {
    const result = await Contact.find();
    res.json(result);   
};

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

const addContact = async (req, res, next) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
};

const deleteContact = async (req, res, next) => { 
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
        throw new HttpError(404);
    }
    res.json({
        message: "Contact deleted"
    })
};

const updateContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
    if (!result) {
        throw new HttpError(404);
    }
    res.json(result);
};

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    deleteContact: ctrlWrapper(deleteContact),
    updateContact: ctrlWrapper(updateContact),
    updateStatusContact: ctrlWrapper(updateStatusContact),
};
 