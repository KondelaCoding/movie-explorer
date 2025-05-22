import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { query, page } = req.query;
    if (typeof query !== "string") {
        res.status(400).json({
            error: "Title query parameter is required and must be a string.",
        });
        return;
    }

    const pageNum = page ? page : "1";
    const response = await fetch(
        `https://www.omdbapi.com/?s=${
            encodeURIComponent(query)
        }&page=${pageNum}&apikey=${process.env.OMDB_API_KEY}`,
    );

    const data = await response.json();
    res.status(200).json(data);
}
