import { LeanDocument, FilterQuery, UpdateQuery } from "mongoose";
import { setting } from "../config/setting";
import { get } from "lodash";
import { Session, SessionDocument  } from "../model";
import { jwt } from "../utils/jwt.utils";
import { userService } from "./user.service";



class SessionService {

    createSession = async (userId: string, userAgent: string) => {
        const session = await Session.create({ user: userId, userAgent });

        return session.toJSON();
    }

    createAccessToken = ({
        user,
        session,
    }: any) => {
        // Build and return the new access token
        const accessToken = jwt.sign(
            { ...user, session: session._id },
            { expiresIn: setting["accessTokenTtl"] } // 15 minutes
        );

        return accessToken;
    }

    reIssueAccessToken = async ({
        refreshToken,
    }: {
        refreshToken: string;
    }) => {
        // Decode the refresh token
        const { decoded } = jwt.decode(refreshToken);

        if (!decoded || !get(decoded, "_id")) return false;

        // Get the session
        const session = await Session.findById(get(decoded, "_id"));

        // Make sure the session is still valid
        if (!session || !session?.valid) return false;

        const user = await userService.read({ _id: session.userId });

        if (!user) return false;

        const accessToken = this.createAccessToken({ user, session });

        return accessToken;
    }

    updateSession = async (
        query: FilterQuery<SessionDocument>,
        update: UpdateQuery<SessionDocument>
    ) => {
        return Session.updateOne(query, update);
    }

    findSessions = async (query: FilterQuery<SessionDocument>) => {
        return Session.find(query).lean();
    }
}


export const sessionService = new SessionService();