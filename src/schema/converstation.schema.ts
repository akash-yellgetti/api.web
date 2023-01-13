import { object, string, ref } from "yup";

export const converstation = {
    create: object({
        body: object({
          type: string().required("Type is required"),
          typeId: string().required("Type ID is required"),
          data: object({
            type: string().required("Date type is required"),
            text: string(),
          }).required(),
        }),
      }),
    read: {
      body: object({
        id: string().required("ID is required"),
      }),
    },
    list: object({
      body: object({
        // id: string().required("ID is required"),
      }),
    }),
    history: object({
      body: object({
        id: string().required("ID is required"),
      }),
    }),
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