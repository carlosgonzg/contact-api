export class ContactNotFoundError extends Error {
    constructor() {
        super("Contact not found");

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ContactNotFoundError.prototype);
    }
}