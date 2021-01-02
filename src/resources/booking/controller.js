import Booking from './model';
import {genTicket} from '../../utils';

export const create = async (req, res) => {
  const {from, to, date, seats, phone} = req.body;

  const ticket = genTicket();

  const booking = await Booking.create({
    to,
    from,
    date,
    seats,
    phone,
    ticket,
  });

  return res.send({
    message: 'booking made successfully',
    data: {booking},
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
