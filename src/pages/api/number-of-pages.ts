import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { query } = req.query;
    if (typeof query !== "string") {
        res.status(400).json({
            error: "Title query parameter is required and must be a string.",
        });
        return;
    }
    const response = await fetch(
        `http://www.omdbapi.com/?s=${
            encodeURIComponent(query)
        }&apikey=${process.env.OMDB_API_KEY}`,
    );
    const data = await response.json();
    res.status(200).json(data.totalResults);
}
