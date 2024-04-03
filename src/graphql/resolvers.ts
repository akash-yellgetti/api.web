import { userService } from "../service";

export const resolvers = {
    users: async () => {
        return await userService.read();
    },
};