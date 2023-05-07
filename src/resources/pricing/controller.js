import Pricing from './model';

export const get = async (req, res) => {
  console.log('lorem');
  const pricings = await Pricing.findOne(req.body);

  return res.send({
    message: 'found all pricings successfully',
    data: pricings,
  });
};
