import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const { movieId } = req.query;
    if (typeof movieId !== "string") {
        res.status(400).json({
            error: "Title query parameter is required and must be a string.",
        });
        return;
    }

    const response = await fetch(
        `https://www.omdbapi.com/?i=${
            encodeURIComponent(movieId)
        }&apikey=${process.env.OMDB_API_KEY}`,
    );

    const data = await response.json();
    res.status(200).json(data);
}
