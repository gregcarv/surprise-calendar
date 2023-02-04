import { resolveUrl } from "@/lib/resolveUrl";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  available: boolean;
  value: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { body } = req;
    const { id } = req.query;
    const entryId = String(id);
    const url = resolveUrl(entryId);

    switch (req.method) {
      // GET
      case "GET": {
        try {
          const response = await fetch(url, {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data: Data = await response.json();
          res.status(200).json(data);
        } catch (e) {
          res.status(400).end();
        }
      }

      // PUT
      case "PUT": {
        try {
          if (!body) {
            res.status(400).end();
          }

          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(body),
          });

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const data = await response.json();
          res.status(200).json(data);
        } catch (e) {
          res.status(400).end();
        }
      }

      default: {
        res.status(400).end();
      }
    }
  } catch (e) {
    res.status(400).end();
  }
}
