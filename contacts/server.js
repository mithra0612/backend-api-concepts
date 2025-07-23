const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());

const contacts = [];

app.get('/api/contact', (req, res) => {
    res.status(200).send(contacts);
});

app.get('/api/contact/:id', (req, res) => {
    const id = req.params.id;
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx !== -1) {
        res.status(200).send(contacts[idx]);
    } else {
        res.status(404).send({ error: "Contact not found." });
    }
});

app.post('/api/contact', (req, res) => {
    const { name, email, phone } = req.body;
    const contact = {
        id: uuidv4(),
        name,
        email,
        phone,
        createdAt: new Date().toISOString(),
    };
    contacts.push(contact);
    res.status(201).send(contact);
});

app.delete('/api/contact/:id', (req, res) => {
    const id = req.params.id;
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx !== -1) {
        const deletedContact = contacts.splice(idx, 1)[0];
        res.status(200).send({ message: "Contact deleted", contact: deletedContact });
    } else {
        res.status(404).send({ error: "Contact not found" });
    }
});

app.put('/api/contact/:id', (req, res) => {
    const id = req.params.id;
    const { name, email, phone } = req.body;
    const idx = contacts.findIndex((contact) => contact.id === id);
    if (idx !== -1) {
        contacts[idx] = {
            ...contacts[idx],
            name: name || contacts[idx].name,
            email: email || contacts[idx].email,
            phone: phone || contacts[idx].phone,
        };
        res.status(200).send(contacts[idx]);
    } else {
        res.status(404).send({ error: "Contact not found" });
    }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});