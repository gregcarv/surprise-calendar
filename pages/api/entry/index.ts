import { resolveUrl } from "@/lib/resolveUrl";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  id: number;
  available: boolean;
  value: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  try {
    const { body } = req;
    const url = resolveUrl();

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

          const data: Data[] = await response.json();
          res.status(200).json(data);
        } catch (e) {
          res.status(400).end();
        }
      }

      // PUT
      case "PUT": {
        try {
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

  res.status(200).json({ id: 1, available: true, value: "0" });
}
