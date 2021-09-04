import { getAllAuthors } from '../../../utils/server';

/**
 * api endpoint for getting all authors
 * @param {*} req NextJS request object
 * @param {*} res NextJS response object
 * @returns array of document objects of fields: "uid", "name", and "role"
 */
const handler = async (req, res) => {
  const allAuthors = await getAllAuthors();
  return res.json({ allAuthors });
};

export default handler;
