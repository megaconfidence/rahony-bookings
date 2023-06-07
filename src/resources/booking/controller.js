import fs from 'fs';
import path from 'path';
import Booking from './model';
import pdf from 'pdf-creator-node';
import {genTicket} from '../../utils';
import {secrets} from '../../config';
import * as postmark from 'postmark';

export const create = async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  const {
    departure,
    name,
    destination,
    date,
    seats,
    phone,
    email,
    tnxRef,
    tnxStatus,
  } = req.body;

  const ticket = genTicket();

  const data = {
    date,
    email,
    name,
    seats,
    phone,
    ticket,
    tnxRef,
    tnxStatus,
    departure,
    destination,
  };

  const options = {
    format: 'A3',
    border: '10mm',
    orientation: 'portrait',
    childProcessOptions: {
      env: {
        OPENSSL_CONF: '/dev/null',
      },
    },
  };

  const document = {
    data: {
      data: {
        ...data,
        date: new Date(date).toLocaleDateString('en-NG', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          weekday: 'long',
        }),
      },
    },
    html: fs.readFileSync(
      path.join(__dirname, '../../ticket/template.html'),
      'utf-8'
    ),
    path: path.join(__dirname, `../../ticket/rahony-ticket-${ticket}.pdf`),
  };

  const pdfPath = await pdf.create(document, options);
  const booking = await Booking.create(data);

  const client = new postmark.ServerClient(secrets.postmarkToken);

  client.sendEmail({
    From: 'hello@rahonytravels.com',
    To: email,
    Subject: `Travel Ticket #${ticket}`,
    TextBody: `Hello ${name}, \nPlease find attached your travel ticket`,
    Attachments: [
      {
        Name: `rahony-ticket-${ticket}.pdf`,
        ContentType: 'application/pdf',
        Content: fs.readFileSync(pdfPath.filename, 'base64'),
      },
    ],
  });

  return res.send({
    message: 'booking made successfully',
    data: {
      booking,
      pdfpath: `/ticket/rahony-ticket-${ticket}.pdf`,
    },
  });
};

export const getAll = async (req, res) => {
  const bookings = await Booking.find({});

  return res.send({
    message: 'found all bookings successfully',
    data: {bookings},
  });
};

export const update = async (req, res) => {
  const {status, id} = req.body;

  const booking = await Booking.findByIdAndUpdate(id, {status}, {new: true});

  return res.send({
    message: 'booking updated successfully',
    data: {booking},
  });
};

export const search = async (req, res) => {
  const {phone = '', date = '', ticket = ''} = req.body;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');

  const bookings = await Booking.find({
    $or: [{date: rgx(date)}, {phone: rgx(phone)}, {ticket: rgx(ticket)}],
  });

  return res.send({
    message: 'bookings found successfully',
    data: {bookings},
  });
};
