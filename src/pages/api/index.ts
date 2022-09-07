import { NextApiHandler } from "next";

const handler: NextApiHandler = (_, res) => {
  res.send('online')
}

export default handler;