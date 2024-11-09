import { NextFunction } from "express"
import axios from "axios";

import { KARMA_API_KEY, KARMA_URL } from "../config";
import { CustomError } from "../utils/customError";

export const karmaBlackList = async (identity: string,next: NextFunction) => {
    try {
        const data = await axios.get(`${KARMA_URL}/verification/karma/${identity}`,
            {
                headers: {
                    Authorization: `Bearer ${KARMA_API_KEY}`
                }
            }
        )
        return data.data;
    } catch (error) {
        return next(new CustomError(500, error?.message || 'Internal Server Error'));
    }
}
