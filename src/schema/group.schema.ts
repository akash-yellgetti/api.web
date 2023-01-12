import { object, string, ref } from "yup";

export const group = {
    create: object({
        body: object({
          name: string().required("Name is required"),
        }),
      }),
    read: {
      body: object({
        id: string().required("ID is required"),
      }),
    },
    update: object({
      body: object({
        id: string().required("ID is required"),
        name: string().required("Name is required"),
      }),
    }),
    addUser: object({
      body: object({
        id: string().required("ID is required"),
        userId: string().required("User is required"),
      }),
    }),
    removeUser: object({
      body: object({
        id: string().required("ID is required"),
        name: string().required("Name is required"),
      }),
    }),
    delete: {

    }
}