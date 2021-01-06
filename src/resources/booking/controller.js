import fs from 'fs';
import path from 'path';
import Booking from './model';
import pdf from 'pdf-creator-node';
import {genTicket} from '../../utils';

export const create = async (req, res) => {
  const {departure, name, destination, date, seats, phone} = req.body;

  const ticket = genTicket();

  const data = {
    date,
    name,
    seats,
    phone,
    ticket,
    departure,
    destination,
  };

  const options = {
    format: 'A3',
    border: '10mm',
    orientation: 'portrait',
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

  await pdf.create(document, options);

  const booking = await Booking.create(data);

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
  const {id} = req.params;
  const {status} = req.body;

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
